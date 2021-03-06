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
  return response.data
}

// Get all user tickets
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/${ticketId}`, config)
  return response.data
}

// Close user ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `${API_URL}/${ticketId}`,
    { status: 'closed' },
    config
  )
  return response.data
}

const ticketService = {
  createTicket,
  getTicket,
  closeTicket,
  getUserTickets,
}

export default ticketService
