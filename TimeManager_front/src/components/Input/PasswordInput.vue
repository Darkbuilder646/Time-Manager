<template>
  <div>
    <div class="flex items-center justify-between">
      <label class="text-base font-medium">{{ label }}</label>
      <button
        v-if="showForgotPassword"
        type="button"
        title="Forgot password?"
        class="text-sm font-medium text-violet-400 hover:text-violet-700 hover:underline"
      >
        Forgot password ?
      </button>
    </div>

    <div class="mt-2.5 relative text-txtPlaceholder">
      <div v-if="icon" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <slot name="icon"></slot>
      </div>

      <input
        :type="showPassword ? 'text' : 'password'"
        :placeholder="placeholder"
        class="block w-full py-4 pl-10 pr-14 text-black bg-light_bg border-2 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
        required
        v-model="inputValue"
        @input="emitChange"
      />

      <div
        class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
        @click="togglePasswordVisibility"
        data-testid="eye-icon"
      >
        <i class="fa" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  icon: { type: Boolean, default: false },
  showForgotPassword: { type: Boolean, default: false },
  value: { type: String, default: '' }
})

const emits = defineEmits(['update:value'])

const showPassword = ref(false)
const inputValue = ref(props.value)

const emitChange = (e) => {
  emits('update:value', e.target.value)
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>
