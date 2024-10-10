<script setup>
import { ref } from 'vue'

const teamMembers = ref([
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    photo: 'https://randomuser.me/api/portraits/men/5.jpg'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: '3',
    firstName: 'Albert',
    lastName: 'Cooper',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'White',
    photo: 'https://randomuser.me/api/portraits/women/6.jpg'
  }
])

const isManager = ref(false)
const isAdmin = ref(true)

const removeMember = (member) => {
  // Logique pour supprimer le membre
  console.log(`Membre supprimé : ${member.firstName} ${member.lastName} id : ${member.id}`)
}
</script>
<template>
  <div class="max-h-56 overflow-auto">
    <div v-for="(member, index) in teamMembers" :key="index">
      <div
        class="px-3 py-3 whitespace-nowrap flex items-center"
        :class="{ 'border-b': index !== teamMembers.length - 1 }"
      >
        <!-- Informations sur le membre -->
        <div class="flex flex-1 items-center">
          <img class="w-10 h-10 rounded-full mr-4" :src="member.photo" alt="Member photo" />
          <div class="text-sm font-medium text-gray-900">
            {{ member.firstName }} {{ member.lastName }}
          </div>
        </div>

        <!-- Bouton de suppression (visible uniquement si isManager ou isAdmin) -->
        <div v-if="isManager || isAdmin">
          <button
            @click="removeMember(member)"
            class="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white hover:bg-red-700"
          >
            <span class="text-sm font-bold">✕</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
