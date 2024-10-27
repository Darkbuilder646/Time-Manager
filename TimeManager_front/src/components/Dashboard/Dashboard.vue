<script setup>
import { ref, onMounted } from 'vue'
import moment from 'moment'
import { Calendar } from 'v-calendar'
import 'v-calendar/style.css'
import WorkingTimeTable from './Widgets/WorkingTimeTable.vue'
import ChartManager from './Charts/ChartManager.vue'
import TeamsTable from './Widgets/TeamsTable.vue'
import { useWorkingTime } from '@/services/useWorkingTime'

const {
  weekWorkingTimes,
  updateLineChart,
  updateDoughnutChart,
  updateBarChart,
  thisWeek,
  previousWeek,
  weekLater,
  getClocks,
  createWorkingTime,
  clocker,
  isWorking,
  weekHoursState,
  totalWeekHoursState,
  computedDate,
  chartKey
} = useWorkingTime()

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

//==================================================

// Data pour les graphiques
const dataBar = ref({
  labels: days,
  datasets: [
    {
      label: 'Hours Worked',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)'
      ],
      borderWidth: 1
    }
  ]
})

const doughnutData = ref({
  labels: ['On Time', 'Overtime', 'Absent'],
  datasets: [
    {
      label: 'Statut des utilisateurs',
      data: [],
      backgroundColor: ['#36A2EB', '#5ce65c', '#FF6384'],
      hoverOffset: 4
    }
  ]
})

const barData = ref({
  labels: days,
  datasets: [
    {
      label: 'On Time',
      data: [],
      backgroundColor: '#36A2EB'
    },
    {
      label: 'Overtime',
      data: [],
      backgroundColor: '#5ce65c'
    },
    {
      label: 'Absent',
      data: [],
      backgroundColor: '#FF6384'
    }
  ]
})

// For calendar
const start = new Date(moment(new Date()).startOf('week'))
const end = new Date(moment(new Date()).endOf('week'))

const updateCalendar = () => {
  const start = new Date(moment(computedDate.value).startOf('week'))
  const end = new Date(moment(computedDate.value).endOf('week'))

  attrs.value = [
    {
      key: 'today',
      highlight: 'purple',
      dates: {start, end}
    }
  ]
}

const attrs = ref([
  {
    key: 'today',
    highlight: 'purple',
    dates: {start, end}
  }
])

// Options pour les graphiques
const chartOptions = {
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: false,
      text: 'Exemple de graphique'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

const fetchWorkingTimes = async () => {
  const times = await weekWorkingTimes()
  updateLineChart(times, dataBar.value)

  const totalHoursState = totalWeekHoursState(weekHoursState(times))
  updateDoughnutChart(totalHoursState, doughnutData.value)

  const dailyHoursState = weekHoursState(times)
  updateBarChart(dailyHoursState, barData.value)

  updateCalendar()
}

onMounted(async () => {
  document.getElementById("thisWeekButton").addEventListener("click", async function() {
    thisWeek();
    await fetchWorkingTimes();
  });
  document.getElementById("previousWeekButton").addEventListener("click", async function() {
    previousWeek();
    await fetchWorkingTimes();
  });
  document.getElementById("nextWeekButton").addEventListener("click", async function() {
    weekLater();
    await fetchWorkingTimes();
  });
  await fetchWorkingTimes();
  await isWorking();
})
</script>

<template>
  <div class="bg-white shadow rounded-2xl p-6 mb-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
  </div>
  <div class="bg-white shadow rounded-2xl p-6 mb-4 flex justify-center items-center">
      <button @click="clocker()" class="" id="clockButton"></button>

  </div>
  <div class="bg-white shadow rounded-2xl p-6 mb-4 flex justify-center items-center">
    <button id="previousWeekButton" class="bg-white shadow rounded-2xl p-6 mb-4 bg-slate-100">
      See previous week
    </button>
    <button id="thisWeekButton" class="bg-white shadow rounded-2xl p-6 mb-4 ml-6 mr-6 bg-slate-100">
      This week working times
    </button>
    <button id="nextWeekButton" class="bg-white shadow rounded-2xl p-6 mb-4 bg-slate-100">
      See next week
    </button>        
  </div>
  <div>
    <!-- Grid layout -->
    <div class="grid grid-cols-3 gap-6">
      <!-- Première ligne -->
      <div class="bg-light_bg shadow rounded-lg p-4 h-[250px]">
        <div class="h-full">
          <p>Week Statistics</p>
          <ChartManager
            :key="chartKey"
            chart-type="doughnut"
            :data="doughnutData"
            :options="chartOptions"
            tailwind-style="h-[200px] w-full"
          />
        </div>
      </div>
      <div class="bg-light_bg shadow rounded-lg p-4 h-[250px]">
        <p>Daily Statistics</p>
        <ChartManager
          :key="chartKey"
          chart-type="bar"
          :data="barData"
          :options="chartOptions"
          tailwind-style="h-[200px] w-full"
        />
      </div>
      <div class="row-span-2 flex flex-col items-start bg-light_bg shadow rounded-lg p-4">
        <Calendar expanded :attributes="attrs" :date="date" />
        <div class="my-2 w-full">
          <p class="text-xl font-semibold">My Teams</p>
          <TeamsTable />
        </div>
      </div>

      <!-- Deuxième ligne -->
      <div class="col-span-2 bg-light_bg shadow rounded-lg p-4 h-[350px]">
        <div class="h-full">
          <p>Daily Hours Done</p>
          <ChartManager
            :key="chartKey"
            chart-type="line"
            :data="dataBar"
            :options="chartOptions"
            tailwind-style="h-[250px] w-full"
          />
        </div>
      </div>

      <!-- Troisième ligne -->
      <!-- <div class="col-span-3 bg-light_bg shadow rounded-lg p-4">
        <WorkingTimeTable />
      </div> -->
    </div>
  </div>
</template>

<style scoped></style>
