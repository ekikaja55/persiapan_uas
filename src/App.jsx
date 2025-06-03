import './App.css'
import LandingPage from './components/LandingPage'
import UserForm from './components/UserForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<LandingPage />} />
        <Route path='/mhs' element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
