<template>
  <div
    class="bg-gradient-to-br from-blue-300 to-blue-500 "
  >
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
    <div class="bg-gradient-to-br from-blue-300 to-blue-500 h-screen" style="height: calc(100vh - 4rem)">
      <div v-if="carRequests.length > 0" class="overflow-x-auto mt-4 px-4">
        <table class="min-w-full bg-white rounded-lg overflow-hidden border">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="px-6 py-3 text-left">Address</th>
              <th class="px-6 py-3 text-left">Status</th>
              <th class="px-6 py-3 text-left">Car Type</th>
              <th class="px-6 py-3 text-left">Rating</th>
              <th class="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              v-for="car in carRequests"
              :key="car.id"
              class="hover:bg-gray-100"
            >
              <td class="border px-6 py-4">
                <a
                  :href="'/car_requests/' + car.id"
                  class="hover:text-blue-500"
                  >{{ car.address }}</a
                >
              </td>
              <td class="border py-2 px-4">
                <span v-if="car.active" class="text-yellow-600"
                  >In Progress</span
                >
                <span v-else-if="car.car_id.Valid" class="text-green-600"
                  >Finalized</span
                >
                <span v-else class="text-red-600">Finalized</span>
              </td>
              <td class="border px-6 py-4">{{ car.car_type }}</td>
              <td class="border px-6 py-4">
                {{ car.rating === 0 ? "Not Rated" : car.rating }}
              </td>
              <td class="border px-6 py-4">{{ formatDate(car.created_at) }}</td>
            </tr>
          </tbody>
        </table>
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
      carRequests: [],
      user: {},
      token: "",
      isUserLoggedIn: false,
      error_message: "",
    };
  },
  async beforeMount() {
    // Check if the user is logged in
    var user = getUser();
    if (!user) {
      this.isUserLoggedIn = false;
    } else {
      this.isUserLoggedIn = true;
      this.user = user.user;
      this.token = user.token;
      console.log(user.user);
    }
    await this.fetchCarRequests();
  },
  methods: {
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
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
        const errorMessage = error.response.data.message;
        this.error_message = errorMessage;
      }
    },
    formatDate(dateTime) {
      const date = new Date(dateTime);
      const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      return formattedDate;
    },
  },
};
</script>
