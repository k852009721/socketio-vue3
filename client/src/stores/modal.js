import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const isModalOpen = ref(false);
  const modalType = ref('normal');
  const modalInfo = ref({
    title: 'modal title',
    content: 'modal content',
    callBack: () => {},
  });
  function showModal({ title, content, callBack }) {
    modalInfo.value.title = title;
    modalInfo.value.content = content;
    if (callBack) {
      modalType.value = 'confirm';
      modalInfo.value.callBack = callBack;
    }
    isModalOpen.value = true;
  }
  function closeModal() {
    isModalOpen.value = false;
  }
  return { isModalOpen, modalType, modalInfo, showModal, closeModal };
});
