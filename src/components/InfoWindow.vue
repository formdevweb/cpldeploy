<template>
  <!-- <Transition name="info-window"> -->
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="p-4 rounded-lg shadow-lg text-white max-w-sm w-full"
        :class="type === 'success' ? 'bg-green-500' : 'bg-red-500'">
        <div class="flex items-center justify-between">
          <span>{{ message }}</span>
          <button @click="close" class="ml-4 text-white font-bold">&times;</button>
        </div>
      </div>
    </div>
  <!-- </Transition> -->
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'success', // Can be 'success' or 'error'
  },
  duration: {
    type: Number,
    default: 3000, // 3 seconds
  },
});

const emit = defineEmits(['close']);

let timeoutId;

const close = () => {
  clearTimeout(timeoutId);
  emit('close');
};

watch(() => props.show, (newVal) => {
  if (newVal && props.duration > 0) {
    timeoutId = setTimeout(() => {
      close();
    }, props.duration);
  }
});
</script>

<style scoped>
.info-window-enter-active, .info-window-leave-active {
  transition: all 1.5s ease;
}
.info-window-enter-from, .info-window-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.info-window-enter-to, .info-window-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
