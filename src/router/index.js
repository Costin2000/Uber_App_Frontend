import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import { getUser } from "../helpers/userService.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = getUser();
  console.log(loggedIn)

  if (!loggedIn && to.name !== 'Login' && to.name !== 'home' && to.name !== 'Register') {
    next({ name: 'home' });
  } else {
    next();
  }
});



export default router;
