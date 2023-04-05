import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import router from '../router';

export const useSocketStore = defineStore('socket', () => {
  const URL = import.meta.env.PROD ? `window.location` : import.meta.env.VITE_SOCKET_ENDPOINT;
  const socket = io(URL, { autoConnect: false });

  const status = ref({
    isConnect: false,
    userId: ``,
    userName: ``,
    roomNumber: 0,
  });

  const allMessage = ref([]);

  socket.on('connect', () => {
    status.value.isConnect = true;
    router.push({
      path: `/chat`,
      query: {
        name: status.value.userName,
        room: status.value.roomNumber,
      },
    });
  });

  socket.on('setUserID', (id) => {
    status.value.userId = id;
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
  return { status, allMessage, connect, disconnect, messageFromClient };
});
