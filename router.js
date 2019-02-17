import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component() {
        return import(/* webpackChunkName: "about" */ './views/About.vue');
      },
    },
    {
      path: '/myprofile',
      name: 'myprofile',
      // route level code-splitting
      // this generates a separate chunk (myprofile.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component() {
        return import(/* webpackChunkName: "myprofile" */ './views/MyProfile.vue');
      },
    },
    {
      path: '/meals',
      name: 'meals',
      // route level code-splitting
      // this generates a separate chunk (myprofile.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component() {
        return import(/* webpackChunkName: "meals" */ './views/Meals.vue');
      },
    },
    {
      path: '/water',
      name: 'water',
      // route level code-splitting
      // this generates a separate chunk (myprofile.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component() {
        return import(/* webpackChunkName: "water" */ './views/Water.vue');
      },
    },
  ],
});
