// react related packages
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// misc packages

// custom hook, context, redux components etc
import { getUserTickets, reset } from '../features/tickets/ticketSlice'

// custom pages & components
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

const Tickets = () => {
  const { tickets, isError, isLoading, isSuccess } = useSelector(
    (state) => state.ticket
  )

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [isSuccess, dispatch])

  useEffect(() => {
    dispatch(getUserTickets())
  }, [dispatch])

  if (isLoading) <Spinner />

  return (
    <>
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets &&
          tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
      </div>
    </>
  )
}

export default Tickets
