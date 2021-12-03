import Layout from '@/layout'

export default [
  {
    path: '/htk',
    alias: '/',
    component: Layout,
    props: { showSidebar: false },
    meta: { title: 'HTK' },
    children: [
      {
        path: '',
        component: () => import('@/views/htk'),
        hidden: true
      },
      {
        path: ':id',
        component: () => import('@/views/htk/result'),
        props: ({ params }) => params,
        hidden: true
      }
    ]
  }
]
