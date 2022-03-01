// react related packages
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// misc packages
import { toast } from 'react-toastify'

// custom hook, context, redux components etc
import { createTicket, reset } from '../features/tickets/ticketSlice'

// custom pages & components
import Spinner from '../components/Spinner'

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth)
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket
  )
  const name = user.name
  const email = user.email
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    // Redirect when logged in
    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }
    dispatch(reset())
  }, [isError, message, isSuccess, navigate, dispatch])

  const onSubmit = async (e) => {
    e.preventDefault()
    await dispatch(
      createTicket({
        product,
        description,
      })
    )
  }

  if (isLoading) <Spinner />
  return (
    <>
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              id='product'
              name='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}>
              <option value='iPhone'>iPhone</option>
              <option value='MacBook Pro'>MacBook Pro</option>
              <option value='iMac'>iMac</option>
              <option value='iPad'>iPad</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
