import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import UserModal from '../Modal/UserModal.vue'

describe('UserModal.vue', () => {
  it('renders when visible is true', () => {
    const wrapper = mount(UserModal, {
      props: {
        visible: true,
        title: 'Test Title',
        usernamePlaceholder: 'Enter username',
        emailPlaceholder: 'Enter email',
        confirmButtonText: 'Confirm'
      }
    })

    expect(wrapper.find('h2').text()).toBe('Test Title')
    expect(wrapper.find('input#username').attributes('placeholder')).toBe('Enter username')
    expect(wrapper.find('input#email').attributes('placeholder')).toBe('Enter email')
  })

  it('does not render when visible is false', () => {
    const wrapper = mount(UserModal, {
      props: {
        visible: false,
        title: 'Test Title'
      }
    })

    expect(wrapper.isVisible()).toBe(false)
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(UserModal, {
      props: {
        visible: true,
        title: 'Test Title'
      }
    })

    await wrapper.find('button.absolute').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  // it('emits onConfirm event with username and email when confirm button is clicked', async () => {
  //   const onConfirm = vi.fn()

  //   const wrapper = mount(UserModal, {
  //     props: {
  //       visible: true,
  //       title: 'Test Title',
  //       onConfirm
  //     }
  //   })

  //   // Set the values for username and email
  //   await wrapper.find('input#username').setValue('TestUser')
  //   await wrapper.find('input#email').setValue('test@example.com')

  //   await wrapper.find('button.bg-blue-500').trigger('click')

  //   expect(onConfirm).toHaveBeenCalledWith({
  //     user: {
  //       username: 'TestUser',
  //       email: 'test@example.com'
  //     }
  //   })
  // })

  // it('displays an alert if fields are empty when confirming', async () => {
  //   window.alert = vi.fn() // Mock alert

  //   const wrapper = mount(UserModal, {
  //     props: {
  //       visible: true,
  //       title: 'Test Title'
  //     }
  //   })

  //   await wrapper.find('button.bg-blue-500').trigger('click')

  //   expect(window.alert).toHaveBeenCalledWith('Please fill out both fields')
  // })

  it('resets username and email fields when modal is reopened', async () => {
    const wrapper = mount(UserModal, {
      props: {
        visible: true,
        title: 'Test Title'
      }
    })

    await wrapper.find('input#username').setValue('TestUser')
    await wrapper.find('input#email').setValue('test@example.com')

    await wrapper.setProps({ visible: false })

    await wrapper.setProps({ visible: true })

    expect(wrapper.find('input#username').element.value).toBe('')
    expect(wrapper.find('input#email').element.value).toBe('')
  })
})
