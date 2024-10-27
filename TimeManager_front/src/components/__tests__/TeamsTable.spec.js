import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import TeamsTable from '../Dashboard/Widgets/TeamsTable.vue'

describe('TeamsTable.vue', () => {
  it('renders team members correctly', () => {
    const wrapper = mount(TeamsTable)

    // Vérifie que chaque membre de l'équipe est affiché correctement
    const members = wrapper.findAll('.text-sm.font-medium.text-gray-900')
    expect(members.length).toBe(4)
    expect(members[0].text()).toBe('John Doe')
    expect(members[1].text()).toBe('Jane Smith')
    expect(members[2].text()).toBe('Albert Cooper')
    expect(members[3].text()).toBe('Emily White')
  })

  it('shows the delete button when isAdmin or isManager is true', async () => {
    const wrapper = mount(TeamsTable)

    // Vérifie que le bouton est visible quand isAdmin est true (par défaut)
    const deleteButtons = wrapper.findAll('button')
    expect(deleteButtons.length).toBe(4)

    // Accéder directement aux refs pour modifier leur valeur
    wrapper.vm.isAdmin = false
    wrapper.vm.isManager = true
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('button').length).toBe(4)

    // Désactiver les deux, les boutons doivent disparaître
    wrapper.vm.isAdmin = false
    wrapper.vm.isManager = false
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('button').length).toBe(0)
  })

  it('calls removeMember when delete button is clicked', async () => {
    const removeMember = vi.spyOn(console, 'log') // Espionne la fonction console.log
    const wrapper = mount(TeamsTable)

    // Clique sur le premier bouton de suppression
    const deleteButton = wrapper.findAll('button')[0]
    await deleteButton.trigger('click')

    // Vérifie que removeMember a été appelé avec le bon membre
    expect(removeMember).toHaveBeenCalledWith('Membre supprimé : John Doe id : 1')
  })
})
