<template>
  <Transition name="fade">
    <div v-if="showBanner" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div class="bg-white text-gray-800 rounded-2xl shadow-2xl py-10 px-8 max-w-2xl w-full mx-auto relative transform transition-all duration-300 ease-out border-2 border-blue-200">
        <h2 class="text-3xl font-bold mb-6 text-blue-800 text-shadow-sm">Gestion des Cookies</h2>
        <p class="text-lg leading-relaxed text-gray-700 mb-8">
          Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser le trafic du site et personnaliser le contenu. En cliquant sur "Accepter", vous consentez à l'utilisation de tous les cookies. Pour en savoir plus ou modifier vos préférences, consultez notre
          <RouterLink to="/politique-confidentialite" @click="emit('closeConsent')" class="text-blue-600 hover:underline font-medium">Politique de Confidentialité</RouterLink>.
        </p>
        <div class="flex flex-col sm:flex-row justify-end gap-4">
          <button @click="declineCookies" class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 shadow-md transform hover:-translate-y-1 hover:shadow-xl">
            Refuser
          </button>
          <button @click="acceptCookies" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-xl">
            Accepter
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { store } from '../store';

const props = defineProps({
  showBanner: Boolean,
});

const emit = defineEmits(['closeConsent']);

const acceptCookies = () => {
  store.setCookieConsent('accepted');
  emit('closeConsent'); // Close the modal after action
  console.log('Cookies accepted');
};

const declineCookies = () => {
  store.setCookieConsent('declined');
  emit('closeConsent'); // Close the modal after action
  console.log('Cookies declined');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>