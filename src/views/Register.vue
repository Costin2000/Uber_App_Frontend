<template>
    
  <div class="flex min-h-full flex-1">
    <notification :message="error_message" @clear="clearError" />
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
            Create your account
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Already have an account?
            {{ " " }}
            <router-link
              to="/login"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Login now</router-link
            >
          </p>
        </div>

        <div class="mt-10">
          <div>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label
                  for="firstname"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Firstname</label
                >
                <div class="mt-2">
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    autocomplete="email"
                    required=""
                    v-model="firstname"
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  for="lastname"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Lastname</label
                >
                <div class="mt-2">
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    autocomplete="email"
                    required=""
                    v-model="lastname"
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  for="lastname"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >City</label
                >
                <div class="mt-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autocomplete="city"
                    required=""
                    v-model="city"
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label
                  for="role"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Role</label
                >
                <div class="mt-2">
                  <select
                    id="role"
                    name="role"
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    v-model="role"
                  >
                    <option value="customer">Customer</option>
                    <option value="driver">Driver</option>
                  </select>
                </div>
              </div>

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
              <div>
                <label
                  for="password_confirmation"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Password Confirmation</label
                >
                <div class="mt-2">
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    autocomplete="current-password"
                    required=""
                    v-model="password_confirmation"
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      role: "customer",
      password: "",
      password_confirmation: "",
      city: "",
      error_message: "",
    };
  },
  methods: {
    clearError() {
        this.error_message = ''
    },
    async submitForm() {
      const formData = {
        first_name: this.firstname,
        last_name: this.lastname,
        type: this.role,
        city: this.city,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      };
      console.log(formData);

      try {
        const response = await axios.post(
          "http://localhost:8081/register",
          formData
        );
        console.log("User registered:", response.data);
        this.$router.push("/login");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessage = error.response.data.message;
          console.error("Error registering user:", errorMessage);
          this.error_message = errorMessage
          // You can use errorMessage as needed, for example, display it in your UI
          // this.errorMessage = errorMessage;
        }
      }
    },
  },
};
</script>

<style>
.notification {
  display: inline-block;
  background-color: #ffcccc; /* Your desired background color */
  border: 1px solid #ff3333; /* Your desired border color */
  color: #cc0000; /* Your desired text color */
  padding: 10px;
  border-radius: 5px;
}

/* Define your transition */
.slide-fade-enter-active {
  transition: all 0.5s;
}
.slide-fade-leave-active {
  transition: all 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>