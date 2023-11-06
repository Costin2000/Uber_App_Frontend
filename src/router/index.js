import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import RequestCar from '../views/RequestCar.vue'
import CarRequest from '../views/CarRequest.vue'
import RideHistory from '../views/RideHistory.vue'
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
  {
    path: "/request_car",
    name: "RequestCar",
    component: RequestCar,
  },
  {
    path: "/car_requests/:id",
    name: "CarRequest",
    component: CarRequest,
  },
  {
    path: "/history",
    name: "RideHitory",
    component: RideHistory,
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
