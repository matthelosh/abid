import { createRouter, createWebHistory } from "@ionic/vue-router";
import AboutPage from "../views/AboutPage.vue";

const routes = [
  { path: "/", component: () => import('../views/HomePage.vue') },
  { path: "/about", component: AboutPage },
  { 
    path: "/kelas", 
    component: ()=> import('../views/IndexKelas.vue'),
  },
  {
    path: '/kelas/:kelas',
    component: ()=> import('../views/ShowKelas.vue')
  },
  {
    path: '/kelas/:kelas/bab/:bab',
    component: ()=> import('../views/ShowMateri.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
