import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ConfirmationModal from '../Modal/confirmationModal.vue'

describe('ConfirmationModal.vue', () => {
  it('renders when visible is true', () => {
    const wrapper = mount(ConfirmationModal, {
      props: {
        visible: true,
        title: 'Test Title',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      }
    })

    expect(wrapper.find('h2').text()).toBe('Test Title')
    expect(wrapper.isVisible()).toBe(true)
  })

  it('does not render when visible is false', () => {
    const wrapper = mount(ConfirmationModal, {
      props: {
        visible: false,
        title: 'Test Title'
      }
    })

    expect(wrapper.isVisible()).toBe(false)
  })

  it('emits confirm event when confirm button is clicked', async () => {
    const wrapper = mount(ConfirmationModal, {
      props: {
        visible: true,
        title: 'Test Title',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      }
    })

    await wrapper.find('button.bg-green-500').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('confirm')
    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  it('emits cancel event when cancel button is clicked', async () => {
    const wrapper = mount(ConfirmationModal, {
      props: {
        visible: true,
        title: 'Test Title',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      }
    })

    await wrapper.find('button.bg-red-500').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('cancel')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })

  it('emits cancel event when close button is clicked', async () => {
    const wrapper = mount(ConfirmationModal, {
      props: {
        visible: true,
        title: 'Test Title',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      }
    })

    await wrapper.find('button.absolute').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('cancel')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })
})
