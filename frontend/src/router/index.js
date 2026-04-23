import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import ProfilView from '../views/ProfilView.vue'
import TrajetsView from '../views/TrajetsView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },

    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    
    {
  path: '/profil',
  name: 'profil',
  component: ProfilView
},
{
  path: '/trajets',
  name: 'trajets',
  component: TrajetsView
}

  ],
})

export default router