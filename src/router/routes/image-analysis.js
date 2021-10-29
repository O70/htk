import Layout from '@/layout'

export default [
  {
    path: '/image/analysis',
    component: Layout,
    props: { showSidebar: false },
    meta: { title: 'HTK' },
    children: [
      {
        path: '',
        component: () => import('@/views/image-analysis'),
        hidden: true
      },
      {
        path: ':id',
        component: () => import('@/views/image-analysis/result'),
        props: ({ params }) => params,
        hidden: true
      }
    ]
  }
  /* {
    path: '/image/analysis',
    component: () => import('@/views/image-analysis'),
    hidden: true
  },
  {
    path: '/image/analysis/:id',
    component: () => import('@/views/image-analysis/result'),
    props: ({ params }) => params,
    hidden: true
  } */
]
