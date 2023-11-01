<template>
  <div
    class="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center"
  >
    <div class="text-center text-white">
      <h1 class="text-5xl lg:text-6xl font-bold mb-4">
        Explore the World in Style
      </h1>
      <p class="text-lg lg:text-xl mb-6">
        Experience a new way to travel with our exceptional ride services.
      </p>
      <router-link
        to="/login"
        class="bg-white text-blue-600 font-bold py-3 px-6 rounded-full inline-block text-lg lg:text-xl hover:bg-opacity-80 transition duration-300"
        >Get Started</router-link
      >
    </div>
    <img
      src="/car.png"
      alt="Car Image"
      class="hidden lg:block absolute right-10 bottom-10 lg:static w-72 lg:w-96 max-w-xs lg:max-w-full transform rotate-6"
    />
  </div>
</template>

<script></script>
