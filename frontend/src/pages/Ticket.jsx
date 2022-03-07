// react related packages
import { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

// misc packages
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'

// custom hook, context, redux components etc
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, reset as notesReset } from '../features/notes/noteSlice'

// custom pages & components
import NoteItem from '../components/NoteItem'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

// custom styles
const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const { ticket, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.ticket
  )

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.note
  )

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchTicket = useCallback(
    (id) => {
      dispatch(getTicket(id))
      dispatch(getNotes(id))
    },
    [dispatch]
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    fetchTicket(id)

    // dispatch(getNotes(ticketId))
  }, [isError, message, id, fetchTicket])

  if (isLoading || notesIsLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something went Wrong</h3>
  }

  const onTicketClose = () => {
    dispatch(closeTicket(id))
    toast.success('Ticket marked as closed')
    navigate('/tickets')
  }

  const openModal = () => {
    setModalIsOpen(true)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }
  const onFormSubmit = (e) => {
    e.preventDefault()

    console.log('Submit Note')
    closeModal()
  }
  return (
    <>
      {ticket && (
        <div className='ticket-page'>
          <header className='ticket-header'>
            <BackButton url='/tickets' />
            <h2>
              Ticket ID: {ticket._id}
              <span className={`status status-${ticket.status}`}>
                {ticket.status}
              </span>
            </h2>
            <h3>
              Date Submitted:{' '}
              {new Date(ticket.createdAt).toLocaleString('en-GB')}
            </h3>
            <h3>Product: {ticket.product}</h3>
            <hr />
            <div className='ticket-desc'>
              <h3>Description of Issue</h3>
              <p>{ticket.description}</p>
            </div>
            <h2>Notes:</h2>
          </header>
          {ticket.status !== 'closed' && (
            <button onClick={openModal} className='btn'>
              {' '}
              <FaPlus />
              Add Note
            </button>
          )}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='Add Note'>
            <h2>Add Note</h2>
            <button className='btn-close' onClick={closeModal}>
              X
            </button>
            <form onSubmit={onFormSubmit}>
              <div className='form-group'>
                <textarea
                  name='noteText'
                  id='noteText'
                  className='form-control'
                  placeholder='Note Text'
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}></textarea>
              </div>
              <div className='form-group'>
                <button className='btn' type='submit'>
                  Submit
                </button>
              </div>
            </form>
          </Modal>
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}
          {ticket.status !== 'closed' && (
            <button
              onClick={onTicketClose}
              className='btn btn-block btn-danger'>
              Close Ticket
            </button>
          )}
        </div>
      )}
    </>
  )
}

export default Ticket
