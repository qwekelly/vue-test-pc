import defaultLayout from '../layouts/default'
import errors from './errors'
import home from './home'
import three from './three'

let fallbackRouter = {
  path: '*',
  component: defaultLayout,
  children: [errors]
}

let sharedRouter = {
  path: '/',
  component: defaultLayout,
  children: [
    home,
    three
  ]
}

let routes = [sharedRouter]

// 这个要放在最后
routes.push(fallbackRouter)

export default routes
