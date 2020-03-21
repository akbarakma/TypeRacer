import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import SinglePlayer from '../views/SinglePlayer.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/plays',
    name: 'SinglePlayer',
    component: SinglePlayer,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
