<script setup>
import UserIcon from './User/UserIcon.vue'
</script>

<template>
  <div class="sticky top-0 z-50 backdrop-blur-lg bg-opacity-85">
    <header class="bg-white border-b rounded-2xl shadow p-4 m-4 flex justify-between items-center">
      <!-- Logo -->
      <div class="text-xl font-bold">Time Manager</div>
      <!-- User Icon -->
      <UserIcon />
    </header>
  </div>
</template>

<style scoped></style>
