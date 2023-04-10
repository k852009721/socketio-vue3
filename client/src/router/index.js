import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { useSocketStore } from '../stores/socket';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatRoomView.vue'),
    },
    {
      path: '/chat/gpt',
      name: 'chatgpt',
      component: () => import('../views/ChatGptRoomView.vue'),
    },
  ],
});

router.beforeEach(async (to) => {
  const socketStore = useSocketStore();
  const { status } = storeToRefs(socketStore);
  if (!status.value.isConnect && to.name !== 'home') {
    return { name: 'home' };
  }
});

export default router;
