<script setup>
import { storeToRefs } from 'pinia';
import { useModalStore } from '../stores/modal';
import IconClose from '@/components/icons/IconClose.vue';
const modalStore = useModalStore();
const { closeModal } = modalStore;
const { modalInfo, modalType } = storeToRefs(modalStore);
</script>
<template>
  <div class="fixed bottom-0 left-0 right-0 top-0 bg-slate-300/10">
    <div class="fixed left-1/2 top-1/2 flex w-1/6 -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-neutral p-8 text-white">
      <div class="text-2xl font-bold">{{ modalInfo.title }}</div>
      <div class="mt-4">{{ modalInfo.content }}</div>
      <IconClose class="absolute right-2 top-2 h-6 w-6 cursor-pointer" @click="closeModal" />
      <div v-if="modalType === 'confirm'" class="mx-auto mt-4 cursor-pointer rounded bg-primary p-1 px-4" @click="modalInfo.callBack">Confirm</div>
    </div>
  </div>
</template>
