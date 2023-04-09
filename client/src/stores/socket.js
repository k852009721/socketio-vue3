import { ref } from 'vue';
import { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import router from '../router';
import { useModalStore } from './modal';

export const useSocketStore = defineStore('socket', () => {
  const URL = import.meta.env.PROD ? `window.location` : import.meta.env.VITE_SOCKET_ENDPOINT;
  const socket = io(URL, { autoConnect: false });
  const modalStore = useModalStore();

  const status = ref({
    isConnect: false,
    userId: ``,
    userName: ``,
    roomNumber: 0,
  });

  const users = ref([]);

  const allMessage = ref([]);

  socket.on('connect', () => {
    socket.emit('joinChat', status.value, (res) => {
      if (res) {
        socket.disconnect();
        modalStore.showModal({
          title: '',
          content: res,
        });
        // alert(res);
      } else {
        status.value.isConnect = true;
        router.push({
          path: `/chat`,
          query: {
            name: status.value.userName,
            room: status.value.roomNumber,
          },
        });
      }
    });
  });

  socket.on('setUserID', (id) => {
    status.value.userId = id;
  });

  socket.on('setUsers', (userInfo) => {
    users.value = userInfo;
  });

  socket.on('disconnect', () => {
    status.value.isConnect = false;
    status.value.userId = ``;
    allMessage.value = [];
    router.push(`/`);
  });

  socket.on('messageFromServer', (message, sender) => {
    sender === status.value.userId ? (message.isUser = true) : (message.isUser = false);
    // sender === 'user' ? (message.isUser = true) : (message.isUser = false);
    allMessage.value.push(message);
  });

  function connect({ userName, roomNumber }) {
    status.value.userName = userName;
    status.value.roomNumber = roomNumber;
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  function messageFromClient(message) {
    console.log(message);
    socket.emit('messageFromClient', message, status.value.userId);
  }
  return { status, users, allMessage, connect, disconnect, messageFromClient };
});
