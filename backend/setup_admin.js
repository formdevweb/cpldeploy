require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const path = require('path');

const dbConfig = process.env.DATABASE_URL;
const adminUsername = 'cplibercourt';
const adminPassword = 'tcholet';

async function setupAdmin() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connecté à la base de données MySQL !');

        // Create users table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `);
        console.log('Table "users" créée ou déjà existante.');

        // Check if admin user already exists
        const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [adminUsername]);
        if (rows.length > 0) {
            console.log('L\'utilisateur admin existe déjà.');
            return;
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
        console.log('Mot de passe haché.');

        // Insert admin user
        await connection.execute('INSERT INTO users (username, password) VALUES (?, ?)', [adminUsername, hashedPassword]);
        console.log('Utilisateur admin inséré avec succès.');

    } catch (err) {
        console.error('Erreur lors de la configuration de l\'admin :', err);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Connexion à la base de données fermée.');
        }
    }
}

setupAdmin();
