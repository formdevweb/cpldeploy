<template>
  <div class="bg-gray-100 min-h-screen">
    <section class="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-extrabold mb-4 text-yellow-400 text-shadow-sm">Licenciés du Club</h1>
        <p class="text-xl">Liste des licenciés de la saison en cours</p>
      </div>
    </section>

    <div class="container mx-auto px-4 py-16">

      <!-- Stats -->
      <section class="mb-16">
        <h2 class="text-4xl font-bold text-center text-blue-600 mb-20 border-b-2 border-blue-600 pb-2 text-shadow-sm">
          Statistiques des Licenciés</h2>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12 mb-24">
          <div
            class="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300 hover:bg-blue-200">
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
              </svg>
            </div>
            <div>
              <p class="text-3xl font-bold text-gray-800">{{ totalLicencies }}</p>
              <p class="text-gray-500">Total licenciés</p>
            </div>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300 hover:bg-pink-200">
            <div class="bg-pink-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <p class="text-3xl font-bold text-gray-800">{{ totalFemmes }}</p>
              <p class="text-gray-500">Femmes</p>
            </div>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300 hover:bg-sky-200">
            <div class="bg-sky-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 016-5.197M15 21a6 6 0 00-9-5.197">
                </path>
              </svg>
            </div>
            <div>
              <p class="text-3xl font-bold text-gray-800">{{ totalHommes }}</p>
              <p class="text-gray-500">Hommes</p>
            </div>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300 hover:bg-amber-200">
            <div class="bg-amber-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.25278C12 6.25278 10.8954 5 9.5 5C8.10457 5 7 6.10457 7 7.5C7 8.89543 8.10457 10 9.5 10C10.8954 10 12 8.89543 12 7.5V6.25278Z">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.25278C12 6.25278 13.1046 5 14.5 5C15.8954 5 17 6.10457 17 7.5C17 8.89543 15.8954 10 14.5 10C13.1046 10 12 8.89543 12 7.5V6.25278Z">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10V13"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 13C12 13 10.8954 14.5 9.5 14.5C8.10457 14.5 7 15.6046 7 17C7 18.3954 8.10457 19.5 9.5 19.5C10.8954 19.5 12 18.3954 12 17V13Z">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 13C12 13 13.1046 14.5 14.5 14.5C15.8954 14.5 17 15.6046 17 17C17 18.3954 15.8954 19.5 14.5 19.5C13.1046 19.5 12 18.3954 12 17V13Z">
                </path>
              </svg>
            </div>
            <div>
              <p class="text-3xl font-bold text-gray-800">{{ totalJuniors }}</p>
              <p class="text-gray-500">Juniors</p>
            </div>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300 hover:bg-indigo-200">
            <div class="bg-indigo-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <p class="text-3xl font-bold text-gray-800">{{ totalAdultes }}</p>
              <p class="text-gray-500">Adultes</p>
            </div>
          </div>
        </div>
      </section>

    <!-- Search, filters and add button -->
    <section class="mb-16">
      <h2 class="text-4xl font-bold text-center text-blue-600 mb-12 border-b-2 border-blue-600 pb-2 text-shadow-sm">
        Rechercher et Gérer les Licenciés</h2>
      <div class="bg-white p-4 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row items-center gap-4 flex-wrap">
        <div class="relative flex-grow w-full md:w-auto">
          <input type="text" v-model="searchQuery" placeholder="Rechercher..."
            class="w-full p-3 pl-10 border-2 border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300" />
          <svg class="w-5 h-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <div class="flex items-center gap-2 bg-gray-100 p-1 rounded-xl border-2 transition-colors duration-300"
          :class="filterGenreBorderColor"> <button @click="filterGenre = 'Tous'"
            :class="filterGenre === 'Tous' ? 'bg-white text-blue-600 shadow-lg' : 'text-gray-500 hover:text-blue-500'"
            class="px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer">Tous</button>
          <button @click="filterGenre = 'Femme'"
            :class="filterGenre === 'Femme' ? 'bg-white text-blue-600 shadow-lg' : 'text-gray-500 hover:text-blue-500'"
            class="px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer">Femmes</button>
          <button @click="filterGenre = 'Homme'"
            :class="filterGenre === 'Homme' ? 'bg-white text-blue-600 shadow-lg' : 'text-gray-500 hover:text-blue-500'"
            class="px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer">Hommes</button>
        </div>
        <div class="flex items-center gap-2 bg-gray-100 p-1 rounded-xl border-2 transition-colors duration-300"
          :class="filterAgeBorderColor">
          <button @click="filterAge = 'Tous'"
            :class="filterAge === 'Tous' ? 'bg-white text-blue-600 shadow-lg' : 'text-gray-500 hover:text-blue-500'"
            class="px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer">Tous
            âges</button>
          <button @click="filterAge = 'Junior'"
            :class="filterAge === 'Junior' ? 'bg-white text-blue-600 shadow-lg' : 'text-gray-500 hover:text-blue-500'"
            class="px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer">Juniors</button>
          <button @click="filterAge = 'Adulte'"
            :class="filterAge === 'Adulte' ? 'bg-white text-blue-600 shadow-lg' : 'text-gray-500 hover:text-blue-500'"
            class="px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer">Adultes</button>
        </div>
        <button v-if="store.isAdmin" @click="openAddModal"
          class="shrink-0 w-full lg:w-auto bg-blue-600 text-white py-3 px-5 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer">
          Ajouter
        </button>
      </div>
    </section>

    <!-- Members list -->
    <!-- Members list -->
    <section class="mb-16">

      <TransitionGroup tag="div" name="list"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div v-for="licencie in filteredLicencies" :key="licencie.id || licencie.licence"
          @click="store.isAdmin && !isMobile ? selectMember(licencie) : null"
          class="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 text-center flex flex-col items-center border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform scale-105 overflow-hidden"
          :class="{ 'cursor-pointer': store.isAdmin && !isMobile }">
          <div class="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
            <span class="text-xl">{{ licencie.gender === 'Homme' ? '♂️' : '♀️' }}</span>
          </div>
          <div class="relative mb-5">
            <img v-if="licencie.photo" :src="licencie.photo" class="w-28 h-28 rounded-full object-cover ring-4 ring-blue-300 ring-offset-2">
            <div v-else class="w-28 h-28 rounded-full flex items-center justify-center text-white font-bold text-3xl ring-4 ring-blue-300 ring-offset-2"
              :class="getRankColor(licencie.rank)">
              {{ licencie.rank }}
            </div>
          </div>
          <h3 class="text-2xl font-extrabold text-blue-800 mb-1">{{ licencie.name }}</h3>
          <p class="text-sm font-semibold text-gray-700 bg-blue-100 px-3 py-1 rounded-full mb-2">{{ licencie.category }}</p>
          <p class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{{ licencie.licence }}</p>
        </div>
      </TransitionGroup>
    </section>
  </div>
  <!-- End main container div -->

  <!-- Add/Edit Member Modal -->
  <Transition name="modal">
    <div v-if="showAddMemberModal || showEditMemberModal"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md modal-container mx-4 max-h-full overflow-y-auto"
        :class="showAddMemberModal || showEditMemberModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'">
        <h2 class="text-3xl font-bold mb-6 text-gray-800">{{ showEditMemberModal ? 'Modifier le licencié' : 'Ajouter un licencié' }}</h2>
        <form @submit.prevent="showEditMemberModal ? updateMember() : addMember()">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="mb-4 md:col-span-2">
              <label for="name" class="block text-gray-700 font-semibold mb-2">Nom</label>
              <input type="text" v-model="formModel.name" id="name"
                class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300"
                required>
            </div>
            <div class="mb-4">
              <label for="category" class="block text-gray-700 font-semibold mb-2">Catégorie</label>
              <input type="text" v-model="formModel.category" id="category"
                class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300"
                required>
            </div>
            <div class="mb-4">
              <label for="rank" class="block text-gray-700 font-semibold mb-2">Classement</label>
              <input type="number" v-model="formModel.rank" id="rank"
                class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300"
                required>
            </div>
            <div class="mb-4">
              <label for="licence" class="block text-gray-700 font-semibold mb-2">Licence</label>
              <input type="text" v-model="formModel.licence" id="licence"
                class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300"
                required>
            </div>
            <div class="mb-4">
              <label for="gender" class="block text-gray-700 font-semibold mb-2">Genre</label>
              <select v-model="formModel.gender" id="gender"
                class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300"
                required>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div class="mb-4 md:col-span-2">
              <label for="age_category" class="block text-gray-700 font-semibold mb-2">Catégorie d'âge</label>
              <select v-model="formModel.age_category" id="age_category"
                class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300"
                required>
                <option value="Adulte">Adulte</option>
                <option value="Junior">Junior</option>
              </select>
            </div>
            <div class="mb-4 md:col-span-2">
              <label for="photo" class="block text-gray-700 font-semibold mb-2">Photo</label>
              <input type="file" @change="onFileChange" id="photo"
                class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors duration-300">
              <img v-if="formModel.photo" :src="formModel.photo" class="mt-4 w-32 h-32 object-cover rounded-lg">
            </div>
          </div>
          <div class="flex flex-col sm:flex-row mt-6 gap-4"
            :class="showEditMemberModal ? 'justify-between' : 'justify-end'">
            <button v-if="showEditMemberModal && store.isAdmin" type="button" @click="deleteMember"
              class="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md w-full sm:w-auto hidden sm:block cursor-pointer">Supprimer</button>
            <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button type="button" @click="closeModal"
                class="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300 w-full sm:w-auto cursor-pointer">Annuler</button>
              <button v-if="store.isAdmin" type="submit"
                class="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md w-full sm:w-auto hidden sm:block cursor-pointer">{{
                  showEditMemberModal ? 'Modifier' : 'Ajouter' }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Transition>

  <!-- Delete Confirmation Modal -->
  <Transition name="modal">
    <div v-if="showDeleteConfirmationModal"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm modal-container mx-4 max-h-full overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Confirmer la suppression</h2>
        <p class="text-gray-600 mb-6">Êtes-vous sûr de vouloir supprimer ce licencié ? Cette action est irréversible.
        </p>
        <div class="flex justify-end gap-4">
          <button @click="showDeleteConfirmationModal = false"
            class="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300">Annuler</button>
          <button @click="confirmDelete"
            class="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700">Supprimer</button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- End main container div -->
</div>
</template>

<script setup>

import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { store } from '../store'
const isMobile = ref(window.innerWidth < 640) // Assuming sm breakpoint is 640px

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})

const searchQuery = ref('')
const filterGenre = ref('Tous')
const filterAge = ref('Tous')
const showAddMemberModal = ref(false)
const showEditMemberModal = ref(false)
const showDeleteConfirmationModal = ref(false)
const formModel = ref({})
const licencies = ref([]) // Initialize as empty array

const openAddModal = () => {
  formModel.value = {
    rank: 0, // Initialize rank to 0 instead of null
    name: '',
    category: '',
    licence: '',
    gender: 'Homme',
    age_category: 'Adulte',
    photo: null
  }
  showAddMemberModal.value = true
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      formModel.value.photo = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    formModel.value.photo = null; // Explicitly set to null if no file is selected
  }
}

const selectMember = (member) => {
  if (!store.isAdmin) return
  formModel.value = { ...member }
  showEditMemberModal.value = true
}

const closeModal = () => {
  showAddMemberModal.value = false
  showEditMemberModal.value = false
  showDeleteConfirmationModal.value = false
  fetchLicencies() // Refresh the list after closing modal
}

const fetchLicencies = async () => {
  try {
    const params = new URLSearchParams();
    if (searchQuery.value) {
      params.append('searchQuery', searchQuery.value);
    }
    if (filterGenre.value !== 'Tous') {
      params.append('filterGenre', filterGenre.value);
    }
    if (filterAge.value !== 'Tous') {
      params.append('filterAge', filterAge.value);
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/licencies?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    licencies.value = data;
  } catch (error) {
    console.error("Erreur lors de la récupération des licenciés:", error);
  }
};

const addMember = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/licencies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formModel.value),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    closeModal();
  } catch (error) {
    console.error("Erreur lors de l'ajout du licencié:", error);
  }
};

const updateMember = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/licencies/${formModel.value.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formModel.value),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    closeModal();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du licencié:", error);
  }
};

const deleteMember = () => {
  showDeleteConfirmationModal.value = true
}

const confirmDelete = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/licencies/${formModel.value.id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    closeModal();
  } catch (error) {
    console.error("Erreur lors de la suppression du licencié:", error);
  }
};

onMounted(() => {
  window.addEventListener('resize', updateIsMobile);
  fetchLicencies(); // Fetch licencies when component is mounted
});

watch([searchQuery, filterGenre, filterAge], fetchLicencies);

const totalLicencies = computed(() => licencies.value.length)
const totalFemmes = computed(() => licencies.value.filter(l => l.gender === 'Femme').length)
const totalHommes = computed(() => licencies.value.filter(l => l.gender === 'Homme').length)
const totalJuniors = computed(() => licencies.value.filter(l => l.age_category === 'Junior').length)
const totalAdultes = computed(() => licencies.value.filter(l => l.age_category === 'Adulte').length)

const filterGenreBorderColor = computed(() => {
  return filterGenre.value !== 'Tous' ? 'border-blue-500' : 'border-gray-200';
});

const filterAgeBorderColor = computed(() => {
  return filterAge.value !== 'Tous' ? 'border-blue-500' : 'border-gray-200';
});

const filteredLicencies = computed(() => {
  // The filtering is now done on the backend, so this computed property just returns the fetched licencies
  return licencies.value;
})

const getRankColor = (rank) => {
  if (rank >= 10) return 'bg-green-500'
  if (rank >= 8) return 'bg-yellow-500'
  if (rank >= 6) return 'bg-orange-500'
  return 'bg-red-500'
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.8s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all 0.8s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 1.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>