<script setup>
// import { socket } from '@/socket'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSocketStore } from '../stores/socket';
import { useModalStore } from '../stores/modal';

// const route = useRoute();
const router = useRouter();
const route = useRoute();
const socketStore = useSocketStore();
const modalStore = useModalStore();
const { personalMessage, status } = storeToRefs(socketStore);
const message = ref('');
const filterMessage = computed(() => {
  return personalMessage.value.filter((message) => {
    return message.senderId === route.params.id || message.receiverId === route.params.id;
  });
});

function messagePositionClass(isUser) {
  return isUser ? `self-end` : ``;
}

function messageAvatarClass(isUser) {
  return isUser ? `order-1 ml-2` : ``;
}

function messageBoxClass(isUser) {
  return isUser ? `bg-green-400` : `bg-base-100 text-white`;
}

function handleMessageSubmit() {
  if (!message.value) {
    return;
  }
  socketStore.personalMessageFromClient(route.params.id, message.value);
  message.value = ``;
}

function logout() {
  // socketStore.disconnect();
  modalStore.showModal({
    title: 'Logout',
    content: 'Are you sure you want to logout?',
    callBack: logoutCallBack,
  });
}

function logoutCallBack() {
  socketStore.disconnect();
  modalStore.closeModal();
}
</script>

<template>
  <div class="flex h-full w-full bg-neutral">
    <div class="hidden flex-col border-r border-r-gray-600 p-4 md:flex md:w-52">
      <div class="flex items-center">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-400">
          <img src="@/assets/chat.svg" class="h-8 w-8" alt="chat" />
        </div>
        <div class="ml-4 text-white">ROOM : Personal</div>
      </div>
      <div class="mt-4 flex cursor-pointer rounded bg-primary px-4 py-2 text-white" @click="router.go(-1)">
        <div>Back to Chat Room</div>
      </div>
    </div>
    <div class="flex flex-1 flex-col">
      <div class="flex h-16 items-center px-4">
        <div class="h-10 w-10 shrink-0 rounded-full bg-gray-400">
          <img src="@/assets/profile.svg" alt="default_avatar" />
        </div>
        <div class="ml-4 text-white">{{ status.userName }}</div>
        <div class="ml-auto cursor-pointer text-white" @click="logout">logout</div>
      </div>
      <div class="scrollbar-hide flex flex-1 flex-col overflow-y-scroll border-y border-y-gray-600 p-4 first:mt-0">
        <div v-for="message in filterMessage" :key="message.id" class="my-2 flex max-w-md" :class="messagePositionClass(message.isUser)">
          <div class="h-12 w-12 shrink-0 rounded-md bg-gray-400" :class="messageAvatarClass(message.isUser)">
            <img src="@/assets/profile.svg" alt="default_avatar" />
          </div>
          <div class="ml-3 rounded-md p-2" :class="messageBoxClass(message.isUser)">
            {{ message.content }}
          </div>
        </div>
      </div>
      <div class="flex h-16 items-center">
        <form id="messageForm" class="mx-auto flex w-4/5" @submit.prevent="handleMessageSubmit">
          <input type="text" v-model="message" placeholder="Write a message..." class="flex-1 rounded bg-base-100 text-white" />
          <input type="submit" value="Send" class="ml-2 hidden cursor-pointer rounded bg-primary px-4 text-white sm:block" />
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
