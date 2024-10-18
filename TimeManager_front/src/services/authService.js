import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export function useAuth() {
  const formData = reactive({
    username: '',
    email: '',
    password: ''
  })

  const ENDPOINT = import.meta.env.VITE_API_URL + '/auth' //Check if it change
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

    console.log("Data SignUp :", data); //? Debug

    await handleCommonSubmit('register', data)
  }

  // Soumission du formulaire de connexion
  const handleSubmitLogin = async (e) => {
    e.preventDefault()

    const data = {
      email: formData.email,
      password: formData.password
    }

    console.log("Data Login :", data); //? Debug

    await handleCommonSubmit('login', data)
  }

  return {
    formData,
    setFormData,
    handleSubmitSignUp,
    handleSubmitLogin
  }
}
