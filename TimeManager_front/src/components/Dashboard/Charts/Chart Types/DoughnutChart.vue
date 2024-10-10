<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  options: {
    type: Object,
    default: () => ({}),
  },
})

const doughutChart = ref(null)

onMounted(() => {
  const ctx = doughutChart.value.getContext('2d')

  new Chart(ctx, {
    type: 'doughnut',
    data: props.data,
    options: { 
      ...props.options, 
      maintainAspectRatio: false,
      responsive: true,
    }

  })
})
</script>

<template>
  <div class="chart-container">
    <canvas height="250px" ref="doughutChart"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;  /* Prend 100% de la largeur du parent */
  height: 100%; /* Prend 100% de la hauteur du parent */
}
canvas {
  width: 100% !important;  /* Le canvas s'adapte à 100% de la largeur */
  height: 100% !important; /* Le canvas s'adapte à 100% de la hauteur */
}
</style>
