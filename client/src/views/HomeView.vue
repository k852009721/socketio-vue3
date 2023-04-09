<script setup>
import { ref } from 'vue';
// import { socket } from '@/socket';
// import { useRouter } from 'vue-router';
import { useSocketStore } from '@/stores/socket';
import { useModalStore } from '@/stores/modal';

// const router = useRouter();
const socketStore = useSocketStore();
const modalStore = useModalStore();
const { showModal } = modalStore;
const userInfo = ref({
  userName: ``,
  roomNumber: 1,
});
const nameInput = ref(null);
const roomInput = ref(null);

function goToChatRoom() {
  nameInput.value.blur();
  roomInput.value.blur();
  if (!userInfo.value.userName) {
    showModal({
      title: 'Oops!!',
      content: 'need your name',
    });
    // alert('need your name');
    return;
  }
  if (!userInfo.value.roomNumber) {
    showModal({
      title: 'Oops!!',
      content: 'need room number',
    });
    // alert('need room number');
    return;
  }

  // socket.connect();
  socketStore.connect(userInfo.value);
  // router.push({
  //   path: `/chat`,
  //   query: {
  //     name: userInfo.value.userName,
  //     room: userInfo.value.roomNumber,
  //   },
  // });
  // socket.emit('joinChat', userInfo.value, (res) => {
  //   if (res === 'error') {
  //     alert(res);
  //   } else {
  //     router.push({
  //       path: `/chat`,
  //       query: {
  //         name: userInfo.value.userName,
  //         room: userInfo.value.roomNumber,
  //       },
  //     });
  //   }
  // });
}
</script>

<template>
  <main class="h-full w-full">
    <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">Let's Chat</h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="goToChatRoom">
            <div>
              <label for="name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your name</label>
              <input
                type="text"
                name="name"
                id="name"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                placeholder="ex: Kevin"
                v-model="userInfo.userName"
                ref="nameInput"
              />
            </div>
            <div>
              <label for="room" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Room</label>
              <input
                type="number"
                name="room"
                id="room"
                placeholder="ex: 1"
                min="1"
                step="1"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                v-model="userInfo.roomNumber"
                ref="roomInput"
              />
            </div>
            <input
              type="submit"
              value="Go"
              class="hover:bg-primary-700 focus:ring-primary-300 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 dark:bg-primary"
            />
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
