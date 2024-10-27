<template>
  <div id="rightSide" class="flex-1">
    <section class="py-10 sm:py-16 lg:py-24">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Welcome Back!</h2>
          <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed">Login to your account</p>
        </div>
        <div class="relative max-w-md mx-auto mt-8 md:mt-16">
          <div class="overflow-hidden bg-light_bg rounded-md shadow-md">
            <div class="px-4 py-6 sm:px-8 sm:py-7">
              <form @submit.prevent="onLoginSubmit">
                <div class="space-y-5">
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
                      <i class="fa fa-user"></i>
                    </template>
                  </TextInput>
                  <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    :showForgotPassword="false"
                    :icon="true"
                    v-model="formData.password"
                    v-on:update:value="updateFormData('password', $event)"
                  >
                    <template #icon>
                      <i class="fa fa-lock"></i>
                    </template>
                  </PasswordInput>
                  <div>
                    <button
                      type="submit"
                      class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white bg-purple-500 border border-transparent rounded-md focus:outline-none"
                    >
                      Log in
                    </button>
                  </div>

                  <!-- <div class="text-center">
                    <p class="text-base">
                      Don't have an account?
                      <button
                        type="button"
                        @click="togglePanel"
                        class="font-medium text-violet-400 hover:text-violet-700 hover:underline"
                        data-testid="register-button"
                      >
                        Create a free account
                      </button>
                    </p>
                  </div> -->
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
    default: () => ({ email: '', password: '' })
  },
  onLoginSubmit: { type: Function, required: true },
  setFormData: { type: Function, required: true },
  togglePanel: { type: Function, required: true }
})

const updateFormData = (field, value) => {
  props.setFormData({ ...props.formData, [field]: value })
}
</script>
