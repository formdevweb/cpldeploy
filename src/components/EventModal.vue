<template>
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 overflow-y-auto p-4">
        <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md modal-container mx-4 max-h-full overflow-y-auto">
          <h2 class="text-3xl font-bold mb-6 text-gray-800">{{ isEdit ? 'Modifier l\\\'événement' : 'Ajouter un événement' }}</h2>
          <form @submit.prevent="save">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="mb-4 md:col-span-2">
                <label for="title" class="block text-gray-700 font-semibold mb-2">Titre</label>
                <input type="text" v-model="form.title" id="title" class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500
  transition-colors duration-300" required>
              </div>
              <div class="mb-4 md:col-span-2">
                <label for="date" class="block text-gray-700 font-semibold mb-2">Date</label>
                <VueDatePicker v-model="form.date" id="date" locale="fr" format="EEEE d MMMM yyyy" auto-apply :enable-time-picker="false" required></VueDatePicker>
              </div>
              <div class="mb-4 md:col-span-2">
                <label for="description" class="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea v-model="form.description" id="description" class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500
  transition-colors duration-300" required></textarea>
              </div>
              <div class="mb-4 md:col-span-2">
                <label for="location" class="block text-gray-700 font-semibold mb-2">Lieu</label>
                <input type="text" v-model="form.location" id="location" class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500
  transition-colors duration-300" required>
              </div>
              <div class="mb-4">
                <label for="status" class="block text-gray-700 font-semibold mb-2">Statut</label>
                <select v-model="form.status" id="status" class="w-full p-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 transition-colors
  duration-300" required>
                  <option value="open">Ouvert</option>
                  <option value="closed">Fermé</option>
                </select>
              </div>
              <div class="mb-4">
                <label for="participants" class="block text-gray-700 font-semibold mb-2">Participants</label>
                <input type="number" v-model="form.participants" id="participants" class="w-full p-3 border-2 border-gray-200 rounded-lg text-black
  focus:border-blue-500 transition-colors duration-300" required>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row mt-6 gap-4" :class="isEdit ? 'justify-between' : 'justify-end'">
              <button v-if="isEdit" type="button" @click="$emit('delete')" class="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700
  transition-colors duration-300 shadow-md w-full sm:w-auto cursor-pointer">Supprimer</button>
              <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button type="button" @click="$emit('close')" class="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors
  duration-300 w-full sm:w-auto cursor-pointer" style="cursor: pointer;">Annuler</button>
                <button type="submit" class="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md
  w-full sm:w-auto cursor-pointer" style="cursor: pointer;">{{ isEdit ? 'Modifier' : 'Ajouter' }}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </template>

  <script setup>
  import { ref, watch } from 'vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';

  const props = defineProps({
    show: Boolean,
    isEdit: Boolean,
    eventData: Object
  });

  const emit = defineEmits(['close', 'save', 'delete']);

  const form = ref({});

  watch(() => props.eventData, (newEventData) => {
    form.value = { ...newEventData };
  }, { immediate: true });

  const save = () => {
    emit('save', form.value);
  };
  </script>

  <style scoped>
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