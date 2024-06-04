import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CineView from '../views/CineView.vue'
import MuseeView from '../views/MuseeView.vue'
import FestivalView from '../views/FestivalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/cine', name: 'CineView', component: CineView },
    { path: '/musee', name: 'MuseeView', component: MuseeView },
    { path: '/festival', name: 'FestivalView', component: FestivalView },

  ]
})

export default router
