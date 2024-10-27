<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit', 'delete'])

const editUser = () => {
  emit('edit', props.user)
}

const deleteUser = () => {
  emit('delete', props.user)
}

const getRoleClass = (role) => {
  switch (role) {
    case 'employe':
      return 'bg-green-100 text-green-800'
    case 'manager':
      return 'bg-yellow-100 text-yellow-800'
    case 'admin':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <td class="px-6 py-4 whitespace-nowrap flex items-center border-b">
    <img class="w-10 h-10 rounded-full mr-4" :src="user.photo" alt="Member photo" />
    <div class="text-sm font-medium text-gray-900">{{ user.username }}</div>
  </td>

  <!-- Role Column -->
  <td class="px-3 py-4 whitespace-nowrap border-b">
    <span :class="getRoleClass(user.role)" class="px-3 py-1 rounded-full text-xs font-bold">
      {{ user.role }}
    </span>
  </td>

  <!-- Clock In Column -->
  <td class="px-6 py-4 whitespace-nowrap border-b">
    <div class="text-sm text-gray-900">{{ user.clockIn }}</div>
  </td>

  <!-- Clock Out Column -->
  <td class="px-6 py-4 whitespace-nowrap border-b">
    <div class="text-sm text-gray-900">{{ user.clockOut }}</div>
  </td>

  <!-- Required Time Column -->
  <td class="px-6 py-4 whitespace-nowrap border-b">
    <div class="text-sm text-gray-900">8h</div>
  </td>

  <td v-if="isEditing" class="px-6 py-4 whitespace-nowrap border-b">
    <div class="flex space-x-2">
      <button
        class="flex items-center justify-center w-6 h-6 rounded-md bg-green-500 text-white hover:bg-green-700"
        @click="editUser"
      >
        <i class="fa fa-pencil"></i>
      </button>
      <button
        v-if="user.role != 'admin'"
        class="flex items-center justify-center w-6 h-6 rounded-md bg-red-500 text-white hover:bg-red-700"
        @click="deleteUser"
      >
        <i class="fa fa-times"></i>
      </button>
    </div>
  </td>
</template>

<style scoped></style>
