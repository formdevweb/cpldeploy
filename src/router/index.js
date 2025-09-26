import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from '../store'

const routes = [
  { path: '/', name: 'accueil', component: () => import('../pages/Home.vue') },
  { path: '/club', name: 'club', component: () => import('../pages/Club.vue') },
  { path: '/licencies', name: 'licencies', component: () => import('../pages/Licencies.vue'), meta: { requiresAdmin: true } },
  { path: '/calendrier', name: 'calendrier', component: () => import('../pages/Calendrier.vue') },
  { path: '/horaires-tarifs', name: 'horaires-tarifs', component: () => import('../pages/HorairesTarifs.vue') },
  { path: '/faq', name: 'faq', component: () => import('../pages/FAQ.vue') },
  { path: '/contact', name: 'contact', component: () => import('../pages/Contact.vue') },
  { path: '/actualites', name: 'actualites-list', component: () => import('../pages/ActualitesList.vue') },
  { path: '/admin/contacts', name: 'admin-contacts', component: () => import('../pages/ContactMessages.vue'), meta: { requiresAdmin: true } },
  { path: '/mentions-legales', name: 'mentions-legales', component: () => import('../pages/MentionsLegales.vue') },
  { path: '/politique-confidentialite', name: 'politique-confidentialite', component: () => import('../pages/PolitiqueConfidentialite.vue') },
  { path: '/login', name: 'login', component: () => import('../pages/Login.vue') }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const element = document.querySelector(to.hash);
          if (element) {
            resolve({
              el: element,
              behavior: 'smooth',
            });
          } else {
            resolve({ top: 0 }); // Fallback to top if element not found
          }
        }, 300); // Small delay to allow rendering
      });
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
})

router.beforeEach((to, from, next) => {
  // If the route requires admin and user is not admin, redirect to login
  if (to.meta.requiresAdmin && !store.isAdmin) {
    next({ name: 'login' });
  }
  // If user is already logged in and tries to access login page, redirect to home
  else if (to.name === 'login' && store.isAdmin) {
    next({ name: 'accueil' });
  }
  else {
    next();
  }
});

export default router


