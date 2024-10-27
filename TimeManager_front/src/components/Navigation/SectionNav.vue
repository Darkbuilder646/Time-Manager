<script setup>
import { defineEmits, defineProps } from 'vue'

const isManager = localStorage.getItem('role') !== 'employee'
const isTopManager = localStorage.getItem('role') === 'topmanager'

const emit = defineEmits(['changeView'])

const props = defineProps({
  currentView: {
    type: String,
    required: true
  }
})

isTopManager ? changeView('userGestion') : changeView('dashboard')

function changeView(view) {
  emit('changeView', view)
}
</script>

<template>
  <div
    class="w-64 sticky top-28 bg-light_bg rounded-2xl shadow ml-4 mb-4 text-black flex flex-col p-4"
    style="height: calc(100vh - 8rem)"
  >
    <nav>
      <ul>
        <li class="mb-4" v-if="!isTopManager">
          <button
            @click="changeView('dashboard')"
            :class="[
              'block py-2 px-4 font-semibold space-x-6 rounded-full w-full text-left',
              currentView === 'dashboard'
                ? 'bg-black text-white'
                : 'text-black bg-light_bg hover:bg-slate-200'
            ]"
          >
            <i class="fa-solid fa-chart-pie"></i>
            <span>Dashboard</span>
          </button>
        </li>
        <li class="mb-4" v-if="isManager">
          <button
            @click="changeView('teamManagement')"
            :class="[
              'block py-2 px-4 font-semibold space-x-6 rounded-full w-full text-left',
              currentView === 'teamManagement'
                ? 'bg-black text-white'
                : 'text-black bg-light_bg hover:bg-slate-200'
            ]"
          >
            <i class="fa-solid fa-clipboard-list"></i>
            <span>Team Gestion</span>
          </button>
        </li>
        <li class="mb-4" v-if="isTopManager">
          <button
            @click="changeView('userGestion')"
            :class="[
              'block py-2 px-4 font-semibold space-x-6 rounded-full w-full text-left',
              currentView === 'userGestion'
                ? 'bg-black text-white'
                : 'text-black bg-light_bg hover:bg-slate-200'
            ]"
          >
            <i class="fa-solid fa-user-group"></i>
            <span>Users Gestion</span>
          </button>
        </li>
        <li class="mb-4">
          <button
            @click="changeView('settings')"
            :class="[
              'block py-2 px-4 font-semibold space-x-6 rounded-full w-full text-left',
              currentView === 'settings'
                ? 'bg-black text-white'
                : 'text-black bg-light_bg hover:bg-slate-200'
            ]"
          >
            <i class="fa-solid fa-gear"></i>
            <span>Settings</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped></style>
