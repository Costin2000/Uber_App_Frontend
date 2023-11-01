<template>
  <div class="flex min-h-full flex-1">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            class="h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2
            class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Sign in to your account
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Not a member?
            {{ " " }}
            <router-link
              to="/register"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Register now</router-link
            >
          </p>
        </div>

        <div class="mt-10">
          <div>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Email address</label
                >
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required=""
                    v-model="email"
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Password</label
                >
                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required=""
                    v-model="password"
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    for="remember-me"
                    class="ml-3 block text-sm leading-6 text-gray-700"
                    >Remember me</label
                  >
                </div>

                <div class="text-sm leading-6">
                  <a
                    href="#"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                    >Forgot password?</a
                  >
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.pixexid.com/a-sports-car-on-a-road-with-a-city-in-the-background-pmthtstc.jpeg"
        alt=""
      />
    </div>
    <notification :message="error_message" @clear="clearError" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      error_message: "",
    };
  },
  methods: {
    clearError() {
        this.error_message = ''
    },
    async submitForm() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      console.log(formData);

      try {
        const response = await axios.post("http://localhost:8081/authenticate", formData);
        console.log("User logged in:", response.data);
        const now = new Date();
        const item = {
            data: response.data.data,
            expiry: now.getTime() + 24 * 60 * 60 * 1000, // Adding hoursUntilExpiry hours to the current time
        };
        // Save user data to local storage
        localStorage.setItem("user", JSON.stringify(item));
        this.$emit('log_in');
        this.$router.push("/");
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          console.error("Error logging in:", errorMessage);
          this.error_message = errorMessage;
          console.log(this.error_message)
        }
      }
    },
  }
}
</script>
