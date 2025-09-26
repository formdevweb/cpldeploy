<template>
  <div>
    <section class="py-16 md:py-24 bg-white border border-gray-200" data-aos="fade-up">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-5xl font-extrabold mb-4 text-rose-600 text-shadow-sm">Dernières Actualités</h2>
        <p class="text-xl text-gray-700 mb-12">
          Restez informé de la vie du club, des résultats et des événements à ne pas manquer.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="newsItem in news" :key="newsItem.id" class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" @click="openNewsModal(newsItem)">
            <picture>
              <source :srcset="newsItem.image.replace(/\.(jpg|jpeg|png)$/, '.webp')" type="image/webp">
              <img :src="newsItem.image" :alt="newsItem.title" class="w-full h-48 object-cover" loading="lazy">
            </picture>
            <div class="p-6 text-left">
              <p class="text-sm text-gray-500 mb-2">{{ formatDate(newsItem.date) }}</p>
              <h3 class="text-xl font-semibold text-gray-800 mb-3">{{ newsItem.title }}</h3>
              <p class="text-gray-600 text-base">{{ newsItem.description }}</p>
              <span class="text-brand-accent hover:underline mt-4 inline-block">Lire la suite</span>
            </div>
          </div>
        </div>

        <div class="mt-12">
          <RouterLink :to="{ name: 'actualites-list' }" class="btn btn-primary rounded-md px-8 py-3 text-lg shadow-sm transition transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-2">
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