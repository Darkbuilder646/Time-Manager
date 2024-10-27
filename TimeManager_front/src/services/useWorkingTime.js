import axios from 'axios'
import moment from 'moment'
import { ref } from 'vue'

export function useWorkingTime() {
  const API_URL = import.meta.env.VITE_API_URL
  const computedDate = ref(new Date())
  const workedHours = ref([])
  const totalHoursState = ref([])
  const dailyHoursState = ref([])
  const chartKey = ref(0)

  const isUserConnected = localStorage.getItem('id')

  // Récupérer les heures de travail de la semaine
  const weekWorkingTimes = async () => {
    if (!isUserConnected) {
      return
    }

    const userId = localStorage.getItem('id')
    let startTime = moment(computedDate.value)
      .startOf('week')
      .add(1, 'day')
      .toISOString()
    let endTime = moment(computedDate.value)
      .startOf('week')
      .add(1, 'day')
      .add(24, 'hour')
      .toISOString()
    const times = []

    for (let i = 0; i < 5; i++) {
      try {
        const workingTimes = await axios.get(
          `${API_URL}/workingtime/${userId}?start=${startTime}&end=${endTime}`
        )
        let totalMinutesDuration = 0

        workingTimes.data.forEach((workingTime) => {
          totalMinutesDuration += moment(workingTime.end).diff(workingTime.start, 'minutes')
        })

        times.push(Math.floor(totalMinutesDuration / 60) + (totalMinutesDuration % 60) / 60)
        startTime = moment(startTime).add(1, 'day').toISOString()
        endTime = moment(endTime).add(1, 'day').toISOString()
      } catch (error) {
        console.error('Erreur lors de la récupération des heures de travail', error)
      }
    }
    return times
  }

  // Mettre à jour le graphique
  const updateLineChart = (newValue, dataBar) => {
    workedHours.value = newValue
    dataBar.datasets[0].data = workedHours.value
    chartKey.value++
  }

  const updateDoughnutChart = (newValue, dataBar) => {
    totalHoursState.value = newValue
    dataBar.datasets[0].data = totalHoursState.value
  }

  const updateBarChart = (newValue, dataBar) => {
    dailyHoursState.value = newValue

    let a = []
    let b = []
    let c = []

    dailyHoursState.value.map(([onTime,overtime,absent]) =>{
      a.push(onTime)
      b.push(overtime)
      c.push(absent)
    })

    dataBar.datasets[0].data = a
    dataBar.datasets[1].data = b
    dataBar.datasets[2].data = c
  }

  // Navigation entre les semaines
  const thisWeek = () => {
    computedDate.value = new Date()
    return computedDate.value
  }
  const previousWeek = () => {
    computedDate.value = moment(computedDate.value).subtract(7, 'days').toDate()
    return computedDate.value
  }
  const weekLater = () => {
    computedDate.value = moment(computedDate.value).add(7, 'days').toDate()
    return computedDate.value
  }

  // Récupérer les horloges
  const getClocks = async () => {
    if(!isUserConnected) { return } //! Hotfix 18/10/2024
    try {
      const userId = localStorage.getItem("id");
      const response = await axios.get(`${API_URL}/clocks/${userId}`);
      return(response.data)
    } catch (error) {
      if (error.response.data["error"] == "Aucune horloge trouvée pour cet utilisateur") {
        document.getElementById("clockButton").textContent = "Clock In"
        document.getElementById("clockButton").className = "bg-green-600 text-white shadow rounded-2xl p-6 mb-4 w-1/3"
      } else {
        console.error("Erreur getting clocks", error)
      }
    }  
  }

  // Créer un nouveau temps de travail
  const createWorkingTime = async (clocks) => {
    if (!isUserConnected) {
      return
    }

    const workingTimeStart = clocks[clocks.length - 2].time
    const workingTimeEnd = clocks[clocks.length - 1].time

    const newWorkingTime = {
      workingtime: {
        start: workingTimeStart,
        end: workingTimeEnd
      }
    }

    try {
      const userId = localStorage.getItem('id')
      await axios.post(`${API_URL}/workingtime/${userId}`, newWorkingTime)
    } catch (error) {
      console.error("Erreur lors de la création de l'heure de travail", error)
    }
  }

  // Vérification si le travails est en cours
  const isWorking = async () => {
    try {
      const clocks = await getClocks()
      if (!clocks[clocks.length -1].status) {
        createWorkingTime(clocks)
        document.getElementById("clockButton").textContent = "Clock In"
        document.getElementById("clockButton").className = "bg-green-600 text-white text-xl shadow rounded-2xl p-6 mb-4 w-1/3"
      } else {
        document.getElementById("clockButton").textContent = "Clock Out"
        document.getElementById("clockButton").className = "bg-red-600 text-white text-xl shadow rounded-2xl p-6 mb-4 w-1/3"
      }
    } catch (error) {
      if (error.response?.data["error"] == "Aucune horloge trouvée pour cet utilisateur" || clocks === undefined) {
        document.getElementById("clockButton").textContent = "Clock In"
        document.getElementById("clockButton").class = "bg-green-600 text-white text-xl shadow rounded-2xl p-6 mb-4 w-1/3"
      } else {
        console.error("Erreur getting clocks", error)
      }
    }  
  }

  // Gérer les horloges
  const clocker = async () => {
    if (!isUserConnected) {
      return
    }

    try {
      const userId = localStorage.getItem('id')
      await axios.post(`${API_URL}/clocks/${userId}`)
      isWorking();
    } catch (error) {
      console.error("Erreur lors de l'envoi des horloges", error)
    }
  }

  // Calcul des heures sup ; absence ; heures normales
  const weekHoursState = (weekHours) => {
    let weekHoursState = []
    weekHours.map(dayHours => {
      weekHoursState.push(dayHoursState(dayHours))
    })
    return weekHoursState;
  }

  const dayHoursState = (value) => {
      const onTime = Math.min(value, 8);
      const overtime = value > 8 ? value - 8 : 0;
      const absent = value < 8 ? 8 - value : 0;

      return [onTime, overtime, absent];
  };
  
  const totalWeekHoursState = (weekHours) => {
    const total = weekHours.reduce((acc, current) => {
      return acc.map((sum, index) => sum + current[index]);
    }, [0, 0, 0]);
    return total
  }

  return {
    weekWorkingTimes,
    updateLineChart,
    updateDoughnutChart,
    updateBarChart,
    thisWeek,
    previousWeek,
    weekLater,
    getClocks,
    createWorkingTime,
    clocker,
    isWorking,
    weekHoursState,
    totalWeekHoursState,
    computedDate,
    chartKey
  }
}
