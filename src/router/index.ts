import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../modules/Auth/Pages/LoginPage.vue'
import RegisterPage from '../modules/Auth/Pages/RegisterPage.vue'
import VisitRequestPage from '../modules/VisitRequest/Pages/VisitRequestPage.vue'
import MainLayout from '../layouts/MainLayout.vue'
import VisitPersonPage from '../modules/VisitPerson/Pages/VisitPersonPage.vue'
import ReceptionsPage from '../modules/Receptions/Pages/ReceptionsPage.vue'
import GuidePage from '../modules/Guide/Pages/GuidePage.vue'
import GuideAssignmentPage from '../modules/GuideAssignments/Pages/GuideAssignmentPage.vue'
import AttendancePage from '../modules/Attendances/Pages/AttendancePage.vue'
import CompletedVisitPage from '../modules/CompletedVisit/pages/CompletedVisitPage.vue'
import CertificatePage from '../modules/Certificate/Pages/CertificatePage.vue'
import HistoricPage from '../modules/Historic/Pages/HistoricPage.vue'
import LandingPageReservas from '../modules/VisitRequest/Pages/LandingPageReservas.vue'




// Define tus rutas
const routes= [
  {
    path: '/',
   component: MainLayout, // Asegúrate de importar el layout si lo usas
    children: [
      { path: '', redirect: '/visit-requests' }, // Redirigir al módulo principal
      {
        path: 'visit-requests',
        name: 'VisitRequest',
        component: VisitRequestPage,
        meta: { requiresAuth: true }
      },
      {
        path: 'visit-persons',
        name: 'VisitPerson',
        component: VisitPersonPage,
        meta: { requiresAuth: true }
      },
      {
        path: 'receptions',
        name: 'Reception',
        component: ReceptionsPage,
        meta: { requiresAuth: true }
      },
      {
        path: 'completed-visits',
        name: 'CompletedVisit',
        component: CompletedVisitPage,
        meta: { requiresAuth: true }
      },
      {
        path: 'attendances',
        name: 'Attendance',
        component: AttendancePage,
        meta: { requiresAuth: true }
      },
      {
        path: 'certificates',
        name: 'Certificate',
        component: CertificatePage,
        meta: { requiresAuth: true }
      },
      {
        path: 'guides',
        name: 'Guide',
        component: GuidePage,
        meta: { requiresAuth: true }
      },
      {
        path: 'guide-assignments',
        name: 'GuideAssignment',
        component: GuideAssignmentPage,
        meta: { requiresAuth: true }
      },
      {
        path: 'historic',
        name: 'Historic',
        component: HistoricPage,
        meta: { requiresAuth: true }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/landing',
    name: 'landing',
    component: LandingPageReservas
  }

//   {
//     path: '/:catchAll(.*)',
//     name: 'NotFound',
//     component: NotFound
//   }
]

// Router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guard de ejemplo (puedes ampliar para roles, claims, etc)
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
