// react components
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components and Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import NewTicket from './pages/NewTicket'

// misc packages
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-ticket' element={<NewTicket />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
