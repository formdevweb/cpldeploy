<template>
  <div class="bg-gray-100 py-16 md:py-24">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-5xl font-extrabold mb-4 text-brand-gold text-shadow-sm">Toutes les Actualités</h1>
      <p class="text-xl text-gray-700 mb-12">
        Retrouvez ici toutes les dernières nouvelles et événements du club.
      </p>

      <div class="mt-12 mb-8">
        <button v-if="store.isAdmin" @click="newsManagementRef.openAddModal()" class="btn btn-primary rounded-md px-8 py-3 text-lg shadow-sm transition transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-2 cursor-pointer">
          Ajouter une actualité
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="news in allNews" :key="news.id" class="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
          <div class="relative overflow-hidden">
            <picture>
              <source :srcset="news.image.replace(/\.(jpg|jpeg|png)$/, '.webp')" type="image/webp">
              <img :src="news.image" :alt="news.title" class="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105" loading="lazy" width="341" height="192"></picture>
            <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-300"></div>
          </div>
          <div class="p-6 text-left flex flex-col flex-grow">
            <div class="h-40">
              <p class="text-sm text-blue-600 font-medium mb-2">{{ formatDate(news.date) }}</p>
              <h3 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 line-clamp-2">{{ news.title }}</h3>
              <p class="text-gray-600 text-base line-clamp-3">{{ news.description }}</p>
            </div>
            <button @click="openNewsModal(news)" class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 inline-flex items-center gap-2 mt-4 mt-auto">
              Lire la suite
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
            <div v-if="store.isAdmin" class="mt-4 flex justify-end space-x-2">
              <button @click.stop="newsManagementRef.openEditNewsModal(news)" class="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">Modifier</button>
              <button @click.stop="newsManagementRef.deleteNews(news.id)" class="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <NewsModal :show="showModal" :news="selectedNews" @close="closeNewsModal" />
  <NewsManagement ref="newsManagementRef" @news-updated="handleNewsUpdated" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import NewsModal from '../components/NewsModal.vue'
import NewsManagement from '../components/NewsManagement.vue'
import { store } from '../store'
import axios from 'axios'; // Import axios

const showModal = ref(false)
const selectedNews = ref(null)
const newsManagementRef = ref(null);

const allNews = ref([]);

const fetchNews = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/news`);
    allNews.value = response.data;
    console.log('Actualités récupérées du backend :', allNews.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des actualités :', error);
  }
};

const handleNewsUpdated = () => {
  fetchNews(); // Recharger les actualités après une mise à jour (ajout, modif, suppression)
};

onMounted(() => {
  fetchNews();
});

watch(allNews, (newNews) => {
  // Plus besoin de sauvegarder dans localStorage, les données viennent du backend
}, { deep: true });

const openNewsModal = (news) => {
  selectedNews.value = news
  showModal.value = true
}

const closeNewsModal = () => {
  showModal.value = false
  selectedNews.value = null
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};
</script>

<style scoped>
/* Styles spécifiques à la liste des actualités */
</style>