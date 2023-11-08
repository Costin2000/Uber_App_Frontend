<template>
  <div class="min-h-screen bg-white flex flex-col"> <!-- Set min-h-screen to cover at least the height of the screen -->
    <the-navbar v-if="isUserLoggedIn" @log_out="logout"></the-navbar>
    <router-view @log_in="login" class="flex-1"></router-view> <!-- Use flex-1 to let it take up remaining space -->
  </div>
</template>

<script>
  import axios from "axios";
  import { getUser, clearUser } from './helpers/userService.js';
  export default {
    data() {
      return {
        isUserLoggedIn: false,
      }
    },
    async beforeMount() {
    // Check if the user is logged in
      var user = getUser();
      if (!user) {
        this.isUserLoggedIn = false
      } else {
        try {
          // Check the validity of the token by making an API request
          const response = await axios.post('http://localhost:8081/check_token', {},{
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (response.status === 202) {
            this.isUserLoggedIn = true;
          } else {
            clearUser()
            this.isUserLoggedIn = false;
          }
        } catch (error) {
          clearUser()
          this.isUserLoggedIn = false;
        }
      }
    },
    methods: {
      logout() {
        clearUser()
        this.isUserLoggedIn = false;
        this.$router.push("/");
      },
      login() {
        this.isUserLoggedIn = true
      }
    }
  }
</script>

<style>
</style>
