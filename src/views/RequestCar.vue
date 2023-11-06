<template>
  <div
    class="flex justify-center items-center h-screen bg-cover"
    style="background-image: url('car3.jpg')"
  >
    <notification :message="error_message" @clear="clearError" />
    <div class="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-6 text-center">Request a Ride</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="carType" class="block font-medium mb-2">Car Type:</label>
          <select
            id="carType"
            v-model="rideRequest.car_type"
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
            v-model="rideRequest.city"
            required
            class="block w-full p-3 border border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block font-medium mb-2">Address:</label>
          <input
            type="text"
            id="address"
            v-model="rideRequest.address"
            required
            class="block w-full p-3 border border-gray-300 rounded focus:outline-none"
          />
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Request Ride
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
      rideRequest: {
        car_type: "normal",
        city: "",
        address: "",
      },
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
        car_type: this.rideRequest.car_type,
        city: this.rideRequest.city,
        address: this.rideRequest.address
      };
      console.log(formData);

      if (this.nrActiveCars > 0) {
        this.error_message = "You already have an active car request. Can't create another one."
        return
      }

      try {
        const response = await axios.post(
          'http://localhost:8082/car_requests',
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        );
        console.log("Car request:", response.data);
        this.$router.push(`/car_requests/${response.data.data.id}`);
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
    async fetchCarRequests() {
      const requestId = this.$route.params.id;
      try {
        const response = await axios.get(
          `http://localhost:8082/car_requests?user_id=${this.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.carRequests = response.data.data.car_requests;
        const activeCarRequests = this.carRequests.filter((car) => car.active);
        this.nrActiveCars = activeCarRequests.length;
        console.log("Nr active car requests: " + this.nrActiveCars)

        console.log(response.data.data);
      } catch (error) {
        console.log(error);
        const errorMessage = error.response.data.message;
        this.error_message = errorMessage;
      }
    }
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
    this.fetchCarRequests()
  }
};
</script>
