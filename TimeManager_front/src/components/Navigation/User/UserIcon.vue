<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleDropdown = () => {
  console.log('dropwdown')
  isOpen.value = !isOpen.value
}
</script>
<template>
    <div class="relative ">
      <button @click="toggleDropdown" class="focus:outline-none">
        <img src="https://via.placeholder.com/40" alt="User" class="w-10 h-10 rounded-full" />
      </button>

      <div v-if="isOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
      </div>
    </div>
</template>