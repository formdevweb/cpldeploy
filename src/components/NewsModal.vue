<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" @click.self="closeModal">
      <div class="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        <button class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1" @click="closeModal">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div v-if="news" class="text-left">
          <div class="bg-gray-50 p-4 -mx-8 -mt-8 mb-6 rounded-t-lg border-b border-gray-200">
            <p class="text-sm text-gray-600 mb-1">{{ news.date }}</p>
            <h2 class="text-3xl font-extrabold text-gray-900">{{ news.title }}</h2>
          </div>
          <img :src="news.image" :alt="news.title" class="w-full h-64 object-cover rounded-lg mb-6 shadow-md" width="455" height="256">
          <p class="text-lg text-gray-800 leading-relaxed mb-6">{{ news.fullContent }}</p>
          <div class="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center">
            <p class="text-gray-600 text-sm">Publié par : <span class="font-semibold">{{ news.author }}</span></p>
            <div v-if="isAdmin" class="flex gap-4">
              <button @click="editNews" class="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md cursor-pointer">Modifier</button>
              <button @click="deleteNews" class="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md cursor-pointer">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>


const props = defineProps({
  show: Boolean,
  news: Object,
  isAdmin: Boolean // New prop
})

const emit = defineEmits(['close', 'edit', 'delete']) // New emits

const closeModal = () => {
  emit('close')
}

const editNews = () => {
  emit('edit', props.news)
}

const deleteNews = () => {
  emit('delete', props.news)
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-container, .modal-leave-active .modal-container {
  transition: all 0.3s ease;
}
.modal-enter-from .modal-container, .modal-leave-to .modal-container {
  transform: scale(0.9);
}
</style>