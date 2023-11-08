<template>
  <div>
    <notification :message="error_notif" @clear="clearError" />
    <div
      v-if="error_message"
      class="flex justify-center items-center h-screen bg-blue-200"
    >
      <div class="bg-blue-200 p-4 rounded-lg flex items-center shadow-md">
        <div class="bg-blue-500 rounded-l-lg p-4 flex items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/013/489/288/original/traffic-jam-and-road-situation-concept-confused-sad-young-man-driver-sitting-in-car-in-traffic-jam-waiting-for-movement-feeling-tired-to-stay-in-one-place-illustration-vector.jpg"
            alt="Error Image"
            class="h-64 w-64 object-cover"
          />
        </div>
        <div class="p-4">
          <p class="text-lg font-bold">Error Encountered</p>
          <p class="text-base">{{ error_message }}</p>
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-center bg-gradient-to-br from-blue-300 to-blue-500"
      style="height: calc(100vh - 4rem)"
    >
      <div
        v-if="carRequest"
        class="bg-white p-8 rounded-lg shadow-xl flex items-center max-w-5xl"
      >
        <div class="flex flex-col flex-1">
          <div class="text-4xl font-bold mb-6 text-center text-blue-800">
            Car Request Details
          </div>
          <div class="flex items-center mb-6">
            <div class="w-32 font-semibold text-blue-800">Address:</div>
            <div class="flex-1 text-blue-900">{{ carRequest.address }}</div>
          </div>
          <div class="flex items-center mb-6">
            <div class="w-32 font-semibold text-blue-800">Customer:</div>
            <div class="flex-1 text-blue-900">{{ carRequest.user_name }}</div>
          </div>
          <div class="flex items-center mb-6">
            <div class="w-32 font-semibold text-blue-800">Car Type:</div>
            <div class="flex-1 text-blue-900">{{ carRequest.car_type }}</div>
          </div>
          <div class="flex items-center mb-6">
            <div class="w-32 font-semibold text-blue-800">City:</div>
            <div class="flex-1 text-blue-900">{{ carRequest.city }}</div>
          </div>
          <div
            v-if="!requestAccepted && carRequest.active"
            class="text-xl font-bold text-center mb-6 text-blue-700"
          >
            Accept the request?
          </div>
          <div
            v-else
            class="text-xl font-bold text-center mb-6 text-blue-700"
          >
            The customer is waiting for you!
          </div>
          <button
            v-if="!requestAccepted && carRequest.active"
            class="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none"
            @click="accept_request"
          >
            Accept
          </button>
        </div>
        <img
          src="https://apex4-production.s3.eu-west-1.amazonaws.com/tenant_ff5dd0aaad1c44e6909d6ce92e6670c4/media/uploads/carsa-hp-we-make-it-easy.png"
          alt="Car Image"
          class="h-96 w-96 object-cover rounded-md ml-8"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getUser } from "../helpers/userService.js";
export default {
  data() {
    return {
      carRequest: null,
      user: {},
      requestAccepted: false,
      error_message: "",
      token: "",
      isUserLoggedIn: false,
      car: null,
      error_notif: "",
    };
  },
  async beforeMount() {
    var user = getUser();
    if (!user) {
      this.isUserLoggedIn = false;
    } else {
      this.isUserLoggedIn = true;
      this.user = user.user;
      this.token = user.token;
    }
    await this.fetchCarRequest();
    await this.fetchActiveCar();
  },
  methods: {
    clearError() {
      this.error_notif = "";
    },
    async fetchCarRequest() {
      const requestId = this.$route.params.id;
      try {
        const response = await axios.get(
          `http://localhost:8082/car_requests/${requestId}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.carRequest = response.data.data; // Update the carRequest data
        console.log(response.data.data);
      } catch (error) {
        const errorMessage = error.response.data.message;
        this.error_message = errorMessage;
      }
    },
    async fetchActiveCar() {
      try {
        const response = await axios.get(`http://localhost:8082/cars`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        //this.carRequests = response.data.data.car_requests;
        //console.log(response.data.data);
        var cars = response.data.data.cars;
        var active_cars = cars.filter((car) => {
          return car.active === true;
        });
        this.car = active_cars[0];
        console.log(active_cars[0]);
      } catch (error) {
        console.log(error);
        const errorMessage = error.response.data.message;
        this.error_message = errorMessage;
      }
    },
    async accept_request() {
      const put_data = {
        active: false,
        car_id: null,
        rating: 5,
      };
      if(!this.car) {
        this.error_notif = "You do not have a car in use"
        return
      }
      try {
        //const requestId = this.$route.params.id;
        await axios.put(`http://localhost:8082/car_requests/${this.carRequest.id}`, {
          rating: this.carRequest.rating,   
          active: false,
          car_id: this.car.id,
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.carRequest.active = false;
      } catch (error) {
        console.error('Error submitting rating:', error);
      }

    },
  },
};
</script>
