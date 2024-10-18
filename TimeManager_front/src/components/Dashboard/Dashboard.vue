<script setup>
import { ref, onMounted } from 'vue'
import { Calendar } from 'v-calendar'
import 'v-calendar/style.css'
import WorkingTimeTable from './Widgets/WorkingTimeTable.vue'
import ChartManager from './Charts/ChartManager.vue'
import TeamsTable from './Widgets/TeamsTable.vue'
import axios from 'axios';
import moment from 'moment';

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"]
const API_URL = import.meta.env.VITE_API_URL

var computedDate = ref(new Date())
var workedHours = []

const attrs = ref([
  {
    key: 'today',
    highlight: 'purple',
    dates: new Date()
  }
])

const isUserConnected = localStorage.getItem("id"); //! Hotfix 18/10/2024
//==================================================

// Test récup working times

const weekWorkingTimes = async () => {
  if(!isUserConnected) { return } //! Hotfix 18/10/2024
  const userId = localStorage.getItem("id");
  var startTime = moment(computedDate).startOf("week").add(1,'day').add(11,'hour').toISOString()
  var endTime = moment(computedDate).startOf("week").add(1,'day').add(19,'hour').toISOString()
  var times = []
  var workingTimes = {}

  for (let i = 0; i < 5; i++) {
    try {
      workingTimes[days[i]] = await axios.get(`${API_URL}/workingtime/${userId}?start=${startTime}&end=${endTime}`);
    } catch (error) {
      console.error("Erreur get workingtimes", error)
    }

    var totalMinutesDuration = 0
    for (const workingTime in workingTimes[days[i]].data) {
      totalMinutesDuration += moment(workingTimes[days[i]].data[workingTime]["end"]).diff(workingTimes[days[i]].data[workingTime]["start"],"minutes")
    }

    times.push(Math.floor(totalMinutesDuration/60)+(totalMinutesDuration%60)/60)
    startTime = moment(startTime).add(1,"day").toISOString()
    endTime = moment(endTime).add(1,"day").toISOString()
  }
  console.log(times)
}

const previousWeek = () => {
  computedDate = moment(computedDate).subtract(7,"days").toDate()
  weekWorkingTimes()
}
const weekLater = () => {
  computedDate = moment(computedDate).add(7,"days").toDate()
  weekWorkingTimes()
}

//==================================================

// Clocks

const getClocks = async () => {
  if(!isUserConnected) { return } //! Hotfix 18/10/2024
  try {
    const userId = localStorage.getItem("id");
    const response = await axios.get(`${API_URL}/clocks/${userId}`);
    console.log(response.data)
    return(response.data)
  } catch (error) {
    console.error("Erreur get workingtimes", error)
  }  
}

const isWorking = async () => {
  try {
    const clocks = await getClocks()
    console.log("Is working ? : ",clocks[clocks.length -1].status)
    if (!clocks[clocks.length -1].status) {
      createWorkingTime(clocks)
      document.getElementById("clockButton").textContent = "Clock In"
    } else {
      document.getElementById("clockButton").textContent = "Clock Out"
    }
  } catch {
    console.error("Erreur get workingtimes", error)
  }
}

const createWorkingTime = async (clocks) => {
  if(!isUserConnected) { return } //! Hotfix 18/10/2024
  const workingTimeStart = clocks[clocks.length -2].time
  const workingTimeEnd = clocks[clocks.length -1].time

  const newWorkingTime = {
    "workingtime": {
      "start": workingTimeStart,
      "end": workingTimeEnd
    }
  }
  console.log(newWorkingTime)
  try {
    const userId = localStorage.getItem("id");
    const response = await axios.post(`${API_URL}/workingtime/${userId}`, newWorkingTime)
  } catch (error) {
    console.error("Erreur get workingtimes", error)
  }
}

const clocker = async () => {
  if(!isUserConnected) { return } //! Hotfix 18/10/2024
  try {
    const userId = localStorage.getItem("id");
    const response = await axios.post(`${API_URL}/clocks/${userId}`);
    isWorking();
  } catch (error) {
    console.error("Erreur get workingtimes", error)
  }  
}

onMounted(() => {
  isWorking();
});

//==================================================

// Data pour le graphique
const chartData = {
  labels: ['On Time', 'Late', 'Absent'],
  datasets: [
    {
      label: 'Statut des utilisateurs',
      data: [10, 5, 2],
      backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      hoverOffset: 4
    }
  ]
}

const dataBar = {
  labels: days,
  datasets: [
    {
      label: 'Dataset',
      data: workedHours,
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
}

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
  }
}
</script>

<template>
  <div class="bg-white shadow rounded-2xl p-6 mb-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
    <div class="bg-white shadow rounded-2xl p-6 mb-4">
      <button @click="clocker()" class="bg-white shadow rounded-2xl p-6 mb-4" id="clockButton">{{clockButtonText}}</button>
    </div>
    <div class="bg-white shadow rounded-2xl p-6 mb-4">
      <button @click="previousWeek()" class="bg-white shadow rounded-2xl p-6 mb-4">See previous week</button>
      <button @click="weekWorkingTimes(date)" class="bg-white shadow rounded-2xl p-6 mb-4">This week working times</button>
      <button @click="weekLater()" class="bg-white shadow rounded-2xl p-6 mb-4">See next week</button>
    </div>
  </div>
  <div>
    <!-- Grid layout -->
    <div class="grid grid-cols-3 gap-6">
      <!-- Première ligne -->
      <div class="bg-light_bg shadow rounded-lg p-4 h-[250px]">
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
        <ChartManager 
          chart-type="bar"
          :data="dataBar"
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
      <div class="col-span-2 bg-light_bg shadow rounded-lg p-4 h-[300px]">
        <div class="h-full">
          <p>Grand graphique</p>
          <ChartManager
            chart-type="line"
            :data="dataBar"
            :options="chartOptions"
            tailwind-style="h-[250px] w-full"
          />
        </div>
      </div>

      <!-- Troisième ligne -->
      <div class="col-span-3 bg-light_bg shadow rounded-lg p-4">
        <WorkingTimeTable />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
