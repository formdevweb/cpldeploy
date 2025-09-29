<template>
  <!-- <transition name="fade"> -->
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-4 right-4 p-4 rounded-full bg-[var(--accent)] text-white shadow-lg transition-all duration-300 hover:bg-[var(--primary)] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 z-50 cursor-pointer active:scale-[0.98] group"
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 arrow-icon group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7 7 7M12 3v18" />
      </svg>
    </button>
  <!-- </transition> -->
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > 200; // Show button after scrolling 200px
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px); /* Glisse de 20px vers le bas */
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px); /* Glisse de 20px vers le bas */
}
</style>
