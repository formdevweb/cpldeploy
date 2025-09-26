<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 transform transition-transform duration-300 scale-95">
        <div class="flex flex-col items-center text-center">
          <div class="text-6xl mb-4">{{ emoji }}</div>
          <h3 class="text-3xl font-bold text-brand-primary mb-3">{{ title }}</h3>
          <p class="text-gray-600 text-lg">{{ description }}</p>
          <blockquote class="mt-6 p-4 border-l-4 border-green-400 bg-green-50 italic w-full">
            <p class="text-black">"{{ proverb }}"</p>
          </blockquote>
        </div>
        <div class="text-center mt-8">
          <button @click="$emit('close')" class="bg-brand-primary text-white py-3 px-8 rounded-full hover:bg-brand-accent transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer">
            Fermer
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  description: String,
  emoji: String,
  proverb: String
})
defineEmits(['close'])
</script>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .transform, .modal-fade-leave-active .transform {
  transition: transform 0.3s ease;
}
.modal-fade-enter-from .transform, .modal-fade-leave-to .transform {
  transform: scale(0.9);
}
.modal-fade-enter-to .transform, .modal-fade-leave-from .transform {
  transform: scale(1);
}
</style>
