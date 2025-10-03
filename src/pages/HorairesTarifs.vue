<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Header -->
    <section class="bg-[#36455B] text-white py-32">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-extrabold mb-6 text-yellow-400 text-shadow-sm">Horaires et Tarifs</h1>
        <p class="text-2xl text-white text-shadow-sm">Découvrez nos créneaux d'entraînement et nos tarifs adaptés à tous les âges et tous les niveaux.</p>
      </div>
    </section>

    <div class="container mx-auto px-4 py-16">
      <!-- Horaires d'Entraînement -->
      <section class="mb-24 pt-16">
        <h2 class="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-12 border-b-2 border-blue-600 pb-2 text-shadow-sm">Horaires d'Entraînement</h2>
        <div class="flex justify-center gap-4 mb-8">
          <button @click="activityFilter = 'all'" :class="activityFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'" class="px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 cursor-pointer">Tous</button>
          <button @click="activityFilter = 'Libre'" :class="activityFilter === 'Libre' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'" class="px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 cursor-pointer">Jeu Libre</button>
          <button @click="activityFilter = 'Compétition'" :class="activityFilter === 'Compétition' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'" class="px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 cursor-pointer">Compétition</button>
          <button @click="activityFilter = 'Loisir'" :class="activityFilter === 'Loisir' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'" class="px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 cursor-pointer">Loisir</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="day in filteredSchedule" :key="day.name" class="rounded-xl shadow-lg overflow-hidden transition-all duration-300" :class="{ 'border-4 border-blue-500 bg-red-200': day.name === capitalizedCurrentDay, 'bg-white': day.name !== capitalizedCurrentDay }">
            <div class="bg-gray-800 text-white p-4 font-bold text-lg">{{ day.name }}</div>
            <div class="p-6 space-y-4">
              <div v-for="slot in day.slots" :key="slot.time" class="flex justify-between items-center">
                <div>
                  <p class="font-semibold text-gray-700">{{ slot.time }}</p>
                  <p class="text-gray-500">{{ slot.activity }}</p>
                </div>
                <span class="px-3 py-1 text-sm font-semibold rounded-full" :class="slot.tagClass">{{ slot.tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Compétitions -->
      <section class="mb-24 pt-16">
        <h2 class="text-5xl font-bold text-center text-blue-600 mb-12 border-b-2 border-blue-600 pb-2 text-shadow-sm">Compétitions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div v-for="comp in competitions" :key="comp.day" class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="font-bold text-lg text-gray-800 mb-2">{{ comp.day }}</h3>
            <p class="text-gray-600">{{ comp.description }}</p>
          </div>
        </div>
      </section>

      <section class="mb-24 pt-16">
        <h2 class="text-5xl font-bold text-center text-blue-600 mb-12 border-b-2 border-blue-600 pb-2 text-shadow-sm">Nos Tarifs</h2>
        <div class="flex flex-col md:flex-row justify-center gap-8 items-center">

          <!-- Licence Loisir -->
          <div class="bg-white rounded-xl shadow-lg p-8 w-full md:w-1/3 lg:w-1/4 transform hover:scale-105 transition-transform duration-300">
            <h3 class="text-2xl font-bold text-gray-800 text-center mb-4">Licence Loisir</h3>
            <p class="text-5xl font-extrabold text-center text-gray-900 mb-4">45<span class="text-3xl font-medium">€</span></p>
            <ul class="space-y-3 text-gray-600 mb-6">
              <li class="flex items-center"><svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Entraînements dirigés (1h30)</li>
              <li class="flex items-center"><svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Accès aux séances de jeu libre</li>
              <li class="flex items-center"><svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Assurance FFTT comprise</li>
            </ul>
            <button class="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300">Choisir cette licence</button>
          </div>

          <!-- Licence Compétition -->
          <div class="bg-blue-600 text-white rounded-xl shadow-2xl p-8 w-full md:w-1/3 lg:w-1/4 transform hover:scale-105 transition-transform duration-300 relative">
            <div class="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">Le plus populaire</div>
            <h3 class="text-2xl font-bold text-center mb-4">Licence Compétition</h3>
            <p class="text-5xl font-extrabold text-center mb-4">80<span class="text-3xl font-medium">€</span></p>
            <ul class="space-y-3 text-blue-100 mb-6">
              <li class="flex items-center"><svg class="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Tout inclus dans la licence loisir</li>
              <li class="flex items-center"><svg class="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Entraînements de groupe</li>
              <li class="flex items-center"><svg class="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Participation aux compétitions</li>
              <li class="flex items-center"><svg class="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Licence FFTT comprise</li>
            </ul>
            <button class="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors duration-300">Choisir cette licence</button>
          </div>

        </div>
      </section>

      <!-- Services Additionnels -->
      <section class="mb-24 pt-16">
        <h2 class="text-5xl font-bold text-center text-blue-600 mb-12 border-b-2 border-blue-600 pb-2 text-shadow-sm">Services Additionnels</h2>
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 text-center">
            <div class="mx-auto bg-yellow-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                <span class="text-3xl">👕</span>
            </div>
            <h3 class="font-bold text-lg text-gray-800">Tenue de compétition</h3>
            <p class="text-3xl font-bold text-gray-800 my-2">10€</p>
            <p class="text-gray-600">Tenue officielle du club pour les compétitions.</p>
        </div>
      </section>

      <!-- Réductions Disponibles -->
      <section class="pt-16">
        <h2 class="text-5xl font-bold text-center text-blue-600 mb-12 border-b-2 border-blue-600 pb-2 text-shadow-sm">Réductions Disponibles</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="discount in discounts" :key="discount.title" class="bg-gray-800 text-white rounded-xl shadow-lg p-6 text-center">
            <div class="mx-auto bg-yellow-400 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <span class="text-xl font-bold text-gray-800">{{ discount.amount }}</span>
            </div>
            <h3 class="font-bold text-lg mb-2">{{ discount.title }}</h3>
            <p class="text-gray-400 text-sm">{{ discount.description }}</p>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const trainingSchedule = [
  {
    name: 'Lundi',
    slots: [
      { time: '17h30 - 20h30', activity: 'Jeu libre pour tous', tag: 'Libre', tagClass: 'bg-blue-100 text-blue-800' },
      { time: '18h00 - 19h00', activity: 'Training Compét. Jr Groupe 1', tag: 'Compétition', tagClass: 'bg-green-100 text-green-800' },
      { time: '19h00 - 20h00', activity: 'Training Compét. Jr Groupe 2', tag: 'Compétition', tagClass: 'bg-green-100 text-green-800' },
    ],
  },
  {
    name: 'Mardi',
    slots: [
        { time: '17h30 - 20h30', activity: 'Jeu libre pour tous', tag: 'Libre', tagClass: 'bg-blue-100 text-blue-800' },
    ],
  },
  {
    name: 'Mercredi',
    slots: [
        { time: '17h30 - 18h30', activity: 'Training Loisirs Baby', tag: 'Loisir', tagClass: 'bg-yellow-100 text-yellow-800' },
        { time: '18h30 - 20h00', activity: 'Training Loisirs Junior', tag: 'Loisir', tagClass: 'bg-yellow-100 text-yellow-800' },
    ],
  },
  {
    name: 'Jeudi',
    slots: [
        { time: '17h30 - 20h30', activity: 'Jeu libre pour tous', tag: 'Libre', tagClass: 'bg-blue-100 text-blue-800' },
        { time: '18h00 - 19h00', activity: 'Training Compét. Jr Groupe 1', tag: 'Compétition', tagClass: 'bg-green-100 text-green-800' },
        { time: '19h00 - 20h00', activity: 'Training Compét. Jr Groupe 2', tag: 'Compétition', tagClass: 'bg-green-100 text-green-800' },
    ],
  },
  {
    name: 'Vendredi',
    slots: [
        { time: '17h30 - 20h30', activity: 'Jeu libre pour tous', tag: 'Libre', tagClass: 'bg-blue-100 text-blue-800' },
    ],
  },
  {
    name: 'Samedi',
    slots: [
        { time: 'Après-midi', activity: 'Compétitions Juniors', tag: 'Compétition', tagClass: 'bg-green-100 text-green-800' },
    ],
  },
  {
    name: 'Dimanche',
    slots: [
        { time: 'Matin', activity: 'Compétitions Adultes', tag: 'Compétition', tagClass: 'bg-green-100 text-green-800' },
    ],
  },
];

const competitions = [
    { day: 'Samedi', description: 'Compétitions équipes jeunes' },
    { day: 'Dimanche', description: 'Compétitions équipes adultes' },
];

const rates = [
  {
    title: 'Licence Loisir',
    price: '45',
    includes: [
      'Entraînements dirigés (1h30)',
      'Accès aux séances de jeu libre',
      'Assurance FFTT comprise',
    ],
  },
  {
    title: 'Licence Compétition',
    price: '80',
    includes: [
      'Tout inclus dans la licence loisir',
      'Entraînements de groupe',
      'Participation aux compétitions',
      'Licence FFTT comprise',
    ],
  },
];

const discounts = [
    { amount: '10€', title: 'Famille', description: 'Dès la 2ème licence pour les membres de la même famille.' },
    { amount: '70€', title: 'Pass\'Sport', description: 'Aide de l\'État de 70€ pour encourager la pratique sportive.' },
    { amount: '20€', title: 'Pass\'Sport Agglo CAHC', description: 'Aide de l\'agglomération Hénin-Carvin de 20€.' },
];

const activityFilter = ref('all');

const filteredSchedule = computed(() => {
  if (activityFilter.value === 'all') {
    return trainingSchedule;
  }
  return trainingSchedule.map(day => {
    const filteredSlots = day.slots.filter(slot => slot.tag === activityFilter.value);
    return { ...day, slots: filteredSlots };
  }).filter(day => day.slots.length > 0);
});

const currentDay = new Date().toLocaleString('fr-FR', { weekday: 'long' });
const capitalizedCurrentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);

</script>

<style scoped>
/* Additional styles if needed */
</style>