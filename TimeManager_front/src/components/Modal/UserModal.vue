<template>
  <div
    v-if="visible"
    class="fixed inset-0 w-screen h-screen z-99 flex items-center justify-center bg-black bg-opacity-20"
  >
    <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative">
      <!-- Close Button -->
      <button @click="closeModal" class="absolute top-3 right-4 text-gray-400 hover:text-gray-600">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- Modal Header -->
      <h2 class="text-2xl font-semibold text-center mb-4">{{ title }}</h2>

      <!-- Username Input -->
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          :placeholder="usernamePlaceholder"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <!-- Email Input -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          :placeholder="emailPlaceholder"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <!-- Confirm Button -->
      <div class="flex justify-center mt-6">
        <button
          @click="confirmAction"
          class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
        >
          {{ confirmButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  title: {
    type: String,
    required: true
  },
  usernamePlaceholder: {
    type: String,
    default: 'Enter username'
  },
  emailPlaceholder: {
    type: String,
    default: 'Enter email'
  },
  confirmButtonText: {
    type: String,
    default: 'Confirm'
  },
  onConfirm: Function 
})

const emit = defineEmits(['close'])

const username = ref('')
const email = ref('')

// Ferme la modale
const closeModal = () => {
  emit('close')
}

// Confirme l'action (par exemple créer un utilisateur ou se connecter)
const confirmAction = () => {
  if (username.value && email.value) {
    props.onConfirm({ user: { username: username.value, email: email.value } })
    closeModal()
  } else {
    alert('Please fill out both fields')
  }
}

// Remet à zéro les inputs lors de l'ouverture
watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      username.value = ''
      email.value = ''
    }
  }
)
</script>

<style scoped>
</style>
