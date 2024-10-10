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

const lineChart = ref(null);

onMounted(() => {
  const ctx = lineChart.value.getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: props.data,
    options: props.options,
  });
});

</script>

<template>
  <div>
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<style scoped>
.chart {
  position: relative;
}
</style>
