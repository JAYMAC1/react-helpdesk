// react related packages
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// misc packages

// custom hook, context, redux components etc
import { getUserTickets, reset } from '../features/tickets/ticketSlice'

// custom pages & components
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

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

  return <div>Tickets</div>
}

export default Tickets
