import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../components/home-page.vue';
import LoginPage from '../components/login-page.vue';
import RegisterPage from '../components/register-page.vue';
import AddItemPage from '../components/add-item-page.vue';
import BartersPage from '../components/barters-page.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/new', component: AddItemPage },
    { path: '/trocs', component: BartersPage },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})