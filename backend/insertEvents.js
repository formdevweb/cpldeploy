const fetch = require('node-fetch');

const eventsData = [
  {
    title: 'Tournoi de Printemps',
    date: new Date(2025, 3, 15, 9, 0, 0), // 15 avril 2025, 09:00:00
    description: 'Tournoi annuel de printemps ouvert à toutes les catégories.',
    location: 'Salle Omnisports, Libercourt',
    status: 'open',
    participants: 30
  },
  {
    title: 'Championnat Départemental',
    date: new Date(2025, 4, 10, 10, 0, 0), // 10 mai 2025, 10:00:00
    description: 'Phases finales du championnat départemental de tennis de table.',
    location: 'Gymnase Municipal, Lens',
    status: 'closed',
    participants: 120
  },
  {
    title: 'Entraînement Spécial Jeunes',
    date: new Date(2025, 5, 5, 14, 0, 0), // 5 juin 2025, 14:00:00
    description: 'Séance d\'entraînement intensive pour les jeunes de moins de 15 ans.',
    location: 'Salle du Club, Libercourt',
    status: 'open',
    participants: 15
  },
  {
    title: 'Assemblée Générale Annuelle',
    date: new Date(2025, 6, 20, 18, 30, 0), // 20 juillet 2025, 18:30:00
    description: 'Réunion annuelle des membres du club pour discuter des bilans et projets.',
    location: 'Maison des Associations, Libercourt',
    status: 'closed',
    participants: 50
  },
  {
    title: 'Stage d\'été de Perfectionnement',
    date: new Date(2025, 7, 1, 9, 0, 0), // 1er août 2025, 09:00:00
    description: 'Stage d\'une semaine pour améliorer les techniques de jeu.',
    location: 'Salle Omnisports, Libercourt',
    status: 'open',
    participants: 20
  },
  {
    title: 'Fête du Club',
    date: new Date(2025, 8, 1, 19, 0, 0), // 1er septembre 2025, 19:00:00
    description: 'Soirée conviviale pour célébrer la fin de saison et le début de la nouvelle.',
    location: 'Restaurant Le Relais, Libercourt',
    status: 'closed',
    participants: 80
  },
  {
    title: 'Open de Rentrée',
    date: new Date(2025, 9, 10, 9, 30, 0), // 10 octobre 2025, 09:30:00
    description: 'Premier tournoi de la nouvelle saison, toutes catégories confondues.',
    location: 'Salle Omnisports, Libercourt',
    status: 'open',
    participants: 45
  },
  {
    title: 'Cours d\'essai Gratuits',
    date: new Date(2025, 9, 20, 17, 0, 0), // 20 octobre 2025, 17:00:00
    description: 'Journée portes ouvertes pour découvrir le tennis de table.',
    location: 'Salle du Club, Libercourt',
    status: 'open',
    participants: 25
  },
  {
    title: 'Interclubs Régionaux',
    date: new Date(2025, 10, 15, 13, 0, 0), // 15 novembre 2025, 13:00:00
    description: 'Matchs de championnat interclubs contre les équipes de la région.',
    location: 'Diverses salles régionales',
    status: 'closed',
    participants: 60
  },
  {
    title: 'Tournoi de Noël',
    date: new Date(2025, 11, 15, 10, 0, 0), // 15 décembre 2025, 10:00:00
    description: 'Tournoi amical de fin d\'année avec repas partagé.',
    location: 'Salle Omnisports, Libercourt',
    status: 'open',
    participants: 40
  }
];

async function insertEvents() {
  for (const event of eventsData) {
    try {
      const response = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...event, date: event.date.toISOString() }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      console.log(`Événement \"${event.title}\" ajouté avec succès.`);
    } catch (error) {
      console.error(`Erreur lors de l'ajout de l'événement \"${event.title}\":`, error);
    }
  }
}

insertEvents();