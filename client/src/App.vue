<script setup>
import { RouterView } from 'vue-router';
import AppLoading from './components/AppLoading.vue';
import AppModal from './components/AppModal.vue';
import { useLoadingStore } from '@/stores/loading';
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';

const loadingStore = useLoadingStore();
const modalStore = useModalStore();
const { isModalOpen } = storeToRefs(modalStore);
</script>

<template>
  <div class="h-screen w-screen bg-base-100">
    <AppLoading v-if="loadingStore.isLoading" />
    <RouterView />
    <AppModal v-if="isModalOpen" />
  </div>
</template>

<style scoped></style>
