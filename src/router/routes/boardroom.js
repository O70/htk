import Layout from '@/layout'

const locale = {
  zh: {
    boardroom: '会议室',
    booking: '预定',
    my: '我的预定',
    periodic: '周期预定',
    longTerm: '长期预定',
    approve: '审批',
    service: '服务人员查询',
    modify: '修改',
    edit: '编辑'
  },
  en: {
    boardroom: 'Boardroom',
    booking: 'Booking',
    my: 'My Booking',
    periodic: 'Periodic',
    longTerm: 'Long-term',
    approve: 'Approve',
    service: 'Service',
    modify: 'Modify',
    edit: 'Edit'
  }
}
const local = navigator.languages.includes('en') ? locale.en : locale.zh

export default [
  // Hide sidebar: [Plan 3]
  {
    path: '/boardroom',
    component: Layout,
    props: route => ({ showSidebar: route.meta.sidebar }),
    meta: { title: local.boardroom },
    children: [
      {
        path: '',
        name: 'BrStatistics',
        component: () => import('@/views/boardroom/statistics'),
        meta: { title: local.booking }
      },
      {
        path: 'booking/my',
        name: 'BrMyBooking',
        component: () => import('@/views/boardroom/my-booking'),
        meta: { title: local.my }
      },
      {
        path: 'booking/periodic',
        name: 'BrBookingPeriodic',
        component: () => import('@/views/boardroom/periodic'),
        meta: { title: local.periodic, sidebar: false },
        hidden: false
      },
      {
        path: 'booking/long/term',
        name: 'BrBookingLongTerm',
        component: () => import('@/views/boardroom/long-term'),
        meta: { title: local.longTerm, sidebar: false },
        hidden: false
      },
      {
        path: 'booking/approve',
        name: 'BrBookingApprove',
        component: () => import('@/views/boardroom/approve'),
        meta: { title: local.approve, sidebar: false },
        hidden: false
      },
      {
        path: 'booking/service',
        name: 'BrBookingService',
        component: () => import('@/views/boardroom/approve'),
        meta: { title: local.service, sidebar: false },
        hidden: false
      },
      {
        path: 'booking/modify/:id',
        props: route => Object.assign(route.params, { modify: true }),
        name: 'BrBookingModify',
        component: () => import('@/views/boardroom/booking'),
        meta: { title: local.modify },
        hidden: true
      },
      {
        // Reference: https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js
        path: 'booking/:id/:start?',
        props: true,
        name: 'BrBooking',
        component: () => import('@/views/boardroom/booking'),
        meta: { title: local.edit },
        hidden: true
      }
    ]
  }

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
]
