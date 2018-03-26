import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: (resolve) => require(['../page/Home/Home.vue'], resolve)
    },
    {
      path: '/test',
      name: 'Test',
      component: (resolve) => require(['../page/Test/Test.vue'], resolve)
    },
    {
      path: '/echarts',
      name: 'ECharts',
      component: (resolve) => require(['../page/ECharts/ECharts.vue'], resolve),
      children: [
        {
          path: '/',
          name: 'BaseLine',
          component: (resolve) => require(['../page/ECharts/component/BaseLine.vue'], resolve)
        },
        {
          path: '/bar3d',
          name: 'Bar3D',
          component: (resolve) => require(['../page/ECharts/component/Bar3D.vue'], resolve)
        },
        {
          path: '/simplebar3d',
          name: 'SimpleBar3D',
          component: (resolve) => require(['../page/ECharts/component/SimpleBar3D.vue'], resolve)
        },
        {
          path: '/quadrant',
          name: 'Quadrant',
          component: (resolve) => require(['../page/ECharts/component/Quadrant.vue'], resolve)
        },
        {
          path: '/profile',
          name: 'Profile',
          component: (resolve) => require(['../page/ECharts/component/Profile.vue'], resolve)
        },
        {
          path: '/customize',
          name: 'Customize',
          component: (resolve) => require(['../page/ECharts/component/Customize.vue'], resolve)
        }

      ]
    }
  ]
})
