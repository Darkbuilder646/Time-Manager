<script setup>
import { defineProps, ref, computed } from 'vue'
import DoughnutChart from './Chart Types/DoughnutChart.vue'
import BarChart from './Chart Types/BarChart.vue';
import PieChart from './Chart Types/PieChart.vue';
import LineChart from './Chart Types/LineChart.vue';
import PolarAreaChart from './Chart Types/PolarAreaChart.vue';
import RadarChart from './Chart Types/RadarChart.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Graphique',
  },
  chartType: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  tailwindStyle: {
    type: String,
    default: "",
  }
});

</script>

<template>
  <div :class="tailwindStyle">
    <DoughnutChart :data="data" :options="options" v-if="chartType === 'doughnut'"/>
    <BarChart :data="data" :options="options" v-if="chartType === 'bar'" />
    <PieChart :data="data" :options="options" v-if="chartType === 'pie'" />
    <LineChart :data="data" :options="options" v-if="chartType === 'line'" />
    <PolarAreaChart :data="data" :options="options" v-if="chartType === 'polarArea'" />
    <RadarChart :data="data" :options="options" v-if="chartType === 'radar'" />
  </div>
</template>

<style scoped>
</style>
