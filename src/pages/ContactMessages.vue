<template>
  <div class="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="px-6 py-8 sm:p-10">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-center text-blue-700 mb-4 tracking-tight">Messages de Contact</h1>
        <p class="text-lg text-center text-gray-600 mb-10">Consultez et gérez les messages envoyés via le formulaire de contact.</p>

        <!-- Message d'erreur global -->
        <div v-if="showErrorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong class="font-bold">Erreur !</strong>
          <span class="block sm:inline"> {{ errorMessage }}</span>
          <span @click="showErrorMessage = false" class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>

        <div v-if="loading" class="text-center py-12 text-blue-500 font-semibold text-xl flex flex-col items-center justify-center">
          <svg class="animate-spin h-8 w-8 text-blue-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Chargement des messages...
        </div>
        <div v-else-if="error" class="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md mb-6" role="alert">
          <p class="font-bold">Erreur !</p>
          <p>Erreur lors du chargement des messages: {{ error }}</p>
        </div>
        <div v-else-if="messages.length === 0" class="text-center py-12 text-gray-600 font-semibold text-xl">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293H11.5a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 class="mt-2 text-2xl font-medium text-gray-900">Aucun message</h3>
          <p class="mt-1 text-base text-gray-500">Il n'y a pas encore de messages de contact à afficher.</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="message in messages" :key="message.id" class="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col space-y-3 transition-shadow duration-200 hover:shadow-lg">
            <div class="flex justify-end items-start">
              <p class="text-xs text-gray-500">{{ formatDate(message.submission_date) }}</p>
            </div>
            <div>
              <p class="text-sm"><span class="font-bold text-blue-600">Nom:</span> <span v-if="message.name">{{ message.name }}</span><span v-else class="text-gray-400 italic">(Non renseigné)</span></p>
              <p class="text-sm"><span class="font-bold text-blue-600">Email:</span> <span v-if="message.email">{{ message.email }}</span><span v-else class="text-gray-400 italic">(Non renseigné)</span></p>
              <p class="text-sm"><span class="font-bold text-blue-600">Sujet:</span> <span v-if="message.subject">{{ message.subject }}</span><span v-else class="text-gray-400 italic">(Non renseigné)</span></p>
            </div>
            <div class="text-sm text-gray-700 cursor-pointer transition-colors duration-200" :class="getRandomHoverColor()" @click="openMessageModal(message.message)">
              <p><span class="font-bold text-blue-600">Message:</span> {{ truncateMessage(message.message) }}</p>
            </div>

            <div class="flex justify-end space-x-2 pt-3 mt-auto border-t border-gray-100">
              <button @click.stop="openMessageModal(message.message)" class="inline-flex items-center space-x-1.5 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-full text-xs transition-colors duration-200 shadow-md cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>
                <span>Voir</span>
              </button>
              <button @click.stop="confirmDeleteMessage(message)" class="inline-flex items-center space-x-1.5 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full text-xs transition-colors duration-200 shadow-md cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg>
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Modal -->
    <MessageModal :show="showModal" :messageContent="selectedMessageContent" @close="showModal = false" />

    <!-- Delete Confirmation Modal -->
    <Transition name="modal">
      <div v-if="showDeleteConfirmationModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 overflow-y-auto p-4">
        <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm modal-container mx-4 max-h-full overflow-y-auto">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Confirmer la suppression</h2>
          <p class="text-gray-600 mb-6">Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible.</p>
          <div class="flex justify-end gap-4">
            <button @click="showDeleteConfirmationModal = false" class="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300">Annuler</button>
            <button @click="deleteMessage" class="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700">Supprimer</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import MessageModal from '../components/MessageModal.vue';
import { store } from '../store'; // Import the store

const messages = ref([]);
const loading = ref(true);
const error = ref(null);
const showModal = ref(false);
const selectedMessageContent = ref('');
const showDeleteConfirmationModal = ref(false);
const messageToDeleteId = ref(null);

const showErrorMessage = ref(false);
const errorMessage = ref('');

const displayErrorMessage = (message) => {
  errorMessage.value = message;
  showErrorMessage.value = true;
  setTimeout(() => {
    showErrorMessage.value = false;
    errorMessage.value = '';
  }, 5000); // Masquer le message après 5 secondes
};

const fetchMessages = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    messages.value = data;
  } catch (err) {
    error.value = err.message;
    console.error("Erreur lors de la récupération des messages:", err);
  } finally {
    loading.value = false;
  }
};

const openMessageModal = (content) => {
  selectedMessageContent.value = content;
  showModal.value = true;
};

const truncateMessage = (text) => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= 3) {
    return text;
  }
  return words.slice(0, 3).join(' ') + '...';
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: fr });
};

const hoverColors = [
  'hover:text-purple-600',
  'hover:text-pink-600',
  'hover:text-indigo-600',
  'hover:text-green-600',
  'hover:text-yellow-600',
  'hover:text-orange-600',
];

const getRandomHoverColor = () => {
  const randomIndex = Math.floor(Math.random() * hoverColors.length);
  return hoverColors[randomIndex];
};

const confirmDeleteMessage = (message) => {
  messageToDeleteId.value = message.id;
  showDeleteConfirmationModal.value = true;
};

const deleteMessage = async () => {
  try {
    const token = store.token; // Retrieve the token from the store
    console.log('Token being sent:', token); // Log the token for inspection
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts/${messageToDeleteId.value}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Add the Authorization header
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    // Remove the deleted message from the local array
    messages.value = messages.value.filter(msg => msg.id !== messageToDeleteId.value);
    showDeleteConfirmationModal.value = false;
    messageToDeleteId.value = null;
  } catch (err) {
    console.error('Erreur lors de la suppression du message:', err);
    displayErrorMessage('Impossible de supprimer le message. Veuillez réessayer.');
    showDeleteConfirmationModal.value = false;
    messageToDeleteId.value = null;
  }
};


onMounted(() => {
  fetchMessages();
});
</script>

<style scoped>
/* Vous pouvez ajouter des styles spécifiques à ce composant ici si nécessaire */
</style>