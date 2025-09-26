const fetch = require('node-fetch');

const licenciesData = [
  { rank: 11, name: 'Thierry JANSSENS', category: 'Vétéran 50', licence: '621464', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 10, name: 'Vincent DARUL', category: 'Vétéran 45', licence: 'XXXXXX-69', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 9, name: 'Thierry GUILBERT', category: 'Vétéran 55', licence: '6211172', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 9, name: 'Yves WACRENIER', category: 'Vétéran 60', licence: '593618', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 9, name: 'Patrick LEVRAY', category: 'Vétéran 55', licence: '6233778', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 8, name: 'Christopher GUILBERT', category: 'Sénior', licence: '6219481', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 8, name: 'Jean-Marc CARION', category: 'Vétéran 60', licence: '6210259', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 7, name: 'Jean-Michel CORMONT', category: 'Vétéran 65', licence: '621074', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 7, name: 'Claude DUTEMPLE', category: 'Vétéran 65', licence: 'XXXXXX-1', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 7, name: 'Bruno ROGER', category: 'Vétéran 65', licence: 'XXXXXX-2', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 7, name: 'Sebastien JANSSENS', category: 'Vétéran 45', licence: 'XXXXXX-3', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Maelis RENARD', category: 'Poussin', licence: 'XXXXXX-4', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 6, name: 'Eric HILAIRE', category: 'Vétéran 55', licence: 'XXXXXX-5', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Hugo DUBRULLE', category: 'Benjamin', licence: 'XXXXXX-6', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Florine LAVOISIER', category: 'Benjamin', licence: '6230303', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Léo BENOIT', category: 'Cadet', licence: '6231697', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 6, name: 'Mathis DERVAUX', category: 'Vétéran 50', licence: 'XXXXXX-7', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 6, name: 'Christophe Ghesquier', category: 'Vétéran 50', licence: '6219701', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 6, name: 'Kamel ATMANI', category: 'Vétéran 55', licence: 'XXXXXX-8', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Thibaut MILLE', category: 'Poussin', licence: 'XXXXXX-9', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 6, name: 'Sandrine BENOIT', category: 'Vétéran 50', licence: 'XXXXXX-10', gender: 'Femme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Theo BENOIT', category: 'Junior', licence: 'XXXXXX-11', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Frederic BERTELOOT', category: 'Vétéran 50', licence: 'XXXXXX-12', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Evan BLAZIN', category: 'Poussin', licence: 'XXXXXX-13', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Kalyssa BLONDEAU', category: 'Cadet', licence: 'XXXXXX-14', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Talya BLOQUET VILLE', category: 'Poussin', licence: 'XXXXXX-15', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Aliya BOULOUZ', category: 'Poussin', licence: 'XXXXXX-16', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Cedric BOUQUET', category: 'Junior', licence: 'XXXXXX-17', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Salif BOURHALI', category: 'Poussin', licence: 'XXXXXX-18', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Lariane CARLIER', category: 'Poussin', licence: 'XXXXXX-19', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Rosie CHEMARMA', category: 'Poussin', licence: 'XXXXXX-20', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Djemai CHEMARMA', category: 'Vétéran 65', licence: 'XXXXXX-21', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Ryad CHEMARMA', category: 'Poussin', licence: 'XXXXXX-22', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Thierry CODEVELLE', category: 'Vétéran 55', licence: 'XXXXXX-23', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Guilson DAULL-LORENZO', category: 'Junior', licence: 'XXXXXX-24', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Cedric DELGEHIER', category: 'Vétéran 50', licence: 'XXXXXX-25', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Emma DELGEHIER', category: 'Minime', licence: 'XXXXXX-26', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Louna DELGEHIER', category: 'Cadet', licence: 'XXXXXX-27', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Florian DERMI', category: 'Poussin', licence: 'XXXXXX-28', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Lenzo DERVAUX', category: 'Junior', licence: 'XXXXXX-29', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Ludovic DERVAUX', category: 'Vétéran 50', licence: 'XXXXXX-30', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Thomas DERVAUX', category: 'Senior', licence: 'XXXXXX-31', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Julien DESHAYES', category: 'Poussin', licence: 'XXXXXX-32', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Lionel DHALUIN', category: 'Vétéran 50', licence: 'XXXXXX-33', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Lilian DHEDIN', category: 'Vétéran 50', licence: 'XXXXXX-34', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Amélie DUBOIS', category: 'Cadet', licence: 'XXXXXX-35', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Arnaud DUBOIS', category: 'Vétéran 50', licence: 'XXXXXX-36', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Maelle DUBRULLE', category: 'Cadet', licence: 'XXXXXX-37', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Quentin DUBRULLE', category: 'Vétéran 45', licence: 'XXXXXX-38', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Alain FIRMIN', category: 'Vétéran 65', licence: 'XXXXXX-39', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Manon FLICKE', category: 'Cadet', licence: 'XXXXXX-40', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Sylvain GHESQUIER', category: 'Vétéran 50', licence: 'XXXXXX-41', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Edouard GUICHARD', category: 'Vétéran 75', licence: 'XXXXXX-42', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Yohan GUILBERT', category: 'Junior', licence: 'XXXXXX-43', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Alexandre HENNO', category: 'Senior', licence: 'XXXXXX-44', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Stéphane LAURENT', category: 'Vétéran 50', licence: 'XXXXXX-45', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Kelly LAVOISIER', category: 'Vétéran 40', licence: 'XXXXXX-46', gender: 'Femme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Maxime LAVOISIER', category: 'Cadet', licence: 'XXXXXX-47', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Baptiste LEPRETRE-JACKOWIAK', category: 'Benjamin', licence: 'XXXXXX-48', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Jules LENGLET-CWOJDZINSKI', category: 'Poussin', licence: 'XXXXXX-49', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Clara MARCHETTI', category: 'Senior', licence: 'XXXXXX-50', gender: 'Femme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Timeo MARTEL', category: 'Junior', licence: 'XXXXXX-51', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Nathalie MILLE', category: 'Vétéran 50', licence: 'XXXXXX-52', gender: 'Femme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Patrick MILLE', category: 'Vétéran 50', licence: 'XXXXXX-53', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Yanis MOERBIT', category: 'Junior', licence: 'XXXXXX-54', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Mael PAYEN', category: 'Benjamin', licence: 'XXXXXX-55', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Nathan PIERSON', category: 'Cadet', licence: 'XXXXXX-56', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Vincent PIERSON', category: 'Vétéran 45', licence: 'XXXXXX-57', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Francis POUDROUX', category: 'Vétéran 65', licence: 'XXXXXX-58', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Solenne SGAILLA', category: 'Poussin', licence: 'XXXXXX-59', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Linda SOCQUET-JUGLARD', category: 'Vétéran 40', licence: 'XXXXXX-60', gender: 'Femme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Paul STRACULORUM', category: 'Poussin', licence: 'XXXXXX-61', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Brunhilde STIEHLE', category: 'Poussin', licence: 'XXXXXX-62', gender: 'Femme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Morgan TETU', category: 'Vétéran 40', licence: 'XXXXXX-63', gender: 'Homme', age_category: 'Adulte', photo: null },
  { rank: 5, name: 'Nolan WANTREPOTTE', category: 'Benjamin', licence: 'XXXXXX-64', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Edouard VERBEKE-MICHALIK', category: 'Junior', licence: 'XXXXXX-65', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Yolan WAC', category: 'Cadet', licence: 'XXXXXX-66', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Abdelhakim ZAGUAR', category: 'Poussin', licence: 'XXXXXX-67', gender: 'Homme', age_category: 'Junior', photo: null },
  { rank: 5, name: 'Enzo ZENNI', category: 'Junior', licence: 'XXXXXX-68', gender: 'Homme', age_category: 'Junior', photo: null },
];

async function insertLicencies() {
  for (const licencie of licenciesData) {
    try {
      const response = await fetch('http://localhost:3000/api/licencies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(licencie),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      console.log(`Licencié ${licencie.name} ajouté avec succès.`);
    } catch (error) {
      if (error.message && error.message.includes('Duplicate entry')) {
        console.warn(`Licencié ${licencie.name} (licence: ${licencie.licence}) déjà existant, ignoré.`);
      } else {
        console.error(`Erreur lors de l'ajout du licencié ${licencie.name}:`, error);
      }
    }
  }
}

insertLicencies();
