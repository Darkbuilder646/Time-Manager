<script setup>
import { ref } from 'vue'
import UserRow from './Row/UserRow.vue'
import UserModal from '../Modal/UserModal.vue'
import ConfirmationModal from '../Modal/confirmationModal.vue'
import fakeUser from '@/assets/fakeUsers'
import userService from '@/services/userService'

const users = ref(fakeUser)
const selectedUser = ref(null)
const canEdit = ref(false)
const modalStates = ref({
  update: false,
  delete: false,
})

const switchEditMod = () => {
  canEdit.value = !canEdit.value
}

const openEditModal = (user) => {
  selectedUser.value = user
  toggleModal('update') 
}

const openDeleteModal = (user) => {
  selectedUser.value = user
  toggleModal('delete') 
}

const updateUser = (updatedData) => {
  // Logique pour mettre à jour l'utilisateur
  console.log('Updated user:', updatedData)
}

const deleteUser = (deleteData) => {
  // Logique pour delete l'utilisateur
  console.log('Delete user:', deleteData)
  toggleModal('delete') 
}

const toggleModal = (type) => {
  modalStates.value[type] = !modalStates.value[type]
}

</script>

<template>
  <div class="flex justify-end mb-4 space-x-4">
    <Button class="bg-light_primary_100 text-white py-2 px-4 font-semibold space-x-6 rounded-lg"
      >Add User</Button
    >
    <Button
      @click="switchEditMod"
      class="bg-light_primary_100 text-white py-2 px-4 font-semibold space-x-6 rounded-lg"
      >Edit User</Button
    >
  </div>
  <div class="max-h-[400px] overflow-auto mb-4">
    <table class="min-w-full table-auto bg-white shadow-lg rounded-lg">
      <!-- Header -->
      <thead class="bg-gray-100 sticky top-0">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
          >
            Member
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
          >
            Role
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
          >
            Clock In
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
          >
            Clock Out
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
          >
            Required Time
          </th>
          <th
            v-if="canEdit"
            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
          >
            Edit
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <UserRow 
            :user="user" 
            :key="user.id" 
            :is-editing="canEdit" 
            @edit="openEditModal" 
            @delete="openDeleteModal"
          />
        </tr>
      </tbody>
    </table>
  </div>
  <UserModal 
    :visible="modalStates.update" 
    title="Edit User" 
    :usernamePlaceholder="selectedUser?.firstName"
    :emailPlaceholder="selectedUser?.lastName"
    :onConfirm="updateUser"
    @close="toggleModal('update')" 
  />
  <ConfirmationModal 
    :visible="modalStates.delete"
    title="Confirmation Deletion"
    confirm-button-text="Delete"
    cancel-button-text="Cancel"
    @confirm="deleteUser"
    @cancel="toggleModal('delete')"
  />
</template>

<style scoped></style>
