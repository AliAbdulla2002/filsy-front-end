import { useState } from "react"

import { Routes, Route } from "react-router"

import './App.css'

import Nav from "./components/Nav"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import SignUpForm from "./pages/SignUpForm"
import SignInForm from "./pages/SignInForm"

const getUserFromToken = function ()  
{
  const token = localStorage.getItem('token')
  if (!token) return null
  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = function ()
{
  const [user, setUser] = useState(getUserFromToken())

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      
      <main className="app-main">
        <Routes>
          <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
          
          {user ? (
            <>
              {/* Add the expenses and events routers*/}
            </>
          ) : (
            <>
              <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
              <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  )
}

export default App