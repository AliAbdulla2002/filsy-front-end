import { useParams, useNavigate } from "react-router"

import { useState, useEffect } from "react"

import * as expenseService from '../services/expenses'

const ExpenseDetails = function (props)
{
    const navigate = useNavigate()

    const { expenseId } = useParams()

    const [expense, setExpense] = useState(null)

    const [isConfirming, setIsConfirming] = useState(false)

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

                {props.user && expense.owner && (expense.owner._id === props.user._id || expense.owner === props.user._id) && (
                    <div className="actions">

                        {!isConfirming ? (
                            <>
                                <button onClick={() => navigate(`/expenses/${expenseId}/edit`)}>Edit</button>

                                <button onClick={() => setIsConfirming(true)}>Delete</button>
                            </>
                        ) : (
                            <>
                                <span>Are you sure? </span>

                                <button onClick={() => props.handleDeleteExpense(expenseId)}>Yes, Delete</button>

                                <button onClick={() => setIsConfirming(false)}>Cancel</button>
                            </>
                        )}

                    </div>
                )}

            </header>

        </article>
    )
}

export default ExpenseDetails