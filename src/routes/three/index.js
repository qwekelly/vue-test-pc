import defaultLayout from '../../layouts/default'

export default {
  path: 'three',
  component: defaultLayout,
  children: [
    {
      path: 'test',
      meta: {
        title: '测试页面'
      },
      component: () => import('./test')
    },
    {
      path: 'css3d_panorama',
      meta: {
        title: '3d场景页面'
      },
      component: () => import('./css3d_panorama')
    }
  ]
}
