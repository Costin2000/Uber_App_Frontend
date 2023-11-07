<template>
    <div>
        <notification :message="errorNotif" @clear="clearError" />
    <div class="bg-gradient-to-br from-blue-300 to-blue-500 ">
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
    </div>
    <div v-if="cars.length > 0" class="overflow-x-auto mt-4 px-4">
  <table class="min-w-full bg-white rounded-lg overflow-hidden border">
    <thead class="bg-gray-800 text-white">
      <tr>
        <th class="px-4 py-3 text-left w-1/4">Car</th>
        <th class="px-4 py-3 text-left w-1/4">Type</th>
        <th class="px-4 py-3 text-left w-1/4">Status</th>
        <th class="px-4 py-3 text-left w-1/4">Buttons</th>
      </tr>
    </thead>
    <tbody class="text-gray-700">
      <tr v-for="car in cars" :key="car.id" class="hover:bg-gray-100">
        <td class="border px-4 py-4 w-1/4">
          <a :href="'/car_requests/' + car.id" class="hover:text-blue-500">{{ car.car_name }}</a>
        </td>
        <td class="border px-4 py-4 w-1/4">{{ car.car_type }}</td>
        <td class="border px-4 py-4 w-1/4">
            <span v-if="car.active" class="text-green-600"
                  >In use</span
                >
            <span v-else class="text-red-600">Unused</span>
        </td>
        <td class="border px-4 py-4 w-1/4">
          <button @click="deleteCar(car.id, car.active)" class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring">Delete</button>
          <button @click="markAsActive(car.id)" class="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring ml-2">Mark as Active</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

      </div>
</template>

<script>
import axios from "axios";
import { getUser } from "../helpers/userService.js";
export default {
    data() {
    return {
      cars: [],
      user: {},
      token: "",
      isUserLoggedIn: false,
      error_message: "",
      errorNotif: ""
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
    await this.fetchCars();
  },
  methods: {
    async fetchCars() {
      try {
        const response = await axios.get(
          `http://localhost:8082/cars`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        //this.carRequests = response.data.data.car_requests;
        console.log(response.data.data);
        this.cars = response.data.data.cars
      } catch (error) {
        console.log(error);
        const errorMessage = error.response.data.message;
        this.error_message = errorMessage;
      }
    },
    async markAsActive(car_id) {
        try {
            for (let i = 0; i < this.cars.length; i++) {
                if(this.cars[i].active) {
                    const response = await axios.put(
                        `http://localhost:8082/cars/${this.cars[i].id}`,
                        {
                            active: false
                        },
                        {
                            headers: {
                            Authorization: `Bearer ${this.token}`
                            }
                        }
                    );
                }
            }

            const response = await axios.put(
                `http://localhost:8082/cars/${car_id}`,
                {
                    active: true
                },
                {
                    headers: {
                    Authorization: `Bearer ${this.token}`
                    }
                }
            );
            this.markCarActive(car_id)

            //this.carRequests = response.data.data.car_requests;
            console.log(response.data.data);
            //this.cars = response.data.data.cars
        } catch (error) {
            console.log(error);
            const errorMessage = error.response.data.message;
            this.error_message = errorMessage;
        }
    },
    markCarActive(car_id) {
        this.cars = this.cars.map(car => {
            if (car.id === car_id) {
                car.active = true
            } else {
                car.active = false
            }

            return car;
        });
    },
    async deleteCar(car_id, status) {
        if (status && this.cars.length > 1) {
            this.errorNotif = "Please set another car as active first"
        } else {
            try {
                const response = await axios.delete(
                    `http://localhost:8082/cars/${car_id}`,
                    {
                        headers: {
                        Authorization: `Bearer ${this.token}`,
                        },
                    }
                );
                
                this.removeCar(car_id)
            } catch (error) {
                console.log(error);
                const errorMessage = error.response.data.message;
                this.error_message = errorMessage;
            }
        }
    },
    async removeCar(car_id) {
        this.cars = this.cars.filter(car => {
            return car.id != car_id
        });
    },
    clearError() {
        this.errorNotif = ''
    }

    }
}
</script>
