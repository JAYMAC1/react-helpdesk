// react related packages
import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

// misc packages
import { toast } from 'react-toastify'

// custom hook, context, redux components etc
import { getTicket, closeTicket, reset } from '../features/tickets/ticketSlice'

// custom pages & components
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

// import BackButton from '../components/BackButton'

const Ticket = () => {
  const { ticket, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.ticket
  )

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchTicket = useCallback(
    (id) => {
      dispatch(getTicket(id))
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

  if (isLoading) {
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
          </header>
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
