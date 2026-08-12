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
    <main className="container mt-5">

        <div className="row justify-content-center">

            <div className="col-12 col-md-8 col-lg-6">

                <div className="card shadow-sm border-0 p-4">

                    <h1 className="text-center mb-4 fs-3 fw-bold">{expenseId ? 'Edit Expense' : 'New Expense'}</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Title</label>
                            <input required type='text' className="form-control" name='title' value={formData.title} onChange={handleChange}/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Amount</label>
                            <input required type='number' className="form-control" name='amount' value={formData.amount} onChange={handleChange}/>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Category</label>
                            <select required className="form-select" name='category' value={formData.category} onChange={handleChange}>

                                <option value='Food'>Food</option>

                                <option value='Transport'>Transport</option>

                                <option value='Entertainment'>Entertainment</option>

                                <option value='Shopping'>Shopping</option>

                                <option value='Bills'>Bills</option>

                                <option value='Other'>Other</option>

                            </select>
                        </div>

                        <button type='submit' className="btn btn-primary w-100 fw-bold p-2">SUBMIT</button>

                    </form>

                </div>

            </div>

        </div>

    </main>
  )
}

export default ExpenseForm