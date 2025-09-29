<template>
  <!-- Add/Edit News Modal -->
  <Transition name="modal">
    <div
      v-if="showEditNewsModal"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 overflow-y-auto p-4"
    >
      <div
        class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md modal-container mx-4 max-h-full overflow-y-auto"
      >
        <h2 class="text-3xl font-bold mb-6 text-gray-800 pb-2 border-b-2 border-gray-200">
          {{ formModel.id ? "Modifier l'actualité" : "Ajouter une actualité" }}
        </h2>
        <form @submit.prevent="formModel.id ? updateNews() : addNews()">
          <div class="grid grid-cols-1 gap-4">
            <div class="mb-4">
              <label for="title" class="block text-gray-700 font-semibold mb-2"
                >Titre</label
              >
              <input
                type="text"
                v-model="formModel.title"
                class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300 shadow-sm focus:shadow-md"
                required
              />
            </div>
            <div class="mb-4">
              <label for="date" class="block text-gray-700 font-semibold mb-2"
                >Date</label
              >
              <input
                type="date"
                v-model="formModel.date"
                class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300 shadow-sm focus:shadow-md"
                required
              />
            </div>
            <div class="mb-4">
              <label for="image" class="block text-gray-700 font-semibold mb-2"
                >Image</label
              >
              <input
                type="file"
                @change="handleImageUpload"
                id="image"
                accept="image/*"
                class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300 shadow-sm focus:shadow-md"
              />
              <img v-if="formModel.image" :src="formModel.image" alt="Aperçu de l'image" class="mt-4 w-full h-auto rounded-lg shadow-md" width="341" height="192">
            </div>
            <div class="mb-4">
              <label
                for="description"
                class="block text-gray-700 font-semibold mb-2"
                >Description courte</label
              >
              <textarea
                v-model="formModel.description"
                class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300 shadow-sm focus:shadow-md"
                required
              ></textarea>
            </div>
            <div class="mb-4">
              <label
                for="fullContent"
                class="block text-gray-700 font-semibold mb-2"
                >Contenu complet</label
              >
              <textarea
                v-model="formModel.fullContent"
                id="fullContent"
                class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300 shadow-sm focus:shadow-md"
                required
              ></textarea>
            </div>
            <div class="mb-4">
              <label for="author" class="block text-gray-700 font-semibold mb-2"
                >Auteur</label
              >
              <input
                type="text"
                v-model="formModel.author"
                id="author"
                class="w-full p-2 !h-10 !resize-none border-2 border-gray-200 rounded-lg text-black focus:border-blue-500"
                required
              />
            </div>

          </div>
          <div class="flex justify-end mt-6 gap-4">
            <button
              type="button"
              @click="closeEditNewsModal"
              class="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="bg-brand-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-accent transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              {{ formModel.id ? "Modifier" : "Ajouter" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>

  <!-- Delete Confirmation Modal -->
  <Transition name="modal">
    <div
      v-if="showDeleteConfirmationModal"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 overflow-y-auto p-4"
    >
      <div
        class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm modal-container mx-4 max-h-full overflow-y-auto"
      >
        <h2 class="text-2xl font-bold mb-4 text-gray-800">
          Confirmer la suppression
        </h2>
        <p class="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer cette actualité ? Cette action est
          irréversible.
        </p>
        <div class="flex justify-end gap-4">
          <button
            @click="closeDeleteConfirmationModal"
            class="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 cursor-pointer"
          >
            Annuler
          </button>
          <button
            @click="confirmDelete"
            class="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 cursor-pointer"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../store'
import axios from 'axios'; // Import axios

const emit = defineEmits(['news-updated', 'open-add-modal']);

const showEditNewsModal = ref(false)
const showDeleteConfirmationModal = ref(false)
const formModel = ref({
  id: null,
  title: '',
  date: '',
  image: '',
  description: '',
  fullContent: '',
  author: ''
});
const newsToDeleteId = ref(null);



const openAddModal = () => {
  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
  formModel.value = {
    id: null,
    title: '',
    date: today,
    image: '',
    description: '',
    fullContent: '',
    author: ''
  };
  showEditNewsModal.value = true;
};

const openEditNewsModal = (news) => {
  formModel.value = { ...news };
  showEditNewsModal.value = true;
};

const closeEditNewsModal = () => {
  showEditNewsModal.value = false;
  formModel.value = {};
};

const addNews = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/news`, formModel.value, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    emit('news-updated');
    closeEditNewsModal();
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'actualité :', error);
  }
};

const updateNews = async () => {
  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/news/${formModel.value.id}`, formModel.value, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    emit('news-updated');
    closeEditNewsModal();
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'actualité :', error);
  }
};

const deleteNews = (newsId) => {
  newsToDeleteId.value = newsId;
  showDeleteConfirmationModal.value = true;
};

const confirmDelete = async () => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/news/${newsToDeleteId.value}`, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    });
    emit('news-updated');
    closeDeleteConfirmationModal();
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'actualité :', error);
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      formModel.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const closeDeleteConfirmationModal = () => {
  showDeleteConfirmationModal.value = false;
  newsToDeleteId.value = null;
};

// Expose openAddModal to parent component
defineExpose({
  openAddModal,
  openEditNewsModal,
  deleteNews
});
</script>

<style scoped>
/* Styles spécifiques au composant si nécessaire */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all 0.5s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}
</style>
