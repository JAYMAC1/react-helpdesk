// react related packages
import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// misc packages
import { toast } from 'react-toastify'

// custom hook, context, redux components etc
import { getTicket, reset } from '../features/tickets/ticketSlice'

// custom pages & components
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

// import BackButton from '../components/BackButton'

const Ticket = () => {
  const { ticket, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.ticket
  )
  const { id } = useParams()
  const dispatch = useDispatch()

  const fetchTicket = useCallback(() => {
    dispatch(getTicket(id))
    dispatch(getTicket(id))
  }, [, id])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    fetchTicket()
  }, [isError, message, fetchTicket])

  if (isLoading) <Spinner />
  if (isError) <h3>Something went Wrong</h3>
  console.log(ticket)
  return (
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
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-GB')}
        </h3>
        <hr />
        <div className='ticket-desc'>
          Description of issue
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  )
}

export default Ticket