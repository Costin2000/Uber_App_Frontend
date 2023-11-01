<template>
  <div class="min-h-screen bg-white flex flex-col"> <!-- Set min-h-screen to cover at least the height of the screen -->
    <the-navbar v-if="isUserLoggedIn" @log_out="logout"></the-navbar>
    <router-view @log_in="login" class="flex-1"></router-view> <!-- Use flex-1 to let it take up remaining space -->
  </div>
</template>

<script>
  import { getUser } from './helpers/userService.js';
  export default {
    data() {
      return {
        isUserLoggedIn: false,
      }
    },
    beforeMount() {
    // Check if the user is logged in
      var user = getUser();
      if (!user) {
        this.isUserLoggedIn = false
      } else {
        this.isUserLoggedIn = true
      }
    },
    methods: {
      logout() {
        this.isUserLoggedIn = false
      },
      login() {
        this.isUserLoggedIn = true
      }
    }
  }
</script>

<style>
</style>
