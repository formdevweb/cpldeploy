<template>
  <div>
    <section class="py-12 sm:py-16 md:py-24 bg-white border border-gray-200" data-aos="fade-up">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-rose-600 text-shadow-sm">Dernières Actualités</h2>
        <p class="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-12">
          Restez informé de la vie du club, des résultats et des événements à ne pas manquer.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div v-for="newsItem in news" :key="newsItem.id" class="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
            <div class="relative overflow-hidden">
              <picture>
                <source :srcset="newsItem.image.replace(/\.(jpg|jpeg|png)$/, '.webp')" type="image/webp">
                <img :src="newsItem.image" :alt="newsItem.title" class="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105" loading="lazy" width="341" height="192">
              </picture>
              <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-300"></div>
            </div>
            <div class="p-4 sm:p-6 text-left flex flex-col flex-grow">
              <div class="h-32">
                <p class="text-xs sm:text-sm text-blue-600 font-medium mb-1 sm:mb-2">{{ formatDate(newsItem.date) }}</p>
                <h3 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 line-clamp-2">{{ newsItem.title }}</h3>
                <p class="text-sm sm:text-base text-gray-600 line-clamp-3">{{ newsItem.description }}</p>
              </div>
              <button @click="openNewsModal(newsItem)" class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 inline-flex items-center gap-2 mt-3 sm:mt-4 mt-auto">
                Lire la suite
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-10 sm:mt-12">
          <RouterLink :to="{ name: 'actualites-list' }" class="btn btn-primary rounded-md px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg shadow-sm transition transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-2">
            Voir toutes les actualités
          </RouterLink>
        </div>
      </div>
    </section>

    <NewsModal :show="showModal" :news="selectedNews" @close="closeNewsModal" @delete="handleDeleteNews" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import NewsModal from './NewsModal.vue'
import { store } from '../store'

const props = defineProps({
  news: {
    type: Array,
    default: () => []
  }
});

const showModal = ref(false)
const selectedNews = ref(null)

const openNewsModal = (newsItem) => {
  selectedNews.value = newsItem
  showModal.value = true
}

const closeNewsModal = () => {
  showModal.value = false
  selectedNews.value = null
}

const handleDeleteNews = (newsItem) => {
  if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'actualité "${newsItem.title}" ? Cette action est irréversible.`)) {
    deleteNewsItem(newsItem.id);
  }
};

const deleteNewsItem = (newsId) => {
  console.log(`Deleting news item with ID: ${newsId}`);
  // Here you would typically make an API call to delete the news item
  // For example:
  // fetch(`/api/news/${newsId}`, { method: 'DELETE' })
  //   .then(response => {
  //     if (response.ok) {
  //       // Remove the item from the news array
  //       news.value = news.value.filter(item => item.id !== newsId);
  //       closeNewsModal();
  //     } else {
  //       alert('Erreur lors de la suppression de l\'actualité.');
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error deleting news item:', error);
  //     alert('Erreur lors de la suppression de l\'actualité.');
  //   });
  closeNewsModal(); // Close the modal after "deletion" (for now)
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};
</script>