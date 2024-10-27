<script setup>
import { ref, onMounted } from 'vue'
import userService from '@/services/userService'
import SettingsUserModal from '@/components/Modal/SettingsUserModal.vue';
import ConfirmationModal from '@/components/Modal/confirmationModal.vue';
import { useRouter } from 'vue-router';

// Variables réactives
const modalStates = ref({
  update: false,
  delete: false
})

const router = useRouter()

const isUserConnected = ref(false)
const selectedUser = ref('')
const users = ref([])
const newUser = ref({ username: '', email: '' })
const error = ref(null)

const updateUser = async (userId, userData) => {
  try {
    const { data } = await userService.updateUser(userId, userData)
    const index = users.value.findIndex(user => user.id === userId)
    if (index !== -1) {
      users.value[index] = data
    }
  } catch (err) {
    handleError("Erreur lors de la mise à jour de l'utilisateur.", err)
  }
};

const deleteUser = async (userId) => {
  try {
    await userService.deleteUser(userId)
    users.value = users.value.filter(user => user.id !== userId)
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    router.push("/auth")
  } catch (err) {
    handleError("Erreur lors de la suppression de l'utilisateur.", err)
  }
}

const toggleModal = (type) => {
  modalStates.value[type] = !modalStates.value[type]
}

const handleUpdate = (userData) => {
  if (localStorage.getItem('id')) {
    updateUser(localStorage.getItem('id'), userData)
  }
}

const handleDelete = () => {
  toggleModal('delete');
  const userId =localStorage.getItem('id')
  deleteUser(userId)
  selectedUser.value = '' 
  isUserConnected.value = false
}
</script>

<template>
  <div class="bg-white shadow rounded-2xl p-6 mb-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to the Settings</h1>
  </div>
  <div class="bg-white shadow rounded-2xl p-2 mb-4 flex justify-center items-center">
    <button
        @click.prevent="toggleModal('update')"
        class="flex flex-1 px-4 py-2 w-40 m-4 justify-center text-sm text-white hover:bg-blue-300 border rounded-lg bg-blue-500"
      >
        Update my profile
      </button>

      <button
        @click.prevent="toggleModal('delete')"
        class="flex flex-1 px-4 py-2 w-40 m-4 justify-center text-sm text-white hover:bg-red-300 border rounded-lg bg-red-600"
      >
        Delete account
      </button>

      <!-- For modal -->
      <SettingsUserModal
      :visible="modalStates.update"
      title="Update Profile"
      :usernamePlaceholder="'Enter your username'"
      :emailPlaceholder="'Enter your email' "
      :passwordPlaceholder="'Enter your password' "
      confirmButtonText="Update"
      @close="toggleModal('update')"
      :onConfirm="handleUpdate"
    />

    <ConfirmationModal
      :visible="modalStates.delete"
      title="Confirm Deletion"
      confirm-button-text="Delete"
      cancel-button-text="Cancel"
      @confirm="handleDelete"
      @cancel="toggleModal('delete')"
    />

  </div>

</template>
<style></style>
