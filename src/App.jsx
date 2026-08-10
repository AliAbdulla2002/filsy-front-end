import { useState, useEffect } from "react"

import { Routes, Route, useNavigate } from "react-router"

import './App.css'

import Nav from "./components/Nav"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import SignUpForm from "./pages/SignUpForm"
import SignInForm from "./pages/SignInForm"
import ExpenseList from "./pages/ExpenseList"
import ExpenseForm from "./pages/ExpenseForm"

import * as expenseService from './services/expenses'

const getUserFromToken = function ()  
{
  const token = localStorage.getItem('token')
  if (!token) return null
  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = function ()
{
  const navigate = useNavigate()

  const [user, setUser] = useState(getUserFromToken())

  const [expenses, setExpenses] = useState([])

  useEffect(function () 
  {
    const fetchAllExpenses = async function () 
    {
      const expensesData = await expenseService.index()
      setExpenses(expensesData)
    }

    if (user) fetchAllExpenses()

  }, [user])

  const handleAddExpense = async function (formData) 
  {
    const newExpense = await expenseService.create(formData)

    setExpenses([newExpense, ...expenses])

    navigate('/expenses')
  }

  const handleUpdateExpense = async function (expenseId, formData) 
  {
    const updatedExpense = await expenseService.update(expenseId, formData)
    
    const updatedExpensesList = expenses.map(function (expense) 
    {
      return expenseId === expense._id ? updatedExpense : expense
    })

    setExpenses(updatedExpensesList)

    navigate(`/expenses`) 
  }

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      
      <main className="app-main">
        <Routes>
          <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
          
          {user ? (
            <>
              <Route path='/expenses' element={<ExpenseList expenses={expenses} />} />
              <Route path='/expenses/new' element={<ExpenseForm handleAddExpense={handleAddExpense} />} />
              <Route path='/expenses/:expenseId/edit' element={<ExpenseForm handleUpdateExpense={handleUpdateExpense} />} />
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