<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Header -->
    <section class="bg-[#36455B] text-white py-32">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-extrabold mb-6 text-yellow-400 text-shadow-sm">Contactez-nous</h1>
        <p class="text-2xl text-white text-shadow-sm">Nous sommes là pour répondre à toutes vos questions.</p>
      </div>
    </section>

    <div class="container mx-auto px-4 py-16">

      <!-- Nos Contacts -->
      <section class="mb-16">
        <h2 class="text-5xl font-bold text-center text-blue-600 text-shadow-sm mb-4">Nos Contacts</h2>
        <p class="text-lg text-center text-gray-700 max-w-2xl mx-auto mb-12">Une équipe dévouée à votre service.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto">
          <div v-for="contact in contacts" :key="contact.name" class="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4" :class="[contact.color.replace('text-', 'border-'), contact.color.replace('text-', 'hover:bg-').replace('-500', '-100')]" >
            <div class="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center" :class="contact.color.replace('text-', 'bg-opacity-20 bg-')">
              <div v-html="contact.icon" :class="contact.color"></div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-800">{{ contact.name }}</h3>
              <p class="text-gray-600 font-semibold">{{ contact.role }}</p>
              <ul class="mt-2 text-sm text-gray-500">
                <li v-for="responsibility in contact.responsibilities" :key="responsibility">- {{ responsibility }}</li>
              </ul>
            </div>
          </div> <!-- Closing div for v-for -->
        </div> <!-- Closing div for grid -->
      </section> <!-- Closing section for Nos Contacts -->
    </div> <!-- Closing div for container -->

          <div class="w-full my-8">
            <svg class="w-full h-auto" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,5 Q50,0 100,5" stroke="#10B981" stroke-width="0.1" fill="none"/>
            </svg>
          </div>
    
        <div class="container mx-auto px-4 py-16">
          <!-- Permanences -->      <section class="mb-16">
        <h2 class="text-5xl font-bold text-center text-blue-600 text-shadow-sm mb-4">Permanences</h2>
        <p class="text-lg text-center text-gray-700 max-w-2xl mx-auto mb-12">Venez nous rencontrer directement à la salle.</p>
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200 transition-all duration-300 hover:shadow-xl">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Disponibilité des Responsables</h3>
            <p class="text-gray-600 mb-6">Nous sommes disponibles lors des créneaux d'entraînement et sur rendez-vous.</p>
            <div class="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded-r-lg flex flex-col items-center text-center">
                <svg class="w-8 h-8 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                <p class="font-bold text-xl mb-4">Contactez-nous</p>
                <div class="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
                    <a href="mailto:contact@cpl-libercourt.com" class="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 w-full">Email</a>
                    <a href="tel:0660051241" @click="handlePhoneClick('0660051241', $event)" class="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 w-full cursor-pointer" title="Cliquez pour appeler (mobile) ou copier le numéro (ordinateur)">Téléphone</a>
                </div>
            </div>
        </div>
      </section>
    </div> <!-- Closing div for container -->

          <div class="w-full my-8">
            <svg class="w-full h-auto" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,5 Q50,10 100,5" stroke="#10B981" stroke-width="0.1" fill="none"/>
            </svg>
          </div>
    
        <div class="container mx-auto px-4 py-16">
          <!-- Écrivez-nous -->      <section id="formulaire" class="mb-16">

        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 form-pattern-bg">
          <!-- Success/Error Messages -->
          <div v-if="successMessage" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
            <p class="font-bold">Succès !</p>
            <p>{{ successMessage }}</p>
          </div>
          <div v-if="errorMessage" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p class="font-bold">Erreur !</p>
            <p>{{ errorMessage }}</p>
          </div>
          <form @submit.prevent="submitForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-gray-800 font-semibold mb-2">Nom <span class="text-red-500">*</span></label>
                <input type="text" id="name" v-model="form.name" class="w-full p-3 border-2 border-blue-300 rounded-lg text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:shadow-lg transition-all duration-300 shadow-md" required>
              </div>
              <div>
                <label for="email" class="block text-gray-800 font-semibold mb-2">Email <span class="text-red-500">*</span></label>
                <input type="email" id="email" v-model="form.email" class="w-full p-3 border-2 border-blue-300 rounded-lg text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:shadow-lg transition-all duration-300 shadow-md" required>
              </div>
              <div class="md:col-span-2">
                <label for="subject" class="block text-gray-800 font-semibold mb-2">Sujet <span class="text-red-500">*</span></label>
                <select id="subject" v-model="form.subject" class="w-full p-3 border-2 border-blue-300 rounded-lg text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:shadow-lg transition-all duration-300 shadow-md" required>
                  <option>Question générale</option>
                  <option>Inscription</option>
                  <option>Compétition</option>
                  <option>Autre</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label for="message" class="block text-gray-800 font-semibold mb-2">Message <span class="text-red-500">*</span></label>
                <textarea id="message" v-model="form.message" rows="5" class="w-full p-3 border-2 border-blue-300 rounded-lg text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:shadow-lg transition-all duration-300 shadow-md" required></textarea>
              </div>
            </div>
            <div class="text-center mt-8">
              <button type="submit" class="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 transform hover:scale-105 shadow-md cursor-pointer">Envoyer le message</button>
            </div>
          </form>
        </div>
      </section>
    </div> <!-- Closing div for container -->

          <div class="w-full my-8">
            <svg class="w-full h-auto" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,5 Q50,0 100,5" stroke="#10B981" stroke-width="0.1" fill="none"/>
            </svg>
          </div>
    
        <div class="container mx-auto px-4 py-16">
          <!-- Plan d'accès -->      <section>
        <h2 class="text-5xl font-bold text-center text-blue-600 text-shadow-sm mb-4">Plan d'accès</h2>
        <p class="text-lg text-center text-gray-700 max-w-2xl mx-auto mb-12">Trouvez facilement notre salle de sport à Libercourt.</p>
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="bg-blue-50 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Informations d'accès</h3>
                <div class="space-y-6 text-gray-600">
                    <div class="flex items-start"><svg class="w-6 h-6 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><div class="flex-1">        <span class="font-semibold text-blue-700 mr-2">Adresse </span><span class="text-gray-700">Complexe Sportif Léo Lagrange,<br><span class="pl-20">32 Rue André Pantigny, 62820 Libercourt</span></span></div></div>
                    <div class="flex items-start"><svg class="w-6 h-6 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 014 0z"></path></svg><div class="flex-1">        <span class="font-semibold text-blue-700 mr-2">Parking </span><span class="text-gray-700">Parking gratuit disponible devant la salle.</span></div></div>
                    <div class="flex items-start"><svg class="w-6 h-6 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m3 0V4a3 3 0 013-3h3a3 3 0 013 3v15m-6 0h6"></path></svg><div class="flex-1">        <span class="font-semibold text-blue-700 mr-2">Accessibilité </span><span class="text-gray-700">Salle accessible aux personnes à mobilité</span><span class="text-gray-700 block pl-28">réduite.</span></div></div>
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=Complexe+Sportif+Leo+Lagrange+62820+Libercourt" target="_blank" class="mt-6 inline-block w-full text-center bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">Voir sur Google Maps</a>
                <a href="https://www.google.com/maps/dir/?api=1&destination=Complexe+Sportif+Leo+Lagrange+62820+Libercourt" target="_blank" class="mt-2 inline-block w-full text-center bg-blue-100 text-blue-700 py-3 px-6 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors duration-300 border border-blue-300">Calculer l'itinéraire</a>
            </div>
            <div class="rounded-xl shadow-lg overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2546.580171350664!2d2.978623815693875!3d50.4479499794752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd3f23a5267ab7%3A0x8dc3b1f7a23d5c7c!2sComplexe%20Sportif%20L%C3%A9o%20Lagrange!5e0!3m2!1sfr!2sfr!4v1633006123456!5m2!1sfr!2sfr" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { usePhoneHandler } from '../composables/usePhoneHandler';

const form = ref({
  name: '',
  email: '',
  subject: 'Question générale',
  message: '',
});

const successMessage = ref('');
const errorMessage = ref('');

const showInfo = inject('showInfo');

const submitForm = async () => {
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de l\'envoi du message.');
    }

    successMessage.value = 'Votre message a été envoyé avec succès !';
    // Clear the form
    form.value = {
      name: '',
      email: '',
      subject: 'Question générale',
      message: '',
    };
  } catch (error) {
    errorMessage.value = error.message;
    console.error('Erreur lors de la soumission du formulaire:', error);
  }
};

const { handlePhoneClick } = usePhoneHandler();

const contacts = [
  {
    name: 'Thierry Guilbert',
    role: 'Président',
    responsibilities: ['Gestion générale', 'Relations extérieures', 'Compétitions'],
    icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>', // Users icon
    color: 'text-blue-500'
  },
  {
    name: 'Francis Poudroux',
    role: 'Secrétaire',
    responsibilities: ['Secrétariat', 'Procès-verbaux', 'Correspondance'],
    icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>', // Document icon
    color: 'text-green-500'
  },
  {
    name: 'Cédric DELGEHIER',
    role: 'Secrétaire adjoint',
    responsibilities: ['Communication', 'Site web', 'Gestion des inscriptions'],
    icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>', // Code icon
    color: 'text-yellow-500'
  },
  {
    name: 'Patrick Levray',
    role: 'Trésorier',
    responsibilities: ['Gestion financière', 'Comptabilité', 'Budgets'],
    icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>', // Credit card icon
    color: 'text-red-500'
  },
  {
    name: 'Vincent DARUL',
    role: 'Trésorier adjoint',
    responsibilities: ['Gestion financière', 'Suivi des cotisations', 'Aide budgets'],
    icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>', // Credit card icon
    color: 'text-red-500'
  },
  {
    name: 'Nathalie Guilbert',
    role: 'Déléguée aux manifestations',
    responsibilities: ['Organisation événements', 'Tournois', 'Manifestations'],
    icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>', // Clock icon
    color: 'text-purple-500'
  },
];

</script>

<style scoped>
.form-pattern-bg {
  background-color: #f0f9ff; /* A very light blue background */
  background-image: repeating-linear-gradient(
    45deg,
    #e0f2fe 0,
    #e0f2fe 1px,
    #f0f9ff 0,
    #f0f9ff 50%
  );
  background-size: 10px 10px;
}
</style>
