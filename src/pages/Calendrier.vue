<template>
  <div class="bg-gray-100 min-h-screen">
    <section class="bg-[#36455B] text-white py-32">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 lg:mb-4 tracking-tight text-yellow-400 text-shadow-sm">Calendrier des événements</h2>
        <p class="text-xl font-medium text-white text-shadow-sm">Ne manquez aucun événement du Club Pongiste Libercourtois !</p>
      </div>
    </section>

    <div class="container mx-auto px-4 py-8">

      <!-- Stats -->
      <section class="mb-8">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Statistiques des Événements</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Total Events Card (Clickable) -->
          <div @click="filterStatus = 'all'" class="bg-white p-5 rounded-2xl shadow-lg border-t-4 border-[#F1C40F] cursor-pointer transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl">
            <div class="flex items-center space-x-3">
              <div class="bg-gray-100 p-3 rounded-full">
                <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <p class="text-3xl font-bold text-gray-800">{{ events.length }}</p>
                <p class="text-gray-500 font-medium">Total événements</p>
              </div>
            </div>
          </div>

          <!-- Open Events Card (Clickable) -->
          <div @click="filterStatus = 'open'" class="bg-white p-5 rounded-2xl shadow-lg border-t-4 border-[#2ECC71] cursor-pointer transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl">
            <div class="flex items-center space-x-3">
              <div class="bg-green-100 p-3 rounded-full">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6-6H9a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2z"></path></svg>
              </div>
              <div>
                <p class="text-3xl font-bold text-green-600">{{ openEventsCount }}</p>
                <p class="text-gray-500 font-medium">Inscriptions ouvertes</p>
              </div>
            </div>
          </div>

          <!-- Closed Events Card (Clickable) -->
          <div @click="filterStatus = 'closed'" class="bg-white p-5 rounded-2xl shadow-lg border-t-4 border-[#E74C3C] cursor-pointer transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl">
            <div class="flex items-center space-x-3">
              <div class="bg-red-100 p-3 rounded-full">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
              </div>
              <div>
                <p class="text-3xl font-bold text-[#E74C3C]">{{ closedEventsCount }}</p>
                <p class="text-gray-500 font-medium">Inscriptions fermées</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Search and filters -->
      <section class="mb-8">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Rechercher et Filtrer les Événements</h2>
        <div class="bg-white p-3 rounded-2xl shadow-lg mb-8 flex flex-col lg:flex-row items-center lg:space-x-3 space-y-3 lg:space-y-0">
          
          <!-- Search Input -->
          <div class="relative flex-grow w-full">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher par titre ou description..."
              class="w-full p-2 pl-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 text-black"
            />
            <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button @click="searchQuery = ''" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          </div>

          <!-- Filter Buttons -->
          <div class="flex items-center shrink-0 bg-gray-100 p-1 rounded-xl border-2 transition-colors duration-300" :class="filterBorderColor">
            <button @click="filterStatus = 'all'" :class="filterStatus === 'all' ? 'bg-white text-blue-600 shadow-lg' : 'text-gray-500 hover:text-blue-500'" class="px-3 py-1 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              Tous
            </button>
            <button @click="filterStatus = 'open'" :class="filterStatus === 'open' ? 'bg-white text-green-600 shadow-lg' : 'text-gray-500 hover:text-green-500'" class="px-3 py-1 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6-6H9a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2z"></path></svg>
              Ouvert
            </button>
            <button @click="filterStatus = 'closed'" :class="filterStatus === 'closed' ? 'bg-white text-red-600 shadow-lg' : 'text-gray-500 hover:text-red-500'" class="px-3 py-1 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
              Fermé
            </button>
          </div>

          <!-- Add Event Button -->
          <button v-if="store.isAdmin" @click="openAddModal" class="shrink-0 w-full lg:w-auto bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Ajouter
          </button>
        </div>
      </section>

      <!-- Events timeline -->
      <section class="mb-8">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Prochains Événements</h2>
        <div v-if="filteredEvents.length > 0" class="container mx-auto px-6">
          <div v-for="(group, month) in filteredEventsByMonth" :key="month" class="mb-6">
            <!-- Month Separator -->
            <div class="text-center my-6">
              <span class="inline-block bg-white px-5 py-1 rounded-full shadow-md font-semibold text-blue-800 border border-gray-200">{{ month }}</span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <div v-for="event in group" :key="event.id"
                @click="store.isAdmin ? selectEvent(event) : null"
                class="bg-white rounded-2xl shadow-xl border border-gray-200 w-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-l-4 flex flex-row relative"
                :class="[event.status === 'open' ? 'border-green-500' : 'border-red-500', { 'cursor-pointer': store.isAdmin, 'opacity-60 grayscale': isPastEvent(event) }]">

                <span v-if="isNextEvent(event)" class="absolute top-0 right-0 mt-2 mr-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full z-10">Prochainement</span>

                <!-- Date Section -->
                <div class="flex flex-col items-center justify-center p-4 text-white rounded-l-2xl" :class="event.status === 'open' ? 'bg-green-500' : 'bg-red-500'">
                    <span class="text-4xl font-bold">{{ formatDay(event.date) }}</span>
                    <span class="text-base font-semibold uppercase">{{ formatMonth(event.date) }}</span>
                </div>

                <div class="p-4 flex flex-col flex-grow">
                    <!-- Card Header -->
                    <div class="flex justify-between items-start mb-2">
                        <p class="text-xl sm:text-2xl font-bold text-gray-800 leading-tight line-clamp-2">{{ event.title }}</p>
                        <span class="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full" :class="event.status === 'open' ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'">
                            {{ event.status === 'open' ? 'Ouvert' : 'Fermé' }}
                        </span>
                    </div>

                    <!-- Card Body -->
                    <div class="space-y-3 text-gray-600 flex-grow">
                        <p class="text-sm line-clamp-3">{{ event.description }}</p>
                    </div>

                    <!-- Card Footer -->
                    <div class="flex items-center justify-between text-sm pt-2 mt-auto">
                        <p class="flex items-center gap-2">
                            <svg class="w-5 h-5" :class="event.status === 'open' ? 'text-green-500' : 'text-red-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            {{ event.location }}
                        </p>
                        <p class="flex items-center gap-2">
                            <svg class="w-5 h-5" :class="event.status === 'open' ? 'text-green-500' : 'text-red-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            {{ event.participants }} participants
                        </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-10">
          <svg class="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun événement</h3>
          <p class="mt-1 text-sm text-gray-500">Aucun événement ne correspond à votre recherche ou à vos filtres.</p>
        </div>
      </section>

    </div>

    <EventModal
      :show="showAddEventModal || showEditEventModal"
      :is-edit="showEditEventModal"
      :event-data="formModel"
      @close="closeModal"
      @save="handleSave"
      @delete="deleteEvent"
    />

    <!-- Delete Confirmation Modal -->
    <Transition name="modal">
        <div v-if="showDeleteConfirmationModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 overflow-y-auto p-4">
            <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm modal-container mx-4 max-h-full overflow-y-auto">
                <h2 class="text-2xl font-bold mb-4 text-gray-800">Confirmer la suppression</h2>
                <p class="text-gray-600 mb-6">Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.</p>
                <div class="flex justify-end gap-4">
                    <button @click="showDeleteConfirmationModal = false" class="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 cursor-pointer" style="cursor: pointer;">Annuler</button>
                    <button @click="confirmDelete" class="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 cursor-pointer">Supprimer</button>
                </div>
            </div>
        </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { store } from '../store'
import EventModal from '../components/EventModal.vue'
import { format, compareAsc, isValid } from 'date-fns'
import { fr } from 'date-fns/locale'

const LOCAL_STORAGE_KEY = 'calendarEvents'

const isMobile = ref(window.innerWidth < 640)

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  window.addEventListener('resize', updateIsMobile)
  fetchEvents()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})

const searchQuery = ref('')
const filterStatus = ref('all')
const showAddEventModal = ref(false)
const showEditEventModal = ref(false)
const showDeleteConfirmationModal = ref(false)
const formModel = ref({});

const defaultEvents = [];

const events = ref([]);

const formatDate = (date) => {
  if (!date || !isValid(new Date(date))) return 'Date invalide';
  return format(new Date(date), 'EEEE d MMMM yyyy', { locale: fr });
}

const formatDay = (date) => {
  if (!date || !isValid(new Date(date))) return '';
  return format(new Date(date), 'd', { locale: fr });
}

const formatMonth = (date) => {
  if (!date || !isValid(new Date(date))) return '';
  return format(new Date(date), 'MMM', { locale: fr });
}

const isPastEvent = (event) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(event.date) < today;
}

const isNextEvent = (event) => {
  if (filteredEvents.value.length === 0 || isPastEvent(event)) {
    return false;
  }
  const firstFutureEvent = filteredEvents.value.find(e => !isPastEvent(e));
  return firstFutureEvent && firstFutureEvent.id === event.id;
}

const sortedEvents = computed(() => {
  return [...events.value].sort((a, b) => compareAsc(new Date(a.date), new Date(b.date))); // Tri croissant pour les plus proches en premier
});

const fetchEvents = async () => {
  try {
    const params = new URLSearchParams();
    if (searchQuery.value) {
      params.append('searchQuery', searchQuery.value);
    }
    if (filterStatus.value !== 'all') {
      params.append('filterStatus', filterStatus.value);
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    events.value = data.map(event => ({
      ...event,
      date: new Date(event.date), // Convert date string to Date object
      showFullDescription: false // Initialize showFullDescription for each event
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des événements:", error);
  }
};

const toggleDescription = (event) => {
  event.showFullDescription = !event.showFullDescription;
};
watch([searchQuery, filterStatus], fetchEvents);

const openAddModal = () => {
  formModel.value = {
    title: '',
    date: new Date(),
    description: '',
    location: '',
    status: 'open',
    participants: 0
  };
  showAddEventModal.value = true;
};

const selectEvent = (event) => {
  if (!store.isAdmin) {
    return;
  }
  formModel.value = { ...event, date: new Date(event.date) }; // Ensure date is a Date object for editing
  showEditEventModal.value = true;
};

const closeModal = () => {
  showAddEventModal.value = false;
  showEditEventModal.value = false;
  showDeleteConfirmationModal.value = false;
  fetchEvents(); // Refresh the list after closing modal
};

const handleSave = (eventData) => {
  if (showEditEventModal.value) {
    updateEvent(eventData);
  } else {
    addEvent(eventData);
  }
};

const addEvent = async (eventData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.token}`,
      },
      body: JSON.stringify({ ...eventData, date: eventData.date.toISOString() }), // Convert Date object to ISO string
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    closeModal();
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'événement:", error);
  }
};

const updateEvent = async (eventData) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${eventData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.token}`,
      },
      body: JSON.stringify({ ...eventData, date: eventData.date.toISOString() }), // Convert Date object to ISO string
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    closeModal();
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'événement:", error);
  }
};

const deleteEvent = () => {
  showDeleteConfirmationModal.value = true
}

const confirmDelete = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${formModel.value.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${store.token}`,
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    closeModal();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'événement:", error);
  }
};


const openEventsCount = computed(() => events.value.filter(e => e.status === 'open').length)
const closedEventsCount = computed(() => events.value.filter(e => e.status === 'closed').length)

const filteredEvents = computed(() => {
  return sortedEvents.value.filter(event => {
    const search = searchQuery.value.toLowerCase()
    const titleMatch = event.title.toLowerCase().includes(search)
    const descriptionMatch = event.description.toLowerCase().includes(search)

    const statusMatch = filterStatus.value === 'all' || event.status === filterStatus.value

    return (titleMatch || descriptionMatch) && statusMatch
  })
})

const filteredEventsByMonth = computed(() => {
  return filteredEvents.value.reduce((acc, event) => {
    if (event.date && isValid(new Date(event.date))) {
      const month = format(new Date(event.date), 'MMMM yyyy', { locale: fr });
      if (!acc[month]) {
        acc[month] = []
      }
      acc[month].push(event)
    }
    return acc
  }, {})
})

const filterBorderColor = computed(() => {
  if (filterStatus.value === 'open') return 'border-green-500';
  if (filterStatus.value === 'closed') return 'border-red-500';
  return 'border-blue-500';
});

onMounted(() => {
  window.addEventListener('resize', updateIsMobile);
  fetchEvents(); // Fetch events when component is mounted
});
</script>