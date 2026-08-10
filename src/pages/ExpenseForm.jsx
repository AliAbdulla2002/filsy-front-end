import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import * as expenseService from '../services/expenses'

const ExpenseForm = function (props)  
{
    const { expenseId } = useParams()

    const initialState = {

        title: '',

        amount: '',

        category: 'Food',
    }

    const [formData, setFormData] = useState(initialState)

  const handleChange = function (event)
  {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = function (evt)
  {
    evt.preventDefault()

    if (expenseId) 
    {
        props.handleUpdateExpense(expenseId, formData)
    } else 
    {
        props.handleAddExpense(formData)
    }
  }

  useEffect(function ()
  {
    const fetchExpense = async function ()
    {
        const expenseData = await expenseService.show(expenseId)

        setFormData(expenseData)
    }
    if (expenseId) fetchExpense()
    
    return () => setFormData(initialState)}, [expenseId])

  return (
    <main className='card'>

    <h1>{expenseId ? 'Edit Expense' : 'New Expense'}</h1>

      <form onSubmit={handleSubmit}>

        <label>Title (e.g. Lunch)</label>
        <input required type='text' name='title' value={formData.title} onChange={handleChange}/>
        
        <label>Amount (BD)</label>
        <input required type='number' name='amount' value={formData.amount} onChange={handleChange}/>

        <label>Category</label>
        <select required name='category' value={formData.category} onChange={handleChange}>

          <option value='Food'>Food</option>

          <option value='Transport'>Transport</option>

          <option value='Entertainment'>Entertainment</option>

          <option value='Shopping'>Shopping</option>

          <option value='Bills'>Bills</option>

          <option value='Other'>Other</option>

        </select>

        <button type='submit'>SUBMIT</button>

      </form>

    </main>
  )
}

export default ExpenseForm