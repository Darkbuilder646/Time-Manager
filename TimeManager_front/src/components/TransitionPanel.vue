<template>
  <div
    id="panelSlide"
    :class="[
      'absolute h-full w-1/2 z-10 bg-violet-400 transition-all duration-500 ease-in-out flex flex-col items-center justify-center gap-4',
      isPanelOpen ? 'translate-x-0 rounded-r-3xl' : 'translate-x-[100%] rounded-l-3xl'
    ]"
  >
    <div class="text-white font-semibold text-4xl">Time Manager</div>
    <!-- <LogoComponent :style="{ width: '124px', height: '124px' }" /> -->
    <div class="mt-8 text-white text-2xl">Project Epitech</div>
  </div>
</template>

<script setup>
const props = defineProps({
  isPanelOpen: Boolean
})

</script>
