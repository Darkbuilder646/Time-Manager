<template>
  <div
    v-if="visible"
    class="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-20"
  >
    <div class="bg-white rounded-lg shadow-lg w-1/2 p-6 relative">
      <!-- Close Button -->
      <button @click="closeModal" class="absolute top-3 right-4 text-gray-400 hover:text-gray-600">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- Modal Header -->
      <h2 class="text-2xl font-semibold text-center mb-4">{{ title }}</h2>

      <!-- Username Input -->
      <div class="grid grid-cols-2 gap-2">
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
        <!-- Role Dropdown -->
        <div class="mb-4">
          <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            v-model="role"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            :disabled="false"
          >
            <option disabled value="">-- Select a role --</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <!-- Required Time Input -->
        <div class="mb-4">
          <label for="number" class="block text-sm font-medium text-gray-700">Required Time</label>
          <input
            id="number"
            v-model="minTime"
            type="number"
            :placeholder="minTimePlaceholder"
            min="0"
            max="24"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <!-- Password Input -->
        <div class="col-span-2">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Confirm password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          :placeholder="passwordPlaceholder"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <!-- Confirm Button -->
      <div class="flex justify-center mt-6 space-x-6">
        <button
          @click="confirmAction"
          class="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
        >
          {{ confirmButtonText }}
        </button>
        <button
          @click="closeModal"
          class="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
        >
          {{ cancelButtonText }}
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
  passwordPlaceholder: {
    type: String,
    default: 'Enter your password',
  },
  minTimePlaceholder: {
    type: String,
    default: '8h'
  },
  confirmButtonText: {
    type: String,
    default: 'Confirm'
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel'
  },
  userRole: {
    type: String,
    default: ''
  },
  onConfirm: Function
})

const emit = defineEmits(['close'])

const username = ref('')
const email = ref('')
const minTime = ref('')
const role = ref('')
const password = ref('')

// Ferme la modale
const closeModal = () => {
  emit('close')
}

const confirmAction = () => {
  if (password.value) {
    props.onConfirm({
      user: {
        username: username.value,
        email: email.value,
        role: role.value,
        time: minTime.value || 8,
        password: password.value,
      }
    })
    closeModal()
  } else {
    alert('Please fill your password')
  }
}

// Remet à zéro les inputs lors de l'ouverture
watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      username.value = ''
      email.value = ''
      role.value = props.userRole || ''
      minTime.value = 8
      password.value = ''
    }
  }
)
</script>

<style scoped></style>
