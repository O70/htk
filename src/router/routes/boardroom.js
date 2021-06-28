import Layout from '@/layout'

export default [
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
        name: 'BrStatistics',
        component: () => import('@/views/boardroom/statistics'),
        meta: { title: 'Booking', icon: 'el-icon-s-help' }
      },
      {
        path: 'booking/my',
        name: 'BrMyBooking',
        component: () => import('@/views/boardroom/my-booking'),
        meta: { title: 'My Booking', icon: 'el-icon-s-help' }
      },
      {
        path: 'booking/approve',
        name: 'BrBookingApprove',
        component: () => import('@/views/boardroom/approve'),
        meta: { title: 'Approve', sidebar: false },
        hidden: false
      },
      {
        path: 'booking/periodic',
        name: 'BrBookingPeriodic',
        component: () => import('@/views/boardroom/periodic'),
        meta: { title: 'Periodic', sidebar: false },
        hidden: false
      },
      {
        path: 'booking/long/term',
        name: 'BrBookingLongTerm',
        component: () => import('@/views/boardroom/long-term'),
        meta: { title: 'Long-term', sidebar: false },
        hidden: false
      },
      {
        path: 'booking/modify/:id',
        props: route => Object.assign(route.params, { modify: true }),
        name: 'BrBookingModify',
        component: () => import('@/views/boardroom/booking'),
        meta: { title: 'Booking Modify' },
        hidden: true
      },
      {
        // Reference: https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js
        path: 'booking/:id/:start?',
        props: true,
        name: 'BrBooking',
        component: () => import('@/views/boardroom/booking'),
        meta: { title: 'Booking Edit' },
        hidden: true
      }
    ]
  }
]
