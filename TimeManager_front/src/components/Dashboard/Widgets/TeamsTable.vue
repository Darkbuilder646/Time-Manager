<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import { useWorkingTime } from '@/services/useWorkingTimeTeam'

const {
  TeamUserId,
  isUserSelected
} = useWorkingTime()

const API_URL = import.meta.env.VITE_API_URL + '/users'
// const teamMembers = ref([
//   {
//     id: '1',
//     username: 'John',
//   },
//   {
//     id: '2',
//     username: 'Jane',
//   },
//   {
//     id: '3',
//     username: 'Albert',
//   },
//   {
//     id: '4',
//     username: 'Emily',
//   }
// ])

const teams = ref([])

// Fonction pour récupérer les membres de l'équipe
const fetchTeamMembers = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/teams`)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des membres de l\'équipe')
    }
    const data = await response.json()
    
    teams.value = data.teams.map(team => ({
      team_id: team.team_id,
      name: team.name,
      users: team.users
      .filter(member => member.id !== localStorage.getItem('id')) // Créez un tableau d'objets utilisateur
    }));

  } catch (error) {
    console.error(error)
  }
}

// Appeler la fonction pour récupérer les membres lors du montage du composant
onMounted(() => {
  //const userId = '1' // Remplacez par l'ID de l'utilisateur actuel
  fetchTeamMembers(localStorage.getItem('id'))
})

const isManager = ref(localStorage.getItem('role') === 'manager')
const isTopManager = ref(localStorage.getItem('role') === 'topmanager')

const removeMember = (member) => {
  // Logique pour supprimer le membre
  console.log(`Membre supprimé : ${member.firstName} ${member.lastName} id : ${member.id}`)
}

const emit = defineEmits(['update-team-user-id'])

const loadTeamMemberInfos = (id) => {
  emit('update-team-user-id', id, true)
}
</script>

<template>
  <div class="max-h-56 overflow-auto">
    <div v-for="team in teams" :key="team.team_id">
      <h3 class="font-bold text-lg mt-4">{{ team.name }}</h3>
      <div v-for="(member, index) in team.users" :key="member.username" @click="loadTeamMemberInfos(member.id)">
        <div
          class="px-3 py-3 whitespace-nowrap flex items-center"
          :class="{ 'border-b': index !== team.users.length - 1 }"
        >
          <div class="flex flex-1 items-center">
            <div class="text-sm font-medium text-gray-900">
              {{ member.username }}
            </div>
          </div>

          <!-- <div v-if="isManager || isAdmin">
            <button
              @click="removeMember(member)"
              class="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white hover:bg-red-700"
            >
              <span class="text-sm font-bold">✕</span>
            </button>
          </div> -->
        </div>
      </div>
      <hr class="my-2" />
    </div>
  </div>
</template>
<style scoped></style>