import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import LoginForm from '../Form/LoginForm.vue'
import TextInput from '../Input/TextInput.vue'
import PasswordInput from '../Input/PasswordInput.vue'

describe('LoginForm.vue', () => {
  const formData = {
    email: '',
    password: ''
  }

  const setFormDataMock = vi.fn()
  const onLoginSubmitMock = vi.fn()
  const togglePanelMock = vi.fn()

  const wrapperFactory = (overrides = {}) => {
    return mount(LoginForm, {
      props: {
        formData,
        setFormData: setFormDataMock,
        onLoginSubmit: onLoginSubmitMock,
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

  it('renders the form with email and password inputs', () => {
    const wrapper = wrapperFactory()

    // Vérifie que les composants TextInput et PasswordInput sont rendus
    expect(wrapper.findComponent(TextInput).exists()).toBe(true)
    expect(wrapper.findComponent(PasswordInput).exists()).toBe(true)

    // Vérifie la présence des champs de saisie
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')

    expect(emailInput.exists()).toBe(true)
    expect(passwordInput.exists()).toBe(true)
  })

  it('updates formData when input fields change', async () => {
    const wrapper = wrapperFactory()

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
    expect(onLoginSubmitMock).toHaveBeenCalledTimes(1)
  })

  // it('calls togglePanel when the "Create a free account" button is clicked', async () => {
  //   const wrapper = wrapperFactory()

  //   // Simule le clic sur le bouton "Create a free account"
  //   const registerButton = wrapper.find('[data-testid="register-button"]')
  //   await registerButton.trigger('click')

  //   expect(togglePanelMock).toHaveBeenCalledTimes(1)
  // })
})
