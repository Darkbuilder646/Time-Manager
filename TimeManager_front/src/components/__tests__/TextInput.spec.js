import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TextInput from '../Input/TextInput.vue'

describe('TextInput.vue', () => {
  it('renders label correctly', () => {
    const wrapper = mount(TextInput, {
      props: {
        label: 'Username',
        type: 'text',
        placeholder: 'Enter your username'
      }
    })
    expect(wrapper.find('label').text()).toBe('Username')
  })

  it('renders icon slot when icon prop is true', () => {
    const wrapper = mount(TextInput, {
      props: {
        label: 'Username',
        type: 'text',
        placeholder: 'Enter your username',
        icon: true
      },
      slots: {
        icon: '<svg class="icon"></svg>'
      }
    })

    expect(wrapper.find('svg.icon').exists()).toBe(true)
  })

  it('does not render icon slot when icon prop is false', () => {
    const wrapper = mount(TextInput, {
      props: {
        label: 'Username',
        type: 'text',
        placeholder: 'Enter your username',
        icon: false
      }
    })

    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('emits update:value event when typing in input', async () => {
    const wrapper = mount(TextInput, {
      props: {
        label: 'Username',
        type: 'text',
        placeholder: 'Enter your username',
        value: ''
      }
    })

    const input = wrapper.find('input')
    await input.setValue('NewValue')

    expect(wrapper.emitted('update:value')).toHaveLength(1)
    expect(wrapper.emitted('update:value')[0]).toEqual(['NewValue'])
  })

  it('renders input with correct type and placeholder', () => {
    const wrapper = mount(TextInput, {
      props: {
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password'
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('password')
    expect(input.attributes('placeholder')).toBe('Enter your password')
  })

  it('applies required attribute when isRequired is true', () => {
    const wrapper = mount(TextInput, {
      props: {
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        isRequired: true
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('required')).toBeDefined()
  })

  it('does not apply required attribute when isRequired is false', () => {
    const wrapper = mount(TextInput, {
      props: {
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        isRequired: false
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('required')).toBeUndefined()
  })
})
