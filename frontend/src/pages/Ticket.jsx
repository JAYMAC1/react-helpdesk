// react related packages
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// misc packages

// custom hook, context, redux components etc
import { getTicket, reset } from '../features/tickets/ticketSlice'

// custom pages & components
import Spinner from '../components/Spinner'
// import BackButton from '../components/BackButton'

const Ticket = () => {
  const { ticket, isLoading, isSuccess } = useSelector((state) => state.ticket)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [isSuccess, dispatch])

  useEffect(() => {
    dispatch(getTicket(id))
  }, [dispatch, id])

  if (isLoading) <Spinner />

  return (
    <>
      <h1>{isSuccess}</h1>
    </>
  )
}

export default Ticket
