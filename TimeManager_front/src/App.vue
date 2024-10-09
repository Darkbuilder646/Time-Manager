<script setup>
import Header from './components/Navigation/Header.vue'
import SectionNav from './components/Navigation/SectionNav.vue'
import DashboardOverview from './components/Dashboard/Overview.vue'

</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Header -->
    <Header></Header>
    <!-- Main Content -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <SectionNav />

      <!-- Dashboard -->
      <div class="flex-1 px-4 bg-gray-100">
        <DashboardOverview />
      </div>
    </div>
  </div>

    
</template>

<style scoped>

</style>
