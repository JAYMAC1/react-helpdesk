import axios from 'axios'

const API_URL = '/api/tickets/'

// Get all user tickets
const getNotes = async (ticketId, token) => {
  console.log(API_URL + ticketId + '/notes')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + ticketId + '/notes', config)
  return response.data
}

// create ticket
const createNote = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, ticketData, config)

  return response.data
}

const noteService = {
  createNote,
  getNotes,
}
export default noteService
