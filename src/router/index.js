import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    redirect: '/boardroom',
    hidden: true
  },

  // Hide sidebar: [Plan 1]
  /* {
    path: '/boardroom/booking/periodic',
    component: () => import('@/views/boardroom/periodic'),
    hidden: true
  },
  {
    path: '/boardroom/booking/long/term',
    component: () => import('@/views/boardroom/long-term'),
    hidden: true
  }, */

  // Hide sidebar: [Plan 2]
  /* {
    path: '/other/booking',
    component: Layout,
    props: { hideSidebar: true },
    hidden: true,
    meta: { title: 'Other Booking', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'periodic',
        component: () => import('@/views/boardroom/periodic')
      },
      {
        path: 'long/term',
        component: () => import('@/views/boardroom/long-term')
      }
    ]
  }, */

  // Hide sidebar: [Plan 3]
  {
    path: '/boardroom',
    component: Layout,
    props: route => ({ showSidebar: route.meta.sidebar }),
    meta: { title: 'Boardroom', icon: 'el-icon-s-help' },
    children: [
      {
        path: '',
        name: 'BoardroomStatistics',
        component: () => import('@/views/boardroom/statistics'),
        meta: { title: 'Booking', icon: 'el-icon-s-help' }
      },
      {
        path: 'booking/periodic',
        name: 'BoardroomBookingPeriodic',
        component: () => import('@/views/boardroom/periodic'),
        meta: { title: 'Booking(Periodic)', sidebar: false },
        hidden: true
      },
      {
        path: 'booking/long/term',
        name: 'BoardroomBookingLongTerm',
        component: () => import('@/views/boardroom/long-term'),
        meta: { title: 'Booking(Long-Term)', sidebar: false },
        hidden: true
      },
      {
        path: 'booking/my',
        name: 'BoardroomMyBooking',
        component: () => import('@/views/boardroom/components/view'),
        meta: { title: 'My Booking', icon: 'el-icon-s-help' }
      },
      {
        // Reference: https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js
        path: 'booking/:id/:start?',
        props: true,
        name: 'BoardroomBooking',
        component: () => import('@/views/boardroom/booking'),
        meta: { title: 'Booking Edit' },
        hidden: true
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
