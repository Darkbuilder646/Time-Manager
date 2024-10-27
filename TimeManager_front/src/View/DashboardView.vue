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
        <TeamManagement v-if="currentView === 'teamManagement'"/>
        <UsersGestion v-if="currentView === 'userGestion'" />
        <Settings v-if="currentView === 'settings'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/Navigation/Header.vue';
import SectionNav from '@/components/Navigation/SectionNav.vue';
import Dashboard from '@/components/Dashboard/Dashboard.vue';
import TeamManagement from '@/components/Dashboard/TeamManagement.vue';
import UsersGestion from '@/components/Dashboard/UsersGestion.vue'
import Settings from '@/components/Dashboard/Settings.vue'

import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const API_URL = import.meta.env.VITE_API_URL

onMounted( async () => {
  if (localStorage.getItem("token") == null) {
    router.push('/auth')
  } else {
    try {
      const response = await axios.post(`${API_URL}/check_token`, {token: localStorage.getItem("token")}, {headers: { 'Content-Type': 'application/json' }});
    } catch (error) {
      console.error(error.response.data["errors"])
      router.push('/auth')
    }
  }
});

const currentView = ref('dashboard');

function setView(view) {
  currentView.value = view;
}
</script>

<style scoped></style>