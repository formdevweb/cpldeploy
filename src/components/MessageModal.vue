<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg modal-container mx-4 max-h-full overflow-y-auto"
        :class="show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Message Complet</h2>
        <div class="prose max-w-none text-gray-700 mb-6">
          <p>{{ messageContent }}</p>
        </div>
        <div class="flex justify-end">
          <button @click="$emit('close')" class="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">Fermer</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>


const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  messageContent: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['close']);
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
