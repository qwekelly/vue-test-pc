import defaultLayout from '../../layouts/default'

export default {
  path: 'home',
  component: defaultLayout,
  children: [
    {
      path: 'homepage',
      meta: {
        title: '首页'
      },
      component: () => import('./homepage')
    }
  ]
}
