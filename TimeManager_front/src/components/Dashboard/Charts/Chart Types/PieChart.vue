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

const pieChart = ref(null);

onMounted(() => {
  const ctx = pieChart.value.getContext('2d');
  
  new Chart(ctx, {
    type: 'pie',
    data: props.data,
    options: { 
      ...props.options, 
      maintainAspectRatio: false,
      responsive: true,
    }
  });
});

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
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<style scoped>
@import '@css/chart-styles.css';
</style>
