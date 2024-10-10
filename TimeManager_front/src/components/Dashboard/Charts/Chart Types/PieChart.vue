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

const pieChart = ref(null);

onMounted(() => {
  const ctx = pieChart.value.getContext('2d');
  
  new Chart(ctx, {
    type: 'pie',
    data: props.data,
    options: props.options,
  });
});

</script>

<template>
  <div>
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<style scoped>
.chart {
  position: relative;
}
</style>
