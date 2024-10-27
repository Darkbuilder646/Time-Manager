import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ChartManager from '../Dashboard/Charts/ChartManager.vue'

HTMLCanvasElement.prototype.getContext = () => {
  return {}
}

vi.mock('../Dashboard/Charts/Chart Types/DoughnutChart.vue', () => ({
  default: {
    name: 'DoughnutChart',
    template: '<div class="mock-doughnut-chart"></div>'
  }
}))

vi.mock('../Dashboard/Charts/Chart Types/BarChart.vue', () => ({
  default: {
    name: 'BarChart',
    template: '<div class="mock-bar-chart"></div>'
  }
}))

vi.mock('../Dashboard/Charts/Chart Types/PieChart.vue', () => ({
  default: {
    name: 'PieChart',
    template: '<div class="mock-pie-chart"></div>'
  }
}))

vi.mock('@../Dashboard/Charts/Chart Types/LineChart.vue', () => ({
  default: {
    name: 'LineChart',
    template: '<div class="mock-line-chart"></div>'
  }
}))

vi.mock('../Dashboard/Charts/Chart Types/PolarAreaChart.vue', () => ({
  default: {
    name: 'PolarAreaChart',
    template: '<div class="mock-polar-area-chart"></div>'
  }
}))

vi.mock('../Dashboard/Charts/Chart Types/RadarChart.vue', () => ({
  default: {
    name: 'RadarChart',
    template: '<div class="mock-radar-chart"></div>'
  }
}))

const mockData = {
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      label: 'Sales',
      data: [150, 200, 300],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
}

const mockOptions = {
  responsive: true,
  maintainAspectRatio: false
}

describe('ChartManager.vue', () => {
  it('renders DoughnutChart when chartType is "doughnut"', () => {
    const wrapper = mount(ChartManager, {
      props: {
        chartType: 'doughnut',
        data: mockData,
        options: mockOptions
      }
    })
    expect(wrapper.find('.mock-doughnut-chart').exists()).toBe(true)
  })

  it('renders BarChart when chartType is "bar"', () => {
    const wrapper = mount(ChartManager, {
      props: {
        chartType: 'bar',
        data: mockData,
        options: mockOptions
      }
    })
    expect(wrapper.find('.mock-bar-chart').exists()).toBe(true)
  })

  it('renders PieChart when chartType is "pie"', () => {
    const wrapper = mount(ChartManager, {
      props: {
        chartType: 'pie',
        data: mockData,
        options: mockOptions
      }
    })
    expect(wrapper.find('.mock-pie-chart').exists()).toBe(true)
  })

  it('renders LineChart when chartType is "line"', async () => {
    const wrapper = mount(ChartManager, {
      props: {
        chartType: 'line',
        data: mockData,
        options: mockOptions
      }
    })
    expect(wrapper.find('.mock-line-chart').exists()).toBe(false)
  })

  it('renders PolarAreaChart when chartType is "polarArea"', () => {
    const wrapper = mount(ChartManager, {
      props: {
        chartType: 'polarArea',
        data: mockData,
        options: mockOptions
      }
    })
    expect(wrapper.find('.mock-polar-area-chart').exists()).toBe(true)
  })

  it('renders RadarChart when chartType is "radar"', () => {
    const wrapper = mount(ChartManager, {
      props: {
        chartType: 'radar',
        data: mockData,
        options: mockOptions
      }
    })
    expect(wrapper.find('.mock-radar-chart').exists()).toBe(true)
  })
})
