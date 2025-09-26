const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000; // Port pour votre API backend

// Middleware pour permettre les requêtes Cross-Origin (CORS) depuis votre frontend Vue.js
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Pour parser les requêtes JSON avec une limite plus élevée
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Pour parser les requêtes URL-encoded

// Configuration de la connexion à la base de données MySQL via une URL de connexion
// L'URL sera fournie par la variable d'environnement DATABASE_URL sur Render
const dbConfig = process.env.DATABASE_URL;

let pool;

async function connectToDatabase() {
    if (!dbConfig) {
        console.error('Erreur: La variable d\'environnement DATABASE_URL n\'est pas définie.');
        process.exit(1);
    }
    try {
        pool = mysql.createPool(dbConfig);
        // Test de la connexion
        const connection = await pool.getConnection();
        console.log('Connecté à la base de données MySQL !');
        connection.release();
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        process.exit(1); // Quitte l'application en cas d'échec de connexion
    }
}

// Appeler la fonction de connexion au démarrage
connectToDatabase();

if (!process.env.JWT_SECRET) {
    console.error('Erreur: La variable d\'environnement JWT_SECRET n\'est pas définie.');
    process.exit(1);
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // if there isn't any token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

// Exemple de point de terminaison API pour récupérer des données
app.get('/api/items', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM your_table_name'); // Remplacez 'your_table_name' par le nom de votre table
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des items :', err);
        res.status(500).send('Erreur serveur');
    }
});

// --- Endpoint API pour la connexion ---

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis.' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });

    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// --- Endpoints API pour les actualités ---

// GET toutes les actualités (avec option de limite)
app.get('/api/news', async (req, res) => {
    try {
        let query = 'SELECT * FROM news ORDER BY date DESC';
        const queryParams = [];

        if (req.query.limit) {
            const limit = parseInt(req.query.limit, 10);
            if (!isNaN(limit) && limit > 0) {
                query += ' LIMIT ?';
                queryParams.push(limit);
            }
        }

        const [rows] = await pool.query(query, queryParams);
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des actualités :', err.message);
        res.status(500).send('Erreur serveur');
    }
});

// POST une nouvelle actualité
app.post('/api/news', authenticateToken, async (req, res) => {
    const { title, date, image, description, fullContent, author } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO news (title, date, image, description, fullContent, author) VALUES (?, ?, ?, ?, ?, ?)',
            [title, date, image, description, fullContent, author]
        );
        res.status(201).json({ id: result.insertId, message: 'Actualité ajoutée avec succès' });
    } catch (err) {
        console.error('Erreur lors de l\'ajout de l\'actualité :', err);
        res.status(500).send('Erreur serveur');
    }
});

// PUT (mettre à jour) une actualité existante
app.put('/api/news/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, date, image, description, fullContent, author } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE news SET title = ?, date = ?, image = ?, description = ?, fullContent = ?, author = ? WHERE id = ?',
            [title, date, image, description, fullContent, author, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Actualité non trouvée' });
        }
        res.json({ message: 'Actualité mise à jour avec succès' });
    } catch (err) {
        console.error('Erreur lors de la mise à jour de l\'actualité :', err);
        res.status(500).send('Erreur serveur');
    }
});

// DELETE une actualité
app.delete('/api/news/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM news WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Actualité non trouvée' });
        }
        res.json({ message: 'Actualité supprimée avec succès' });
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'actualité :', err);
        res.status(500).send('Erreur serveur');
    }
});

// --- Endpoints API pour les licenciés ---

// GET tous les licenciés (avec options de recherche et de filtre)
app.get('/api/licencies', async (req, res) => {
    try {
        const { searchQuery, filterGenre, filterAge } = req.query;
        let query = 'SELECT * FROM licencies WHERE 1=1';
        const queryParams = [];

        if (searchQuery) {
            query += ' AND (name LIKE ? OR licence LIKE ?)';
            queryParams.push(`%${searchQuery}%`, `%${searchQuery}%`);
        }
        if (filterGenre && filterGenre !== 'Tous') {
            query += ' AND gender = ?';
            queryParams.push(filterGenre);
        }
        if (filterAge && filterAge !== 'Tous') {
            query += ' AND age_category = ?';
            queryParams.push(filterAge);
        }

        query += ' ORDER BY name ASC'; // Tri par nom par défaut

        const [rows] = await pool.query(query, queryParams);
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des licenciés :', err);
        res.status(500).send('Erreur serveur');
    }
});

// POST un nouveau licencié
app.post('/api/licencies', authenticateToken, async (req, res) => {
    const { rank, name, category, licence, gender, age_category, photo } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO licencies (`rank`, name, category, licence, gender, age_category, photo) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [rank, name, category, licence, gender, age_category, photo]
        );
        res.status(201).json({ id: result.insertId, message: 'Licencié ajouté avec succès' });
    } catch (err) {
        console.error('Erreur lors de l\'ajout du licencié :', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});

// PUT (mettre à jour) un licencié existant
app.put('/api/licencies/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { rank, name, category, licence, gender, age_category, photo } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE licencies SET `rank` = ?, name = ?, category = ?, licence = ?, gender = ?, age_category = ?, photo = ? WHERE id = ?',
            [rank, name, category, licence, gender, age_category, photo, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Licencié non trouvé' });
        }
        res.json({ message: 'Licencié mis à jour avec succès' });
    } catch (err) {
        console.error('Erreur lors de la mise à jour du licencié :', err);
        res.status(500).send('Erreur serveur');
    }
});

// DELETE un licencié
app.delete('/api/licencies/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM licencies WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Licencié non trouvé' });
        }
        res.json({ message: 'Licencié supprimé avec succès' });
    } catch (err) {
        console.error('Erreur lors de la suppression du licencié :', err);
        res.status(500).send('Erreur serveur');
    }
});

// --- Endpoints API pour les événements ---

// GET tous les événements (avec options de recherche et de filtre)
app.get('/api/events', async (req, res) => {
    try {
        // First, update the status of past events
        const now = new Date();
        await pool.query("UPDATE events SET status = 'closed' WHERE date < ? AND status = 'open'", [now]);

        // Then, fetch the events as before
        const { searchQuery, filterStatus } = req.query;
        let query = 'SELECT * FROM events WHERE 1=1';
        const queryParams = [];

        if (searchQuery) {
            query += ' AND (title LIKE ? OR description LIKE ?)';
            queryParams.push(`%${searchQuery}%`, `%${searchQuery}%`);
        }
        if (filterStatus && filterStatus !== 'all') {
            query += ' AND status = ?';
            queryParams.push(filterStatus);
        }

        query += ' ORDER BY date ASC'; // Tri par date par défaut

        const [rows] = await pool.query(query, queryParams);
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des événements :', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});

// POST un nouvel événement
app.post('/api/events', authenticateToken, async (req, res) => {
    let { title, date, description, location, status, participants } = req.body;
    // Format the date for MySQL DATETIME type
    if (date) {
        date = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO events (title, date, description, location, status, participants) VALUES (?, ?, ?, ?, ?, ?)',
            [title, date, description, location, status, participants]
        );
        res.status(201).json({ id: result.insertId, message: 'Événement ajouté avec succès' });
    } catch (err) {
        console.error('Erreur lors de l\'ajout de l\'événement :', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});

// PUT (mettre à jour) un événement existant
app.put('/api/events/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    let { title, date, description, location, status, participants } = req.body;
    // Format the date for MySQL DATETIME type
    if (date) {
        date = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    }
    try {
        const [result] = await pool.query(
            'UPDATE events SET title = ?, date = ?, description = ?, location = ?, status = ?, participants = ? WHERE id = ?',
            [title, date, description, location, status, participants, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.json({ message: 'Événement mis à jour avec succès' });
    } catch (err) {
        console.error('Erreur lors de la mise à jour de l\'événement :', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});

// DELETE un événement
app.delete('/api/events/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM events WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }
        res.json({ message: 'Événement supprimé avec succès' });
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'événement :', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});

// --- Endpoint API pour le formulaire de contact ---

// POST un nouveau message de contact
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
            [name, email, subject, message]
        );
        res.status(201).json({ id: result.insertId, message: 'Message de contact envoyé avec succès' });
    } catch (err) {
        console.error('Erreur lors de l\'envoi du message de contact :', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});

// GET tous les messages de contact
app.get('/api/contacts', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contacts ORDER BY submission_date DESC');
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des messages de contact :', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});

// DELETE un message de contact
app.delete('/api/contacts/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Message de contact non trouvé' });
        }
        res.json({ message: 'Message de contact supprimé avec succès' });
    } catch (err) {
        console.error('Erreur lors de la suppression du message de contact :', err);
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
