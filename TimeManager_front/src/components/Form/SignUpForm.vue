<template>
  <div id="leftSide" class="flex-1">
    <section class="py-10 sm:py-16 lg:py-24">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Create free account
          </h2>
          <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed">
            You can create a free Time Manager account in 2 minutes
          </p>
        </div>
        <div class="relative max-w-md mx-auto mt-8 md:mt-16">
          <div class="overflow-hidden bg-white rounded-md shadow-md">
            <div class="px-4 py-6 sm:px-8 sm:py-7">
              <form @submit.prevent="onSignUpSubmit">
                <div class="space-y-5">
                  <TextInput
                    label="Username"
                    type="text"
                    placeholder="Enter your username"
                    isRequired
                    :icon="true"
                    v-model="formData.username"
                    v-on:update:value="updateFormData('username', $event)"
                  >
                    <template #icon>
                      <i class="fa fa-user"></i>
                    </template>
                  </TextInput>
                  <TextInput
                    label="Email address"
                    type="email"
                    placeholder="Enter your email"
                    isRequired
                    :icon="true"
                    v-model="formData.email"
                    v-on:update:value="updateFormData('email', $event)"
                  >
                    <template #icon>
                      <i class="fa fa-envelope"></i>
                    </template>
                  </TextInput>
                  <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    :icon="true"
                    :showForgotPassword="true"
                    v-model="formData.password"
                    v-on:update:value="updateFormData('password', $event)"
                  >
                    <template #icon>
                      <i class="fa fa-lock"></i>
                    </template>
                  </PasswordInput>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      name="agree"
                      id="agree"
                      required
                      class="w-5 h-5 text-green-400 bg-white border-gray-200 rounded"
                    />
                    <label for="agree" class="ml-3 text-sm font-medium text-gray-500">
                      I agree with
                      <span class="text-blue-600 hover:text-blue-700 hover:underline">
                        Terms of Service
                      </span>
                      and
                      <span class="text-blue-600 hover:text-blue-700 hover:underline">
                        Privacy Policy
                      </span>
                    </label>
                  </div>
                  <div>
                    <button
                      type="submit"
                      class="inline-flex items-center justify-center w-full p-4 text-base font-semibold text-white bg-purple-500 rounded-md"
                    >
                      Create account
                    </button>
                  </div>
                  <div class="text-center">
                    <p class="text-base">
                      Already have an account?
                      <button
                        type="button"
                        @click="togglePanel"
                        class="font-medium text-violet-400 hover:text-violet-700 hover:underline"
                        data-testid="login-button"
                      >
                        Login here
                      </button>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import TextInput from '../Input/TextInput.vue'
import PasswordInput from '../Input/PasswordInput.vue'

const props = defineProps({
  formData: {
    type: Object,
    required: true,
    default: () => ({ username: '', email: '', password: '' })
  },
  onSignUpSubmit: { type: Function, required: true },
  setFormData: { type: Function, required: true },
  togglePanel: { type: Function, required: true }
})

const updateFormData = (field, value) => {
  props.setFormData({ ...props.formData, [field]: value })
}
</script>
