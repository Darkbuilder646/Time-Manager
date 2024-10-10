<script setup>
import { ref } from 'vue'
import { Calendar } from 'v-calendar'
import 'v-calendar/style.css'
import WorkingTimeTable from './Widgets/WorkingTimeTable.vue'
import ChartManager from './Charts/ChartManager.vue'

const date = ref(new Date())

const attrs = ref([
  {
    key: 'today',
    highlight: 'purple',
    dates: new Date()
  }
])

// Data pour le graphique
const chartData = {
  labels: ['On Time', 'Late', 'Absent'],
  datasets: [
    {
      label: 'Statut des utilisateurs',
      data: [10, 5, 2],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      hoverOffset: 4
    }
  ]
}

const dataBar = {
  labels: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }
  ]
}

// Options pour les graphiques
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: false,
      text: 'Exemple de graphique'
    }
  }
}
</script>

<template>
  <div class="bg-white shadow rounded-2xl p-6 mb-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
  </div>
  <div>
    <!-- Grid layout -->
    <div class="grid grid-rows-3 grid-cols-3 gap-6">
      <!-- Première ligne -->
      <div class="bg-light_bg shadow rounded-lg p-4 h-[250px] ">
        <div class="h-full">
          <p>Statut des utilisateurs</p>
          <ChartManager
            chart-type="doughnut"
            :data="chartData"
            :options="chartOptions"
            tailwind-style="h-[200px] w-full"
          />
        </div>
      </div>
      <div class="bg-light_bg shadow rounded-lg p-4 h-[250px]">
        <p>Autre graphique</p>
      </div>
      <div class="row-span-2 flex justify-center items-start bg-light_bg shadow rounded-lg p-4">
        <Calendar expanded :attributes="attrs" :date="date" />
      </div>

      <!-- Deuxième ligne -->
      <div class="col-span-2 bg-light_bg shadow rounded-lg p-4">
        <p>Grand graphique</p>
        <ChartManager chart-type="bar" :data="dataBar" :options="chartOptions" tailwind-style="" />
      </div>
      <!-- Troisième ligne -->
      <div class="col-span-3 bg-light_bg shadow rounded-lg p-4">
        <WorkingTimeTable />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .grid > div {
  max-height: 200px; 
} */
</style>
