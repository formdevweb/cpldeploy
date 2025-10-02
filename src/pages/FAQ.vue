<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Header -->
    <section class="bg-[#36455B] text-white py-32">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-extrabold mb-4 text-yellow-400 text-shadow-sm">Questions Fréquentes</h1>
        <p class="text-3xl text-white text-shadow-sm">Trouvez rapidement les réponses aux questions les plus courantes sur notre club.</p>
      </div>
    </section>

    <div class="container mx-auto px-4 py-16">
      <!-- Search and Stats -->
      <div class="mb-12 bg-white p-8 rounded-2xl shadow-lg">
        <div class="relative mb-8 max-w-2xl mx-auto">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher une question..."
            class="w-full p-4 pl-12 pr-10 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-md transition-all duration-300 text-black"
          />
          <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button @click="searchQuery = ''" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="bg-blue-50 p-6 rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div class="flex justify-center items-center mb-4">
                <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <p class="text-4xl font-bold text-blue-600">{{ faqItems.length }}</p>
            <p class="text-gray-500">Questions répondues</p>
          </div>
          <div class="bg-green-50 p-6 rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div class="flex justify-center items-center mb-4">
                <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <p class="text-4xl font-bold text-green-600">2</p>
            <p class="text-gray-500">Essais gratuits</p>
          </div>
          <div class="bg-purple-50 p-6 rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div class="flex justify-center items-center mb-4">
                <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <p class="text-4xl font-bold text-purple-600">45€</p>
            <p class="text-gray-500">À partir de</p>
          </div>
        </div>
      </div>

      <!-- Filters and FAQ list -->
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-wrap justify-center gap-4 mb-8">
          <button @click="activeFilter = 'Toutes'" :class="activeFilter === 'Toutes' ? 'bg-gray-800 text-white shadow-lg ring-2 ring-gray-400' : 'bg-white text-gray-700'" class="px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-300 cursor-pointer">Toutes</button>
          <button v-for="category in categories" :key="category" @click="activeFilter = category" :class="activeFilter === category ? `${categoryColors[category]?.bg} text-white shadow-lg ring-2 ${categoryColors[category]?.ring}` : 'bg-white text-gray-700'" class="px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-300 cursor-pointer">{{ category }}</button>
        </div>

        <div class="text-center mb-8" v-if="store.isAdmin">
            <button @click="openAddModal" class="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md">Ajouter une question</button>
        </div>

        <TransitionGroup v-if="filteredFaqItems.length > 0" tag="div" class="space-y-4" name="fade">
          <div v-for="item in filteredFaqItems" :key="item.id" class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300" :class="[openAccordion === item.id ? categoryColors[item.category]?.border : 'border-transparent', 'border-l-4']">
            <button @click="toggleAccordion(item.id)" class="w-full flex justify-between items-center p-6 text-left cursor-pointer" :class="openAccordion === item.id ? categoryColors[item.category]?.bg_light : ''">
              <span class="font-semibold text-lg" :class="openAccordion === item.id ? categoryColors[item.category]?.text : 'text-gray-800'">{{ item.question }}</span>
              <div class="flex items-center gap-4">
                <button v-if="store.isAdmin" @click.stop="selectItem(item)" class="text-blue-500 hover:text-blue-700">Modifier</button>
                <svg v-if="openAccordion !== item.id" class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                <svg v-else class="w-6 h-6" :class="categoryColors[item.category]?.text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"></path></svg>
              </div>
            </button>
            <div v-show="openAccordion === item.id" class="px-6 pb-6" :class="openAccordion === item.id ? categoryColors[item.category]?.bg_light : ''">
              <p class="text-gray-600" v-html="item.answer"></p>
            </div>
          </div>
        </TransitionGroup>
        <div v-else class="text-center py-16">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 01.553-.894L9 4l6 2.724a1 1 0 01.447.894v8.764a1 1 0 01-.553.894L9 20z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-3"></path></svg>
            <h3 class="mt-2 text-lg font-medium text-gray-900">Aucune question trouvée</h3>
            <p class="mt-1 text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
        </div>
      </div>

      <!-- Contact Box -->
      <div class="max-w-4xl mx-auto mt-16 bg-blue-600 text-white rounded-xl shadow-2xl p-8 text-center">
        <div class="flex justify-center items-center mb-4">
            <svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
        </div>
        <h2 class="text-3xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
        <p class="mb-6">Notre équipe est là pour vous aider ! Contactez-nous directement.</p>
        <div class="flex flex-col md:flex-row justify-center items-center gap-4">
          <RouterLink :to="{ name: 'contact' }" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors duration-300">Nous contacter</RouterLink>
          <a href="tel:0680051241" class="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors duration-300">06 80 05 12 41</a>
        </div>
      </div>

    </div>

    <!-- Add/Edit FAQ Modal -->
    <Transition name="modal">
        <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md modal-container">
                <h2 class="text-3xl font-bold mb-6 text-gray-800">{{ showEditModal ? 'Modifier la question' : 'Ajouter une question' }}</h2>
                <form @submit.prevent="showEditModal ? updateFaqItem() : addFaqItem()">
                    <div class="mb-4">
                        <label for="question" class="block text-gray-700 font-semibold mb-2">Question</label>
                        <input type="text" v-model="formModel.question" id="question" class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300" required>
                    </div>
                    <div class="mb-4">
                        <label for="answer" class="block text-gray-700 font-semibold mb-2">Réponse</label>
                        <textarea v-model="formModel.answer" id="answer" rows="4" class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="category" class="block text-gray-700 font-semibold mb-2">Catégorie</label>
                        <input type="text" v-model="formModel.category" id="category" class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300" required>
                    </div>
                    <div class="flex mt-6" :class="showEditModal ? 'justify-between' : 'justify-end'">
                        <button v-if="showEditModal" type="button" @click="deleteFaqItem" class="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md">Supprimer</button>
                        <div class="flex gap-4">
                            <button type="button" @click="closeModal" class="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300">Annuler</button>
                            <button type="submit" class="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md">{{ showEditModal ? 'Modifier' : 'Ajouter' }}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Transition>

    <!-- Delete Confirmation Modal -->
    <Transition name="modal">
        <div v-if="showDeleteConfirmationModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm modal-container">
                <h2 class="text-2xl font-bold mb-4 text-gray-800">Confirmer la suppression</h2>
                <p class="text-gray-600 mb-6">Êtes-vous sûr de vouloir supprimer cette question ?</p>
                <div class="flex justify-end gap-4">
                    <button @click="showDeleteConfirmationModal = false" class="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300">Annuler</button>
                    <button @click="confirmDelete" class="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700">Supprimer</button>
                </div>
            </div>
        </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { store } from '../store';

const searchQuery = ref('');
const activeFilter = ref('Toutes');
const openAccordion = ref(null);
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteConfirmationModal = ref(false);
const formModel = ref({});

const categoryColors = {
  'Inscription & Adhésion': {
    bg: 'bg-blue-600',
    border: 'border-blue-500',
    ring: 'ring-blue-300',
    text: 'text-blue-600',
    bg_light: 'bg-blue-50',
  },
  'Tarifs & Licences': {
    bg: 'bg-green-600',
    border: 'border-green-500',
    ring: 'ring-green-300',
    text: 'text-green-600',
    bg_light: 'bg-green-50',
  },
  'Horaires & Planning': {
    bg: 'bg-yellow-500',
    border: 'border-yellow-400',
    ring: 'ring-yellow-200',
    text: 'text-yellow-500',
    bg_light: 'bg-yellow-50',
  },
  'Pratique & Matériel': {
    bg: 'bg-purple-600',
    border: 'border-purple-500',
    ring: 'ring-purple-300',
    text: 'text-purple-600',
    bg_light: 'bg-purple-50',
  },
  'Le Club': {
    bg: 'bg-pink-600',
    border: 'border-pink-500',
    ring: 'ring-pink-300',
    text: 'text-pink-600',
    bg_light: 'bg-pink-50',
  },
};

const faqItems = ref([
  { id: 1, question: 'Comment puis-je m\'inscrire au club ?', answer: 'Pour vous inscrire, il vous suffit de vous présenter lors des créneaux d\'entraînements avec les documents nécessaires.', category: 'Inscription & Adhésion' },
  { id: 2, question: 'Puis-je changer de licence en cours d\'année ?', answer: 'Oui, il est possible de changer de type de licence en cours d\'année, sous certaines conditions. Veuillez contacter un membre du bureau pour plus d\'informations.', category: 'Tarifs & Licences' },
  { id: 3, question: 'Quand puis-je m\'inscrire ?', answer: 'Les inscriptions sont ouvertes toute l\'année. Vous pouvez nous rejoindre à tout moment.', category: 'Inscription & Adhésion' },
  { id: 4, question: 'Quels documents faut-il pour s\'inscrire ?', answer: 'Il vous faudra remplir la fiche d\'inscription, fournir un certificat médical de non-contre-indication à la pratique du tennis de table en compétition et régler la cotisation.', category: 'Inscription & Adhésion' },
  { id: 5, question: 'Combien coûte une licence et que comprend-elle ?', answer: 'Nous proposons deux types de licences : Loisir (45€) et Compétition (80€). Le détail de ce qu\'elles incluent se trouve sur notre page Horaires & Tarifs.', category: 'Tarifs & Licences' },
  { id: 6, question: 'Y a-t-il des aides financières ?', answer: 'Oui, nous acceptons le Pass\'Sport et le Pass\'Sport Agglo CAHC. Des réductions sont également disponibles pour les familles.', category: 'Tarifs & Licences' },
  { id: 7, question: 'Quels sont les horaires d\'entraînement ?', answer: 'Vous pouvez consulter tous nos créneaux d\'entraînement sur la page Horaires & Tarifs.', category: 'Horaires & Planning' },
  { id: 8, question: 'Y a-t-il des séances d\'essai ?', answer: 'Oui, nous proposons jusqu\'à deux séances d\'essai gratuites pour vous permettre de découvrir le club et l\'activité.', category: 'Pratique & Matériel' },
  { id: 9, question: 'Faut-il apporter son propre matériel ?', answer: 'Pour les débutants, le club peut prêter du matériel (raquettes). Pour une pratique régulière, il est conseillé d\'avoir sa propre raquette.', category: 'Pratique & Matériel' },
  { id: 10, question: 'Le club organise-t-il des compétitions ?', answer: 'Oui, le club est engagé dans les compétitions départementales et régionales, pour les jeunes et les adultes.', category: 'Le Club' },
  { id: 11, question: 'Où se trouve la salle et comment s\'y rendre ?', answer: 'Notre salle se trouve au Complexe Sportif Léo Lagrange, 32 Rue André Pantigny, 62820 Libercourt. Un plan d\'accès est disponible sur la page Le Club.', category: 'Le Club' },
  { id: 12, question: 'Combien de licenciés compte le club ?', answer: 'Le club compte actuellement 78 licenciés, répartis dans différentes catégories d\'âge et de niveau.', category: 'Le Club' },
]);

const categories = computed(() => {
  const allCategories = faqItems.value.map(item => item.category);
  return [...new Set(allCategories)];
});

const filteredFaqItems = computed(() => {
  let items = faqItems.value;

  if (searchQuery.value) {
    items = items.filter(item => item.question.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }

  if (activeFilter.value !== 'Toutes') {
    items = items.filter(item => item.category === activeFilter.value);
  }

  return items;
});

const toggleAccordion = (id) => {
  if (openAccordion.value === id) {
    openAccordion.value = null;
  } else {
    openAccordion.value = id;
  }
};

const openAddModal = () => {
  formModel.value = {
    question: '',
    answer: '',
    category: ''
  };
  showAddModal.value = true;
};

const selectItem = (item) => {
  formModel.value = { ...item };
  showEditModal.value = true;
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
};

const addFaqItem = () => {
  faqItems.value.push({ ...formModel.value, id: Date.now() });
  closeModal();
};

const updateFaqItem = () => {
  const index = faqItems.value.findIndex(item => item.id === formModel.value.id);
  if (index !== -1) {
    faqItems.value[index] = { ...formModel.value };
  }
  closeModal();
};

const deleteFaqItem = () => {
  showDeleteConfirmationModal.value = true;
};

const confirmDelete = () => {
  const index = faqItems.value.findIndex(item => item.id === formModel.value.id);
  if (index !== -1) {
    faqItems.value.splice(index, 1);
  }
  showDeleteConfirmationModal.value = false;
  closeModal();
};

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-move {
  transition: transform 0.8s ease-in-out;
}

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
