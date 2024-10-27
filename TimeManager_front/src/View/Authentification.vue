<template>
  <div class="containerBlob">
    <div class="blob-c">
      <div class="shape-blob"></div>
      <div class="shape-blob one"></div>
      <div class="shape-blob two"></div>
      <div class="shape-blob three"></div>
      <div class="shape-blob four"></div>
      <div class="shape-blob five"></div>
      <div class="shape-blob six"></div>
    </div>

    <div class="absolute flex flex-row w-full items-center h-screen">
      <SignUpForm
        :formData="formData"
        :setFormData="setFormData"
        :togglePanel="togglePanel"
        :onSignUpSubmit="handleSubmitSignUp"
      />
      <LoginForm
        :formData="formData"
        :setFormData="setFormData"
        :togglePanel="togglePanel"
        :onLoginSubmit="handleSubmitLogin"
      />
      <TransitionPanel :isPanelOpen="isPanelOpen" />
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/Form/LoginForm.vue'
import SignUpForm from '@/components/Form/SignUpForm.vue'
import TransitionPanel from '@/components/TransitionPanel.vue'
import { useAuth } from '@/services/authService'
import { ref } from 'vue'

import '@/css/BlobBackground.css'

const isPanelOpen = ref(true)
const { formData, setFormData, handleSubmitSignUp, handleSubmitLogin } = useAuth()

const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value
}
</script>

<style scoped>
</style>
