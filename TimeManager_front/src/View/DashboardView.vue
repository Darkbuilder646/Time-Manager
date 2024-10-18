<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Header -->
    <Header></Header>
    <!-- Main Content -->
    <div class="flex flex-1">
      <!-- Sidebar Section -->
      <SectionNav :currentView="currentView" @changeView="setView" />
      
      <!-- Dashboard Content -->
      <div class="flex-1 pr-4 pb-4 pl-4 bg-gray-100">
        <Dashboard v-if="currentView === 'dashboard'" />
        <Teams v-if="currentView === 'teams'" />
        <Settings v-if="currentView === 'settings'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '@/components/Navigation/Header.vue';
import SectionNav from '@/components/Navigation/SectionNav.vue';
import Dashboard from '@/components/Dashboard/Dashboard.vue';
import Teams from '@/components/Dashboard/Teams.vue'
import Settings from '@/components/Dashboard/Settings.vue'

const currentView = ref('dashboard');

function setView(view) {
  currentView.value = view;
}

</script>

<style scoped></style>