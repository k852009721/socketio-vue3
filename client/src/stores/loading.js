import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false);
  function setLoadingStatus(newStatus) {
    isLoading.value = newStatus;
  }

  return { isLoading, setLoadingStatus };
});
