<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

const radarChart = ref(null);

onMounted(() => {
  const ctx = radarChart.value.getContext('2d');
  
  new Chart(ctx, {
    type: 'radar',
    data: props.data,
    options: { 
      ...props.options, 
      maintainAspectRatio: false,
      responsive: true,
    }
  });
});

</script>

<template>
  <div class="chart-container">
    <canvas ref="radarChart"></canvas>
  </div>
</template>

<style scoped>
@import '@css/chart-styles.css';
</style>
