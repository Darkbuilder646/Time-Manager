import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + '/users'

const userService = {
  async getAllUsers() {
    try {
      const response = await axios.get(API_URL)
      return response.data
    } catch (error) {
      console.error('There was an error fetching the users!', error)
      throw error
    }
  },

  async getUserById(userId) {
    try {
      const response = await axios.get(`${API_URL}/${userId}`)
      return response.data
    } catch (error) {
      console.error(`There was an error fetching the user with ID ${userId}!`, error)
      throw error
    }
  },

  async createUser(userData) {
    console.log('create user service data ', userData)
    try {
      const response = await axios.post(API_URL, userData)
      return response.data
    } catch (error) {
      console.error('There was an error creating the user!', error)
      throw error
    }
  },

  async updateUser(userId, userData) {
    try {
      const token = localStorage.getItem('token')

      const response = await axios.put(`${API_URL}/${userId}`, userData, {headers: {
        Authorization: `Bearer ${token}`
      }})
      return response.data
    } catch (error) {
      console.error(`There was an error updating the user with ID ${userId}!`, error)
      throw error
    }
  },

  async deleteUser(userId) {
    try {
      const response = await axios.delete(`${API_URL}/${userId}`)
      return response.data
    } catch (error) {
      console.error(`There was an error deleting the user with ID ${userId}!`, error)
      throw error
    }
  }
}

export default userService
