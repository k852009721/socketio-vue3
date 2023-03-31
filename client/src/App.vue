<script setup>
import { RouterView } from 'vue-router';
import Loading from './components/Loading.vue';
import { useLoadingStore } from '@/stores/loading';
const loadingStore = useLoadingStore();
</script>

<template>
  <div class="h-screen w-screen bg-base-100">
    <Loading v-if="loadingStore.isLoading" />
    <RouterView />
  </div>
</template>

<style scoped></style>
