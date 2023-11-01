<template>
  <transition name="slide-fade">
    <div v-if="message" class="notification absolute top-4 right-4">
      <span>{{ message }}</span>
      <button @click="clear" class="ml-2">&times;</button>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['message'],
  methods: {
    clear() {
      this.$emit('clear');
    }
  }
}
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