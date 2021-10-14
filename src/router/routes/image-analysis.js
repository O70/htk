export default [
  {
    path: '/image/analysis',
    component: () => import('@/views/image-analysis'),
    hidden: true
  },
  {
    path: '/image/analysis/:id',
    component: () => import('@/views/image-analysis/result'),
    props: ({ params }) => params,
    hidden: true
  }
]
