import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PasswordInput from '../Input/PasswordInput.vue'

describe('PasswordInput.vue', () => {
  it('renders the label and placeholder correctly', () => {
    const wrapper = mount(PasswordInput, {
      props: {
        label: 'Password',
        placeholder: 'Enter your password'
      }
    })

    // Vérifie que le label est correctement rendu
    expect(wrapper.find('label').text()).toBe('Password')

    // Vérifie que l'input a le bon placeholder
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter your password')
  })

  it('renders an icon when the icon prop is true', () => {
    const wrapper = mount(PasswordInput, {
      props: {
        label: 'Password',
        placeholder: 'Enter your password',
        icon: true
      },
      slots: {
        icon: '<svg class="icon"></svg>'
      }
    })

    // Vérifie que l'icône est présente
    expect(wrapper.find('svg.icon').exists()).toBe(true)
  })

  it('does not render an icon when the icon prop is false', () => {
    const wrapper = mount(PasswordInput, {
      props: {
        label: 'Password',
        placeholder: 'Enter your password',
        icon: false
      }
    })

    // Vérifie que l'icône n'est pas présente
    expect(wrapper.find('svg.icon').exists()).toBe(false)
  })

  it('toggles password visibility when the eye icon is clicked', async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        label: 'Password',
        placeholder: 'Enter your password'
      }
    })

    // Vérifie que l'input est de type "password" par défaut
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('password')

    // Simule un clic sur l'icône de l'œil pour afficher le mot de passe
    const eyeIcon = wrapper.find('[data-testid="eye-icon"]')
    await eyeIcon.trigger('click')

    // Vérifie que l'input est maintenant de type "text" pour afficher le mot de passe
    expect(input.attributes('type')).toBe('text')

    // Simule un deuxième clic pour masquer à nouveau le mot de passe
    await eyeIcon.trigger('click')

    // Vérifie que l'input est de nouveau de type "password"
    expect(input.attributes('type')).toBe('password')
  })

  it('emits an update:value event when the input value changes', async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        label: 'Password',
        placeholder: 'Enter your password',
        value: ''
      }
    })

    // Simule la saisie de texte dans l'input
    const input = wrapper.find('input')
    await input.setValue('MySecretPassword')

    // Vérifie que l'événement 'update:value' est émis avec la nouvelle valeur
    expect(wrapper.emitted('update:value')).toHaveLength(1)
    expect(wrapper.emitted('update:value')[0]).toEqual(['MySecretPassword'])
  })

  it('renders the "Forgot password" button when showForgotPassword is true', () => {
    const wrapper = mount(PasswordInput, {
      props: {
        label: 'Password',
        placeholder: 'Enter your password',
        showForgotPassword: true
      }
    })

    // Vérifie que le bouton "Forgot password" est rendu
    const forgotPasswordButton = wrapper.find('button[title="Forgot password?"]')
    expect(forgotPasswordButton.exists()).toBe(true)
  })

  it('does not render the "Forgot password" button when showForgotPassword is false', () => {
    const wrapper = mount(PasswordInput, {
      props: {
        label: 'Password',
        placeholder: 'Enter your password',
        showForgotPassword: false
      }
    })

    // Vérifie que le bouton "Forgot password" n'est pas rendu
    const forgotPasswordButton = wrapper.find('button[title="Forgot password?"]')
    expect(forgotPasswordButton.exists()).toBe(false)
  })
})
