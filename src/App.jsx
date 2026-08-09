import { useState } from "react"
import { Routes, Route } from "react-router"
import './App.css'

import SignUpForm from "./pages/SignUpForm"
import SignInForm from "./pages/SignInForm"

const getUserFromToken = function (){
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
            <p>just test</p>
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