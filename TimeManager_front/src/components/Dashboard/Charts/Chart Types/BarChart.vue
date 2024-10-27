<script setup>
import { ref, onMounted, watch } from 'vue'
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

const barChart = ref(null);

onMounted(() => {
  const ctx = barChart.value.getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: props.data,
    options: { 
      ...props.options, 
      maintainAspectRatio: false,
      responsive: true,
    }
  });
});
// Watcher pour les modifications des données
watch(
  () => props.data,
  (newData) => {
    if (chartInstance) {
      chartInstance.data = newData;  
      chartInstance.update();        
    }
  },
  { deep: true }  
);

</script>

<template>
  <div class="chart-container">
    <canvas ref="barChart"></canvas>
  </div>
</template>

<style scoped>
@import '@css/chart-styles.css';

</style>
