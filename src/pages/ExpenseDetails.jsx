import { useParams, useNavigate } from "react-router"

import { useState, useEffect } from "react"

import * as expenseService from '../services/expenses'

const ExpenseDetails = function (props) 
{
    const navigate = useNavigate()

    const { expenseId } = useParams()

    const [expense, setExpense] = useState(null)

    useEffect(function () 
    {
        const fetchExpense = async function () 
        {
            const expenseData = await expenseService.show(expenseId)

            setExpense(expenseData)
        }
        fetchExpense()
    }, [expenseId])

    if (!expense) 
    {
        return (
            <main>

                <div className="loader"></div>

            </main>
        )
    }

    return (
        <article className="card">

            <header>
                <span className="expense-badge">{expense.category}</span>

                <h2>{expense.title}</h2>

                <p className="expense-text">Amount: {expense.amount} BD</p>

                <p className="expense-date">
                    Added on <span>{new Date(expense.createdAt).toLocaleDateString()}</span>
                </p>

                {expense.author._id === props.user._id && (
                    <div className="actions">

                        <button onClick={() => navigate(`/expenses/${expenseId}/edit`)}>Edit</button>

                        <button onClick={() => props.handleDeleteExpense(expenseId)}>Delete</button>

                    </div>
                )}
                
            </header>

        </article>
    )
}

export default ExpenseDetails