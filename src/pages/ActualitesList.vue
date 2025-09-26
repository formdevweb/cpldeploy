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
        <div v-for="news in allNews" :key="news.id" class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" @click="openNewsModal(news)">
          <img :src="news.image" :alt="news.title" class="w-full h-48 object-cover">
          <div class="p-6 text-left">
            <p class="text-sm text-gray-500 mb-2">{{ formatDate(news.date) }}</p>
            <h3 class="text-xl font-semibold text-gray-800 mb-3">{{ news.title }}</h3>
            <p class="text-gray-600 text-base">{{ news.description }}</p>
            <span class="text-brand-accent hover:underline mt-4 inline-block">Lire la suite</span>
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