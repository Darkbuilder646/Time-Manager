import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAuth } from '../../services/authService.js'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Mock axios
vi.mock('axios')

// Mock vue-router's useRouter
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

describe('useAuth service', () => {
  let auth
  let consoleErrorSpy
  let localStorageSpy

  beforeEach(() => {
    // Initialise le service avant chaque test
    auth = useAuth()

    // Mock console.error
    consoleErrorSpy = vi.spyOn(console, 'error')

    // Mock localStorage.setItem
    localStorageSpy = vi.spyOn(window.localStorage, 'setItem')

    // Reset mocks
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Restore console.error after each test
    consoleErrorSpy.mockRestore()
    localStorageSpy.mockRestore()
  })

  it('should set form data correctly', () => {
    const newData = { username: 'testuser', email: 'test@example.com', password: '123456' }
    auth.setFormData(newData)

    expect(auth.formData.username).toBe('testuser')
    expect(auth.formData.email).toBe('test@example.com')
    expect(auth.formData.password).toBe('123456')
  })

  it('should handle sign up successfully', async () => {
    // Simule une réponse d'API réussie
    axios.post.mockResolvedValue({
      data: {
        token: 'mock-token'
      }
    })

    const mockEvent = {
      preventDefault: vi.fn()
    }

    // Met à jour les données du formulaire
    auth.setFormData({
      username: 'testuser',
      email: 'test@example.com',
      password: '123456'
    })

    try {
      // Appelle la fonction de soumission d'inscription
      await auth.handleSubmitSignUp(mockEvent)

      // Vérifie que preventDefault a été appelé
      expect(mockEvent.preventDefault).toHaveBeenCalled()

      // Vérifie que l'API d'inscription a été appelée avec les bonnes données
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        {
          username: 'testuser',
          email: 'test@example.com',
          password: '123456'
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      // Vérifie que le token a été enregistré dans localStorage
      expect(localStorageSpy).toHaveBeenCalledWith('token', 'mock-token')

      // Vérifie que le router a redirigé vers la page d'accueil
      expect(mockPush).toHaveBeenCalledWith('/')
    } catch (error) {
      console.error("Erreur lors de l'exécution du test:", error)
    }
  })

  it('should handle login successfully', async () => {
    // Simule une réponse d'API réussie
    const mockApiResponse = {
      data: {
        token: 'mock-token'
      }
    }

    axios.post.mockResolvedValue(mockApiResponse)

    console.log('Mocked axios.post response:', mockApiResponse)

    const mockEvent = {
      preventDefault: vi.fn()
    }

    // Met à jour les données du formulaire
    auth.setFormData({
      email: 'test@example.com',
      password: '123456'
    })

    // Appelle la fonction de soumission de connexion
    await auth.handleSubmitLogin(mockEvent)

    console.log('Form data before submission:', auth.formData)

    try {
      // Appelle la fonction de soumission de connexion
      await auth.handleSubmitLogin(mockEvent)

      // Log après l'appel pour déboguer
      console.log('After handleSubmitLogin call')

      // Vérifie que localStorage.setItem est appelé avec le bon token
      expect(localStorageSpy).toHaveBeenCalledWith('token', 'mock-token')

      // Vérifie que le router redirige vers la page d'accueil
      expect(mockPush).toHaveBeenCalledWith('/')
    } catch (error) {
      console.error("Erreur lors de l'exécution du test:", error)
    }
  })

  it('should handle failed API call', async () => {
    // Simule une erreur d'API
    axios.post.mockRejectedValue(new Error('API error'))

    const mockEvent = {
      preventDefault: vi.fn()
    }

    // Met à jour les données du formulaire
    auth.setFormData({
      email: 'test@example.com',
      password: '123456'
    })

    // Appelle la fonction de soumission de connexion
    await auth.handleSubmitLogin(mockEvent)

    // Vérifie que l'erreur est capturée et loguée dans la console
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur lors de la requête:', expect.any(Error))

    // Vérifie que le router n'a pas redirigé
    expect(mockPush).not.toHaveBeenCalled()
  })
})
