<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" @click.self="closeModal">
      <div class="bg-white rounded-lg shadow-xl p-6 m-4 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        <button class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold" @click="closeModal">&times;</button>
        <div v-if="news" class="text-left">
          <img :src="news.image" :alt="news.title" class="w-full h-64 object-cover rounded-lg mb-6">
          <p class="text-sm text-gray-500 mb-2">{{ news.date }}</p>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ news.title }}</h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-4">{{ news.fullContent }}</p>
          <div class="mt-6 pt-4 border-t border-gray-200 text-gray-600 text-sm">
            <p>Publié par : {{ news.author }}</p>
          </div>
          <div v-if="isAdmin" class="flex justify-end mt-6 gap-4">
            <button @click="editNews" class="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md cursor-pointer">Modifier</button>
            <button @click="deleteNews" class="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md cursor-pointer">Supprimer</button>
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