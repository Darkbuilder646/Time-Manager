import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WorkingTimeTable from '../Dashboard/Widgets/WorkingTimeTable.vue'

describe('WorkingTimeTable.vue', () => {
  it('renders the correct number of rows', () => {
    const wrapper = mount(WorkingTimeTable)

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(8)
  })

  // it('renders the correct member information', () => {
  //   const wrapper = mount(WorkingTimeTable)

  //   const firstRow = wrapper.findAll('tbody tr')[0]
  //   const memberName = firstRow.find('td:nth-child(1) div').text()
  //   const memberStatus = firstRow.find('td:nth-child(2) span').text()
  //   const clockIn = firstRow.find('td:nth-child(3)').text()
  //   const clockOut = firstRow.find('td:nth-child(4)').text()

  //   expect(memberName).toBe('John Doe')
  //   expect(memberStatus).toBe('On Time')
  //   expect(clockIn).toBe('08:00 AM')
  //   expect(clockOut).toBe('05:00 PM')
  // })

  it('applies the correct class for member status', () => {
    const wrapper = mount(WorkingTimeTable)

    const firstStatusClass = wrapper.findAll('tbody tr')[0].find('td:nth-child(2) span').classes()
    const secondStatusClass = wrapper.findAll('tbody tr')[1].find('td:nth-child(2) span').classes()
    const fourthStatusClass = wrapper.findAll('tbody tr')[3].find('td:nth-child(2) span').classes()

    expect(firstStatusClass).toContain('bg-green-100')
    expect(secondStatusClass).toContain('bg-yellow-100')
    expect(fourthStatusClass).toContain('bg-red-100')
  })

  it('displays the correct default required time', () => {
    const wrapper = mount(WorkingTimeTable)

    const requiredTimeCells = wrapper.findAll('td:nth-child(5)')
    requiredTimeCells.forEach((cell) => {
      expect(cell.text()).toBe('8h')
    })
  })
})
