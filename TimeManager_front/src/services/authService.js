import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export function useAuth() {
  const formData = reactive({
    username: '',
    email: '',
    password: ''
  })

  const ENDPOINT = import.meta.env.VITE_API_URL //Check if it change
  const router = useRouter()

  const setFormData = (newData) => {
    formData.username = newData.username || formData.username
    formData.email = newData.email || formData.email
    formData.password = newData.password || formData.password
  }

  const handleCommonSubmit = async (url, data) => {
    try {
      const response = await axios.post(`${ENDPOINT}/${url}`, data, {
        headers: { 'Content-Type': 'application/json' }
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('id', response.data.id)
      localStorage.setItem('role', response.data.role)

      router.push('/')
    } catch (error) {
      console.error('Erreur lors de la requête:', error)
    }
  }

  const handleSubmitSignUp = async (e) => {
    e.preventDefault()

    const data = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }

    await handleCommonSubmit('register', data)
  }

  // Soumission du formulaire de connexion
  const handleSubmitLogin = async (e) => {
    e.preventDefault()

    const data = {
      email: formData.email,
      password: formData.password
    }

    await handleCommonSubmit('login', data)
  }

  return {
    formData,
    setFormData,
    handleSubmitSignUp,
    handleSubmitLogin
  }
}
