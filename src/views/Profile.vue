<template>
<div>
  <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
  <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />

  <section class="pt-16 bg-gradient-to-br from-blue-300 to-blue-500 h-screen" style="height: calc(100vh - 4rem)">
    <div class="w-full lg:w-4/12 px-4 mx-auto">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full px-4 flex justify-center">
              <div class="relative">
                <img
                  alt="User Image"
                  src="https://www.selectenglish.co.uk/wp-content/uploads/2022/11/no-user-image.gif"
                  class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
          </div>
          <div class="text-center mt-24">
            <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              <!-- User's Full Name -->
              {{ this.user.first_name + " " + this.user.last_name }}
            </h3>
            <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
              <!-- User's City -->
              {{ this.user.city }}
            </div>
            <div class="mb-2 text-blueGray-600 mt-10">
              <i class="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
              <!-- User's Email -->
              {{ this.user.email }}
            </div>
            <div class="mb-2 text-blueGray-600">
              <i class="fas fa-user mr-2 text-lg text-blueGray-400"></i>
              <!-- User's Role (Customer or Driver) -->
              {{ this.user.type == "customer" ? "Customer" : "Driver" }}
            </div>
          </div>
          <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-9/12 px-4">
                <div v-if="formDisplayed" class="mb-6">
                  <form @submit.prevent="submitForm">
                    <div class="mb-6">
                      <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                      <input v-model="firstname" type="text" id="first-name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Your first name" required>
                    </div>
                    <div class="mb-6">
                      <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                      <input v-model="lastname" type="text" id="last-name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Your last name" required>
                    </div>
                    <div class="mb-6">
                      <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                      <input v-model="city" type="text" id="city" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Your city" required>
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit profile</button>
                  </form>
                </div>
                <a v-if="!formDisplayed" @click="toggleForm" href="javascript:void(0);" class="block w-full max-w-xs mx-auto mb-4 font-normal text-pink-500">Edit profile</a>
                <a v-else href="javascript:void(0);" @click="toggleForm" class="block w-full max-w-xs mx-auto font-normal text-pink-500">Stop editing profile</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>


</template>

<script>
import axios from "axios";
import { getUser } from "../helpers/userService.js";
export default {
  data() {
    return {
      user: {},
      error_message: "",
      token: '',
      isUserLoggedIn: false,
      formDisplayed: false,
      firstname: '',
      lastname: '',
      city: '',
      error_message: ""
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
      this.firstname = user.user.first_name
      this.lastname = user.user.last_name
      this.city = user.user.city
      console.log(user)
      this.token = user.token
    }
  },
  methods: {
    toggleForm() {
      this.formDisplayed = !this.formDisplayed
    },
    async submitForm() {
      const formData = {
        first_name: this.firstname,
        last_name: this.lastname,
        city: this.city
      };

      try {
        const response = await axios.put(`http://localhost:8081/users/${this.user.id}`, formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        //console.log(response.data.data)
        this.user = response.data.data
      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    }
  }
}
</script>
