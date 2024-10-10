<script setup>
import { ref } from 'vue'
import { Calendar } from 'v-calendar'
import 'v-calendar/style.css'
import WorkingTimeTable from './WorkingTimeTable.vue';

const date = ref(new Date())

const attrs = ref([
  {
    key: 'today',
    highlight: 'purple',
    dates: new Date()
  }
])
</script>

<template>
  <div class="bg-white shadow rounded-2xl p-6 mb-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
  </div>
  <div>
    <!-- Grid layout -->
    <div class="grid grid-rows-3 grid-cols-3 gap-6">
      <!-- Première ligne -->
      <div class="bg-light_bg shadow rounded-lg p-4">
        <p>Data / Chart 1</p>
      </div>
      <div class="bg-light_bg shadow rounded-lg p-4">Data / Chart 2</div>
      <div class="row-span-2 flex justify-center items-start bg-light_bg shadow rounded-lg p-4">
        <!-- <VCalendar :attributes="attributes" /> -->
        <Calendar expanded :attributes="attrs" :date="date" />
      </div>

      <!-- Deuxième ligne -->
      <div class="col-span-2 bg-light_bg shadow rounded-lg p-4">Data / Chart 3</div>

      <!-- Troisième ligne -->
      <div class="col-span-3 bg-light_bg shadow rounded-lg p-4">
        <WorkingTimeTable />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid > div {
  min-height: 200px; /*Applique la hauteur minimale à tous les enfants de la grille*/
}
</style>
