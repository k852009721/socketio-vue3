import { reactive, ref } from 'vue';
import { io } from 'socket.io-client';
import { useRouter } from 'vue-router';

const router = useRouter();

export const state = reactive({
  connected: false,
  id: ``,
});

export const allMessage = reactive([]);

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.PROD ? `window.location` : import.meta.env.VITE_SOCKET_ENDPOINT;

export const socket = io(URL, { autoConnect: false });

socket.on('connect', () => {
  state.connected = true;
});

socket.on('setUserID', (id) => {
  state.id = id;
});

socket.on('disconnect', () => {
  state.connected = false;
  state.id = ``;
  allMessage = reactive([]);
  router.push(`/`);
});

socket.on('messageFromServer', (message, sender) => {
  sender === 'user' ? (message.isUser = true) : (message.isUser = false);
  allMessage.push(message);
});
