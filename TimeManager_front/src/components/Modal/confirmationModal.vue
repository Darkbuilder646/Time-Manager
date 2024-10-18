<template>
  <div
    v-if="visible"
    class="fixed inset-0 w-screen h-screen z-99 flex items-center justify-center bg-black bg-opacity-20"
  >
    <div class="bg-white flex flex-col items-center justify-center rounded-lg shadow-lg w-96 p-6 relative">
      <!-- Close Button -->
      <button @click="cancelAction" class="absolute top-3 right-4 text-gray-400 hover:text-gray-600">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- Modal Header -->
      <h2 class="text-2xl font-semibold text-center mb-4">{{ title }}</h2>

      <!-- Actions Button -->
      <div class="flex flex-row space-x-6 mt-6">
        <div class="flex justify-center">
          <button
            @click="confirmAction"
            class="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
          >
            {{ confirmButtonText }}
          </button>
        </div>

        <div class="flex justify-center">
          <button
            @click="cancelAction"
            class="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
          >
            {{ cancelButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  visible: Boolean,
  title: {
    type: String,
    required: true
  },
  confirmButtonText: {
    type: String,
    default: 'Confirm'
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const confirmAction = () => {
  emit('confirm')
}

const cancelAction = () => {
  emit('cancel')
}

</script>