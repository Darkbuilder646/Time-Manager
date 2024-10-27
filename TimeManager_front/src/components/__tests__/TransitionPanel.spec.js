import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TransitionPanel from '../TransitionPanel.vue'

describe('TransitionPanel.vue', () => {
  const wrapperFactory = (isPanelOpen) => {
    return mount(TransitionPanel, {
      props: {
        isPanelOpen
      }
    })
  }

  it('renders with the panel closed by default', () => {
    const wrapper = wrapperFactory(false)

    // Vérifie que le panneau est fermé (classe `translate-x-[100%]` est appliquée)
    const panel = wrapper.find('#panelSlide')
    expect(panel.classes()).toContain('translate-x-[100%]')
    expect(panel.classes()).toContain('rounded-l-3xl')
  })

  it('renders with the panel open when isPanelOpen is true', () => {
    const wrapper = wrapperFactory(true)

    // Vérifie que le panneau est ouvert (classe `translate-x-0` est appliquée)
    const panel = wrapper.find('#panelSlide')
    expect(panel.classes()).toContain('translate-x-0')
    expect(panel.classes()).toContain('rounded-r-3xl')
  })

  it('applies correct transition classes when panel state changes', async () => {
    const wrapper = wrapperFactory(false)

    // Vérifie d'abord que le panneau est fermé
    let panel = wrapper.find('#panelSlide')
    expect(panel.classes()).toContain('translate-x-[100%]')

    // Modifie la prop isPanelOpen à true
    await wrapper.setProps({ isPanelOpen: true })

    // Vérifie que le panneau est maintenant ouvert
    panel = wrapper.find('#panelSlide')
    expect(panel.classes()).toContain('translate-x-0')
  })
})
