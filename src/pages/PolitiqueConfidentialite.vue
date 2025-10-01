<template>
  <div class="bg-gray-100 min-h-screen">
    <section class="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-extrabold mb-4 text-yellow-400 text-shadow-sm">Politique de Confidentialité</h1>
        <p class="text-xl text-red-700">Informations sur la collecte et l'utilisation de vos données personnelles.</p>
      </div>
    </section>

    <div class="container mx-auto px-4 py-16 text-gray-800">
      <div class="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6">
        <button @click="router.back()" class="mb-10 inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-1 transition-all duration-300">
          <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          Retour
        </button>
        <h2 class="text-3xl font-bold text-brand-primary mb-4">1. Introduction</h2>
        <p>La présente politique de confidentialité décrit comment le Club Pongiste Libercourt collecte, utilise et protège les informations que vous nous fournissez lorsque vous utilisez notre site web.</p>

        <h2 class="text-3xl font-bold text-brand-primary mb-4">2. Collecte des informations personnelles</h2>
        <p>Nous collectons des informations personnelles lorsque vous utilisez notre formulaire de contact, vous inscrivez à nos activités ou interagissez avec notre site. Ces informations peuvent inclure votre nom, adresse e-mail, numéro de téléphone et toute autre information que vous choisissez de nous communiquer.</p>

        <h2 class="text-3xl font-bold text-brand-primary mb-4">3. Utilisation des informations collectées</h2>
        <p>Les informations collectées sont utilisées pour :</p>
        <ul class="list-disc list-inside ml-4 space-y-2">
          <li>Répondre à vos demandes et questions.</li>
          <li>Vous fournir des informations sur nos activités et événements.</li>
          <li>Améliorer nos services et votre expérience sur le site.</li>
        </ul>

        <h2 class="text-3xl font-bold text-brand-primary mb-4">4. Protection des données</h2>
        <p>Nous nous engageons à protéger la sécurité de vos informations personnelles. Nous utilisons des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre l'accès non autorisé, la divulgation, l'altération ou la destruction.</p>

        <h2 class="text-3xl font-bold text-brand-primary mb-4">5. Partage des informations</h2>
        <p>Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos informations avec des partenaires de confiance qui nous aident à exploiter notre site web ou à mener nos activités, à condition qu'ils acceptent de garder ces informations confidentielles.</p>

        <h2 class="text-3xl font-bold text-brand-primary mb-4">6. Vos droits</h2>
        <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant vos données personnelles. Pour exercer ces droits, veuillez nous contacter à [Email du club : contact@cpl-libercourt.com].</p>

        <h2 class="text-3xl font-bold text-brand-primary mb-4">7. Modifications de la politique de confidentialité</h2>
        <p>Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
