import App from '../App'

const it = r => require.ensure([], () => r(require('../page/it/It')), 'it')

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    {
      path: '',
      redirect: '/it'
    },
    {
      path: '/it',
      component: it
    }

  ]
}]
