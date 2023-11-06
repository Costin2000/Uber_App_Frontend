<template>
  <div
    class="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center"
  >
    <div class="text-center text-white">
      <h1 class="text-5xl lg:text-6xl font-bold mb-4">
        Explore the World in Style
      </h1>
      <p class="text-lg lg:text-xl mb-6">
        Experience a new way to travel with our exceptional ride services.
      </p>
      <router-link
        v-if="!isUserLoggedIn"
        to="/login"
        class="bg-white text-blue-600 font-bold py-3 px-6 rounded-full inline-block text-lg lg:text-xl hover:bg-opacity-80 transition duration-300"
        >Get Started</router-link
      >
      <router-link
        v-else-if="user.type == 'customer'"
        to="/request_car"
        class="bg-white text-blue-600 font-bold py-3 px-6 rounded-full inline-block text-lg lg:text-xl hover:bg-opacity-80 transition duration-300"
        >Need a ride?</router-link
      >
      <router-link
        v-else-if="user.type == 'driver'"
        to="/request_car"
        class="bg-white text-blue-600 font-bold py-3 px-6 rounded-full inline-block text-lg lg:text-xl hover:bg-opacity-80 transition duration-300"
        >See ride requests</router-link
      >

    </div>
    <img
      src="/car.png"
      alt="Car Image"
      class="hidden lg:block absolute right-10 bottom-10 lg:static w-72 lg:w-96 max-w-xs lg:max-w-full transform rotate-6"
    />
  </div>
</template>

<script>
import { getUser } from "../helpers/userService.js";
export default {
  data() {
    return {
      isUserLoggedIn: false,
      user: {}
    };
  },
  beforeMount() {
    // Check if the user is logged in
    var user = getUser();
    if (!user) {
      this.isUserLoggedIn = false;
    } else {
      this.isUserLoggedIn = true;
      this.user = user.user
      console.log(user.user)
    }
  },
  methods: {
  },
};
</script>
