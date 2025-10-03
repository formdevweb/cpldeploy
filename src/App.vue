<script setup>
import { ref, reactive, provide, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AOS from 'aos';
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ScrollToTopButton from './components/ScrollToTopButton.vue'
import InfoWindow from './components/InfoWindow.vue'
import CookieConsent from './components/CookieConsent.vue'
import { store } from './store';

const route = useRoute();

const showCookieConsent = ref(false);

watch(() => route.path, (newPath) => {
  AOS.refresh();
  // Re-evaluate cookie consent banner visibility when route changes
  if (store.cookieConsentStatus === null && newPath !== '/politique-confidentialite') {
    showCookieConsent.value = true;
  } else if (newPath === '/politique-confidentialite') {
    showCookieConsent.value = false; // Hide banner if on privacy policy page
  }
});

onMounted(() => {
  if (store.cookieConsentStatus === null) {
    showCookieConsent.value = true;
  }
});

const infoWindowState = reactive({
  show: false,
  message: '',
  type: 'success',
  duration: 3000,
});

const showInfo = (message, type = 'success', duration = 3000) => {
  infoWindowState.message = message;
  infoWindowState.type = type;
  infoWindowState.duration = duration;
  infoWindowState.show = true;
};
provide('showInfo', showInfo);
</script>

<template>
  <div class="min-h-screen bg-brand-surface text-brand-secondary flex flex-col">
    <Navbar />
    <main class="flex-1 pt-20">

      <RouterView />
    </main>
    <Footer />
    <ScrollToTopButton />
    <InfoWindow
      :show="infoWindowState.show"
      :message="infoWindowState.message"
      :type="infoWindowState.type"
      :duration="infoWindowState.duration"
      @close="infoWindowState.show = false"
    />
    <CookieConsent :showBanner="showCookieConsent" @closeConsent="showCookieConsent = false" />
  </div>
  
</template>