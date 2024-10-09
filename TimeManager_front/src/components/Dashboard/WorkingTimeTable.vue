<script setup>
import { ref } from 'vue';

// Sample data for testing
const members = ref([
  {
    firstName: 'John',
    lastName: 'Doe',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'On Time',
    clockIn: '08:00 AM',
    clockOut: '05:00 PM',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'Late',
    clockIn: '09:15 AM',
    clockOut: '05:00 PM',
  },
  {
    firstName: 'Albert',
    lastName: 'Cooper',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    status: 'On Time',
    clockIn: '08:05 AM',
    clockOut: '04:50 PM',
  },
  {
    firstName: 'Emily',
    lastName: 'White',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    status: 'Absent',
    clockIn: 'N/A',
    clockOut: 'N/A',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'On Time',
    clockIn: '08:00 AM',
    clockOut: '05:00 PM',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'Late',
    clockIn: '09:15 AM',
    clockOut: '05:00 PM',
  },
  {
    firstName: 'Albert',
    lastName: 'Cooper',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    status: 'On Time',
    clockIn: '08:05 AM',
    clockOut: '04:50 PM',
  },
  {
    firstName: 'Emily',
    lastName: 'White',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    status: 'Absent',
    clockIn: 'N/A',
    clockOut: 'N/A',
  },
]);

// Function to get the status class
const getStatusClass = (status) => {
  switch (status) {
    case 'On Time':
      return 'bg-green-100 text-green-800';
    case 'Late':
      return 'bg-yellow-100 text-yellow-800';
    case 'Absent':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
</script>

<template>
  <div class="max-h-60 overflow-auto mb-4">
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
            Status
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
        </tr>
      </thead>

      <!-- Body -->
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(member, index) in members" :key="index">
          <!-- Member Column with Photo + Name -->
          <td class="px-6 py-4 whitespace-nowrap flex items-center">
            <img class="w-10 h-10 rounded-full mr-4" :src="member.photo" alt="Member photo" />
            <div class="text-sm font-medium text-gray-900">
              {{ member.firstName }} {{ member.lastName }}
            </div>
          </td>

          <!-- Status Column -->
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              :class="getStatusClass(member.status)"
              class="px-3 py-1 rounded-full text-xs font-semibold"
            >
              {{ member.status }}
            </span>
          </td>

          <!-- Clock In Column -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ member.clockIn }}</div>
          </td>

          <!-- Clock Out Column -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ member.clockOut }}</div>
          </td>

          <!-- Required Time Column -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">8h</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Style pour garder l'en-tête visible lors du scroll vertical */
table {
  border-collapse: separate;
  border-spacing: 0;
}
thead th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
