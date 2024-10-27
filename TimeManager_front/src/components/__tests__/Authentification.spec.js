import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Authentification from '../../View/Authentification.vue'

describe('Authentification.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Authentification)
  })

  it('renders the LoginForm component', () => {
    const loginForm = wrapper.findComponent({ name: 'LoginForm' })
    expect(loginForm.exists()).toBe(true)
  })

  it('renders the SignUpForm component', () => {
    const signUpForm = wrapper.findComponent({ name: 'SignUpForm' })
    expect(signUpForm.exists()).toBe(true)
  })

  it('renders the TransitionPanel component', () => {
    const transitionPanel = wrapper.findComponent({ name: 'TransitionPanel' })
    expect(transitionPanel.exists()).toBe(true)
  })

  it('toggles the panel open state when togglePanel is called', async () => {
    expect(wrapper.vm.isPanelOpen).toBe(false)

    await wrapper.vm.togglePanel()
    expect(wrapper.vm.isPanelOpen).toBe(true)

    await wrapper.vm.togglePanel()
    expect(wrapper.vm.isPanelOpen).toBe(false)
  })
})
