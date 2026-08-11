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
import ExpenseDetails from "./pages/ExpenseDetails"

import EventList from "./pages/EventList"
import EventForm from "./pages/EventForm"
import EventDetails from "./pages/EventDetails"

import * as expenseService from './services/expenses'
import * as eventService from './services/events'

import CurrencyConverter from "./pages/CurrencyConverter"

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
  const [events, setEvents] = useState([])

  useEffect(function () 
  {
    const fetchAllExpenses = async function () 
    {
      const expensesData = await expenseService.index()
      setExpenses(expensesData)
    }

    if (user) fetchAllExpenses()

  }, [user])

  useEffect(function () 
  {
    const fetchAllEvents = async function () 
    {
      const eventsData = await eventService.index()
      setEvents(eventsData)
    }

    if (user) fetchAllEvents()

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
    navigate(`/expenses/${expenseId}`) 
  }

  const handleDeleteExpense = async function (expenseId) 
  {
    const deletedExpense = await expenseService.deleteExpense(expenseId)
    
    const filteredExpenses = expenses.filter(function (expense) 
    {
        return expense._id !== expenseId
    })

    setExpenses(filteredExpenses)
    navigate('/expenses')
  }

  const handleAddEvent = async function (formData) 
  {
    const newEvent = await eventService.create(formData)
    setEvents([newEvent, ...events])
    navigate('/events')
  }

  const handleUpdateEvent = async function (eventId, formData) 
  {
    const updatedEvent = await eventService.update(eventId, formData)
    
    const updatedEventsList = events.map(function (event) 
    {
      return eventId === event._id ? updatedEvent : event
    })

    setEvents(updatedEventsList)
    navigate(`/events/${eventId}`) 
  }

  const handleDeleteEvent = async function (eventId) 
  {
    const deletedEvent = await eventService.deleteEvent(eventId)
    
    const filteredEvents = events.filter(function (event) 
    {
        return event._id !== eventId
    })

    setEvents(filteredEvents)
    navigate('/events')
  }


  return (
    <div>
      <Nav user={user} setUser={setUser} />
      
      <main className="app-main">
        <Routes>
        <Route path='/' element={user ? <Dashboard user={user} expenses={expenses} events={events} /> : <Landing />} />
          
          {user ? (
            <>
              <Route path='/expenses' element={<ExpenseList expenses={expenses} />} />
              <Route path='/expenses/new' element={<ExpenseForm handleAddExpense={handleAddExpense} />} />
              <Route path='/expenses/:expenseId' element={<ExpenseDetails user={user} handleDeleteExpense={handleDeleteExpense} />} />
              <Route path='/expenses/:expenseId/edit' element={<ExpenseForm handleUpdateExpense={handleUpdateExpense} />} />

              <Route path='/events' element={<EventList events={events} />} />
              <Route path='/events/new' element={<EventForm handleAddEvent={handleAddEvent} />} />
              
              <Route path='/events/:eventId' element={<EventDetails user={user} handleDeleteEvent={handleDeleteEvent} />} />
              
              <Route path='/events/:eventId/edit' element={<EventForm handleUpdateEvent={handleUpdateEvent} />} />

              <Route path='/converter' element={<CurrencyConverter />} />
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