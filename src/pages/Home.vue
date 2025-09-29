<script setup>
import ActivitiesSection from '../components/ActivitiesSection.vue'
import UpcomingEvents from '../components/UpcomingEvents.vue'
import NewsSection from '../components/NewsSection.vue'

import { onMounted, ref } from 'vue' // Import onMounted and ref
import canvasConfetti from 'canvas-confetti' // Import canvas-confetti
import axios from 'axios'; // Import axios

const latestNews = ref([]); // Reactive variable to store latest news

onMounted(async () => {
  // Trigger confetti when the component is mounted
  canvasConfetti({
    particleCount: 400, // Even more visible
    spread: 180,
    origin: { y: 0 },
    gravity: 0.7,
    decay: 0.9,
    ticks: 400,
    scalar: 1.2,
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
  });

  // Fetch latest news from backend
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/news?limit=3`);
    latestNews.value = response.data; // Assign fetched data to the reactive variable
    console.log('Dernières actualités récupérées du backend pour la page d\'accueil :', latestNews.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des dernières actualités :', error);
  }
});
</script>

<template>
  <div class="bg-gray-100">
    <section class="hero-section relative bg-cover bg-center py-12 sm:py-16 md:py-20 md:min-h-screen text-white flex items-center justify-center">
      <img src="/assets/hero.webp" alt="Salle du Club Pongiste Libercourtois avec des joueurs de tennis de table en action" class="absolute inset-0 w-full h-full object-cover">
      <div class="absolute inset-0 bg-black opacity-40"></div>
      <div class="container mx-auto px-4 text-center relative z-10 flex flex-col items-center justify-center h-full">        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-brand-gold text-shadow-sm">Rejoignez une communauté passionnée</h1>
        <p class="text-base sm:text-lg md:text-xl mb-8 max-w-3xl mx-auto text-shadow-sm">
          Le Club Pongiste Libercourtois accueille les joueurs de tous âges et de tous niveaux.
          Découvrez le plaisir du tennis de table dans une ambiance conviviale et dynamique.
        </p>
        <div class="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <RouterLink :to="{ name: 'club' }" class="btn btn-primary rounded-md px-5 py-2 sm:px-6 sm:py-3 text-white shadow-sm transition transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-2 w-full sm:w-auto">
            Découvrir le club
          </RouterLink>
          <RouterLink :to="{ name: 'horaires-tarifs' }" class="btn rounded-md border border-brand-accent px-5 py-2 sm:px-6 sm:py-3 text-brand-accent transition hover:bg-rose-600 hover:text-white w-full sm:w-auto">
            Horaires & Tarifs
          </RouterLink>
        </div>
      </div>
    </section>
    <div class="container mx-auto px-4 py-16">
      <ActivitiesSection class="mb-12" />
      <NewsSection :news="latestNews" class="mb-12" />
      <UpcomingEvents />
    </div>
  </div>
</template>