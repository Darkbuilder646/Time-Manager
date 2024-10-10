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
    options: props.options,
  })
})
</script>

<template>
  <div>
    <canvas ref="doughutChart"></canvas>
  </div>
</template>

<style scoped>
.chart {
  position: relative;
}
</style>
