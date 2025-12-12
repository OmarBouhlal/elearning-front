
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
function App() {
  

  return (
    <>
      <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
      </div>
    </>
  )
}

export default App
