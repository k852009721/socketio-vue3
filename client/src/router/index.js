import { createRouter, createWebHistory } from 'vue-router';
import { state } from '@/socket';

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
  ],
});

router.beforeEach(async (to, from) => {
  if (!state.connected && to.name !== 'home') {
    return { name: 'home' };
  }
});

export default router;
