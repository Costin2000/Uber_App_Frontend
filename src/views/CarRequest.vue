<template>
  <div>
    <div v-if="error_message" class="flex justify-center items-center h-screen bg-blue-200">
      <div class="bg-blue-200 p-4 rounded-lg flex items-center shadow-md">
        <div class="bg-blue-500 rounded-l-lg p-4 flex items-center">
          <img src="https://static.vecteezy.com/system/resources/previews/013/489/288/original/traffic-jam-and-road-situation-concept-confused-sad-young-man-driver-sitting-in-car-in-traffic-jam-waiting-for-movement-feeling-tired-to-stay-in-one-place-illustration-vector.jpg" alt="Error Image" class="h-64 w-64 object-cover" />
        </div>
        <div class="p-4">
          <p class="text-lg font-bold">Error Encountered</p>
          <p class="text-base">{{ error_message }}</p>
        </div>
      </div>
    </div>
    
    <div class="flex items-center justify-center bg-gradient-to-br from-blue-300 to-blue-500" style="height: calc(100vh - 4rem);">
      <div v-if="carRequest" class="bg-white p-8 rounded-lg shadow-xl flex items-center max-w-5xl">
        <div class="flex flex-col flex-1">
          <div class="text-4xl font-bold mb-6 text-center text-blue-800">Car Request Details</div>
          <div class="flex items-center mb-6">
            <div class="w-32 font-semibold text-blue-800">Address:</div>
            <div class="flex-1 text-blue-900">{{ carRequest.address }}</div>
          </div>
          <div class="flex items-center mb-6">
            <div class="w-32 font-semibold text-blue-800">Car Type:</div>
            <div class="flex-1 text-blue-900">{{ carRequest.car_type }}</div>
          </div>
          <div class="flex items-center mb-6">
            <div class="w-32 font-semibold text-blue-800">City:</div>
            <div class="flex-1 text-blue-900">{{ carRequest.city }}</div>
          </div>
          <div v-if="!this.carRequest.car_id.Valid && carRequest.active" class="text-xl font-bold text-center mb-6 text-blue-700">
            A driver should accept the request soon
          </div>
          <div v-else-if="this.carRequest.car_id.Valid && carRequest.active" class="text-xl font-bold text-center mb-6 text-green-700">
            Car request accepted! The driver is on your way!
          </div>
          <div v-else class="text-xl font-bold text-center mb-6 text-green-700">
            The car request is not active anymore
          </div>
          <div v-if="car" class="flex items-center mb-6">
            <div class="w-32 font-semibold text-blue-800">Car model:</div>
            <div class="flex-1 text-blue-900">{{ car.car_name }}</div>
          </div>
          <div v-if="driver" class="flex items-center mb-6">
            <div class="w-32 font-semibold text-blue-800">Driver name:</div>
            <div class="flex-1 text-blue-900">{{ driver.first_name + " " + driver.last_name }}</div>
          </div>
          <div v-if="driver && !carRequest.active && carRequest.rating!==0 && carRequest.car_id" class="flex items-center mb-6">
            <div class="w-32 font-semibold text-blue-800">Given rating:</div>
            <div class="flex-1 text-blue-900">{{ carRequest.rating }}</div>
          </div>
          <button v-if="!requestAccepted && carRequest.active" class="bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none" @click="cancel_request">Cancel Request</button>
          <form v-if="!carRequest.active && carRequest.rating===0 && carRequest.car_id.Valid" @submit.prevent="submitRating">
            <div class="flex items-center mb-6">
              <div class="w-32 font-semibold text-blue-800">Rate the Driver:</div>
              <select v-model="selectedRating" id="rating" name="rating" class="block appearance-none w-fit bg-white border border-blue-500 text-blue-900 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-blue-600">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button type="submit" class="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none ml-4">Submit</button>
            </div>
          </form>

        </div>
        <img src="https://apex4-production.s3.eu-west-1.amazonaws.com/tenant_ff5dd0aaad1c44e6909d6ce92e6670c4/media/uploads/carsa-hp-we-make-it-easy.png" alt="Car Image" class="h-96 w-96 object-cover rounded-md ml-8">
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
      token: '',
      car: null,
      driver: null,
      selectedRating: '1', // to hold the selected rating
      ratings: [1, 2, 3, 4, 5], // an array of available ratings
      isUserLoggedIn: false,
    };
  },
  async beforeMount() {
    var user = getUser();
    if (!user) {
      this.isUserLoggedIn = false;
    } else {
      this.isUserLoggedIn = true;
      this.user = user.user
      this.token = user.token
    }
    await this.fetchCarRequest();
    if (this.carRequest.car_id.Valid === false) {
      this.startPolling();
    }
  },
  methods: {
    async fetchCarRequest() {
      const requestId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:8082/car_requests/${requestId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          }
        });
        this.carRequest = response.data.data; // Update the carRequest data
        if (this.carRequest.car_id.Valid === true) {
          this.requestAccepted = true
          this.fetchCar()
        }
        console.log(response.data.data)
      } catch (error) {
        const errorMessage = error.response.data.message;
        this.error_message = errorMessage
      }
    },
    async fetchCar() {
      try {
        const response = await axios.get(`http://localhost:8082/cars/${this.carRequest.car_id.Int64}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          }
        });
        console.log("Car:", response.data.data);
        this.car = response.data.data
        this.fetchDriver()
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          console.error("Error retrieving car:", errorMessage);
        }
      }
    },
    async fetchDriver() {
      try {
        const response = await axios.get(`http://localhost:8081/users/${this.car.user_id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          }
        });
        console.log("Driver:", response.data.data);
        this.driver = response.data.data
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          console.error("Error retrieving driver:", errorMessage);
        }
      }
    },
    startPolling() {
      this.polling = setInterval(() => {
        this.fetchCarRequest(); // Fetch updated car request
        if (this.carRequest.car_id.Valid === true) {
          this.requestAccepted = true
          console.log("AJUNGE")
          clearInterval(this.polling);
        }
      }, 5000); // Polling interval, e.g., every 5 seconds
    },
    async submitRating() {
      try {
        console.log('Selected Rating:', this.selectedRating);

        //const requestId = this.$route.params.id;
        await axios.put(`http://localhost:8082/car_requests/${this.carRequest.id}`, {
          rating: parseInt(this.selectedRating),   
          active: this.carRequest.active,
          car_id: this.carRequest.car_id.Int64,
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.carRequest.rating = this.selectedRating;
      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    },
    async cancel_request() {
      try {
        //const requestId = this.$route.params.id;
        await axios.put(`http://localhost:8082/car_requests/${this.carRequest.id}`, {
          rating: this.carRequest.rating,   
          active: false,
          car_id: null,
        }, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.carRequest.active = false;
      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    }

  },
  beforeUnmount() {
    clearInterval(this.polling); // Clear the interval when the component is unmounted
  },
}
</script>