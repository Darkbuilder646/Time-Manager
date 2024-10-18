import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import SignUpForm from '../Form/SignUpForm.vue'
import TextInput from '../Input/TextInput.vue'
import PasswordInput from '../Input/PasswordInput.vue'

describe('SignUpForm.vue', () => {
  const formData = {
    username: '',
    email: '',
    password: ''
  }

  const setFormDataMock = vi.fn()
  const onSignUpSubmitMock = vi.fn()
  const togglePanelMock = vi.fn()

  const wrapperFactory = (overrides = {}) => {
    return mount(SignUpForm, {
      props: {
        formData,
        setFormData: setFormDataMock,
        onSignUpSubmit: onSignUpSubmitMock,
        togglePanel: togglePanelMock,
        ...overrides
      },
      global: {
        stubs: {
          TextInput,
          PasswordInput
        }
      }
    })
  }

  it('renders the form with username, email, and password inputs', () => {
    const wrapper = wrapperFactory()

    // Vérifie que les champs TextInput et PasswordInput sont rendus
    expect(wrapper.findComponent(TextInput).exists()).toBe(true)
    expect(wrapper.findComponent(PasswordInput).exists()).toBe(true)

    // Vérifie la présence des champs de saisie
    const usernameInput = wrapper.find('input[type="text"]')
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')

    expect(usernameInput.exists()).toBe(true)
    expect(emailInput.exists()).toBe(true)
    expect(passwordInput.exists()).toBe(true)
  })

  it('updates formData when input fields change', async () => {
    const wrapper = wrapperFactory()

    // Simule la modification du champ "username"
    const usernameInput = wrapper.find('input[type="text"]')
    await usernameInput.setValue('JohnDoe')
    expect(setFormDataMock).toHaveBeenCalledWith({ ...formData, username: 'JohnDoe' })

    // Simule la modification du champ "email"
    const emailInput = wrapper.find('input[type="email"]')
    await emailInput.setValue('johndoe@example.com')
    expect(setFormDataMock).toHaveBeenCalledWith({ ...formData, email: 'johndoe@example.com' })

    // Simule la modification du champ "password"
    const passwordInput = wrapper.find('input[type="password"]')
    await passwordInput.setValue('mypassword')
    expect(setFormDataMock).toHaveBeenCalledWith({ ...formData, password: 'mypassword' })
  })

  it('submits the form when the submit button is clicked', async () => {
    const wrapper = wrapperFactory()

    // Simule la soumission du formulaire
    await wrapper.find('form').trigger('submit.prevent')
    expect(onSignUpSubmitMock).toHaveBeenCalledTimes(1)
  })

  it('calls togglePanel when the "Login here" button is clicked', async () => {
    const wrapper = wrapperFactory()

    // Simule le clic sur le bouton "Login here"
    const loginButton = wrapper.find('[data-testid="login-button"]')
    await loginButton.trigger('click')

    expect(togglePanelMock).toHaveBeenCalledTimes(1)
  })

  it('requires the terms and conditions checkbox to be checked', async () => {
    const wrapper = wrapperFactory()

    // Vérifie que la case à cocher est bien requise
    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.attributes('required')).toBeDefined()
  })
})
