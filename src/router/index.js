import { createRouter, createWebHistory } from "@ionic/vue-router";
import HomePage from "../views/HomePage.vue";
import AboutPage from "../views/AboutPage.vue";
import Kelas1 from "../views/Kelas1/Index.vue"
import IndexKelas from "../views/IndexKelas.vue"

const routes = [
  { path: "/", component: HomePage },
  { path: "/kelas", component: IndexKelas },
  { path: "/about", component: AboutPage },
  { path: "/kelas/1", component: IndexKelas},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
