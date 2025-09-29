<script setup>
import { ref, reactive, provide, watch } from 'vue';
import { useRoute } from 'vue-router';
import AOS from 'aos';
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ScrollToTopButton from './components/ScrollToTopButton.vue'
import InfoWindow from './components/InfoWindow.vue'

const route = useRoute();

watch(() => route.path, () => {
  AOS.refresh();
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
    <main class="flex-1 pt-24">

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
  </div>
  
</template>