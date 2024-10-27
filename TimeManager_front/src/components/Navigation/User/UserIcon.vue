<script setup>
import { ref, onMounted } from 'vue'
import userService from '@/services/userService'
import UserModal from '@/components/Modal/UserModal.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

// Variables réactives
const isOpen = ref(false)
const modalStates = ref({
  signIn: false,
  login: false,
  update: false,
  delete: false,
})

const isUserConnected = ref(false)
const selectedUser = ref('')
const users = ref([])
const newUser = ref({ username: '', email: '' })
const error = ref(null)

const fetchUsers = async () => {
  try {
    const { data } = await userService.getAllUsers()
    users.value = data
  } catch (err) {
    handleError('Erreur lors de la récupération des utilisateurs.', err)
  }
}

const createUser = async (userData) => {
  try {
    const { data } = await userService.createUser(userData)
    users.value.push(data)
    // Id in the local storage
    localStorage.setItem('userId', data.id)
    // connected user
    selectedUser.value = data
    isUserConnected.value = true
    resetNewUser()
  } catch (err) {
    handleError("Erreur lors de la création de l'utilisateur.", err)
  }
}

const handleError = (message, err) => {
  error.value = message
  console.error(err)
}

const resetNewUser = () => {
  newUser.value = { username: '', email: '' }
}

const toggleModal = (type) => {
  modalStates.value[type] = !modalStates.value[type]
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleSignIn = (userData) => {
  createUser(userData)
}

const handleLogout = () => {
  localStorage.removeItem('id');
  localStorage.removeItem('token');
  router.push("/auth")
}

onMounted(async () => {
  const userId = localStorage.getItem('userId')

  if (userId) {
    try {
      const { data } = await userService.getUserById(userId)
      selectedUser.value = data
      isUserConnected.value = true
    } catch (err) {
      handleError("Erreur lors de la récupération de l'utilisateur.", err)
      localStorage.removeItem('userId')
    }
  }

  fetchUsers()
})
</script>
<template>
  <div class="relative">
    <button @click="toggleDropdown" class="focus:outline-none">
      <img src="https://via.placeholder.com/40" alt="User" class="w-10 h-10 rounded-full" />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute flex flex-col right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2"
    >
      <button
        @click.prevent="handleLogout"
        class="flex flex-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </button>
      <!-- <button
        @click.prevent="toggleModal('signIn')"
        class="flex flex-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Register
      </button> -->

    </div>

    <!-- For modal -->
    <UserModal
      :visible="modalStates.signIn"
      title="Sign In"
      username-placeholder="Enter your username"
      email-placeholder="Enter your email"
      confirm-button-text="Sign In"
      @close="toggleModal('signIn')"
      @confirm="handleSignIn"
    />
  </div>
</template>

<style scoped></style>
