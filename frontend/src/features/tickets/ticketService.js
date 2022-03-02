import axios from 'axios'

const API_URL = '/api/tickets/'

// create ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, ticketData, config)
  // if (response.data) {
  //   localStorage.setItem('user', JSON.stringify(response.data))
  // }
  return response.data
}

// Get all user tickets
const getUserTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  // if (response.data) {
  //   localStorage.setItem('user', JSON.stringify(response.data))
  // }
  return response.data
}

const ticketService = {
  createTicket,
  getUserTickets,
}

export default ticketService
