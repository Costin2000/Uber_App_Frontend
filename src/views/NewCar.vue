<template>
    <div
      class="flex justify-center items-center h-screen bg-cover"
      style="background-image: url('car3.jpg')"
    >
      <notification :message="error_message" @clear="clearError" />
      <div class="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold mb-6 text-center">New Car</h1>
        <form @submit.prevent="submitForm">
        <div class="mb-4">
            <label for="model" class="block font-medium mb-2">Model:</label>
            <input
              type="text"
              id="model"
              v-model="model"
              required
              class="block w-full p-3 border border-gray-300 rounded focus:outline-none"
            />
          </div>
          <div class="mb-4">
            <label for="carType" class="block font-medium mb-2">Car Type:</label>
            <select
              id="carType"
              v-model="car_type"
              class="block w-full p-3 border border-gray-300 rounded focus:outline-none"
            >
              <option value="normal">Normal</option>
              <option value="lux">Lux</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="city" class="block font-medium mb-2">City:</label>
            <input
              type="text"
              id="city"
              v-model="city"
              required
              class="block w-full p-3 border border-gray-300 rounded focus:outline-none"
            />
          </div>
          <div class="text-center">
            <button
              type="submit"
              class="bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-700 transition duration-300"
            >
              Create Car
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { getUser } from "../helpers/userService.js";
  export default {
    data() {
      return {
        car_type: "normal",
        city: "",
        model: "",
        user: {},
        error_message: "",
        token: '',
        carRequests: [],
        nrActiveCars: 0
      };
    },
    methods: {
      clearError() {
          this.error_message = ''
      },
      async submitForm() {
        const formData = {
          car_type: this.car_type,
          city: this.city,
          car_name: this.model
        };
        console.log(formData);
  
        try {
          const response = await axios.post(
            'http://localhost:8082/cars',
            formData,
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          );
          this.$router.push(`/my_cars`);
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
    beforeMount() {
      // Check if the user is logged in
      var user = getUser();
      if (!user) {
        this.isUserLoggedIn = false;
      } else {
        this.isUserLoggedIn = true;
        this.user = user.user
        this.token = user.token
      }
    }
  };
  </script>
  