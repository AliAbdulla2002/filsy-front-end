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
            <main className="container mt-5 d-flex justify-content-center">

                <div className="loader"></div>

            </main>
        )
    }

    return (
        <main className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6">

                    <article className="card shadow-sm border-0 p-4">

                        <header>
                            <span className="badge bg-light text-secondary border mb-3 px-3 py-2">{expense.category}</span>

                            <h2 className="fw-bold mb-3">{expense.title}</h2>

                            <p className="fs-4 fw-bold text-primary mb-2">Amount: {expense.amount} BD</p>

                            <p className="text-muted small mb-4">
                                Added on <span>{new Date(expense.createdAt).toLocaleDateString()}</span>
                            </p>

                            {props.user && expense.owner && (expense.owner._id === props.user._id || expense.owner === props.user._id) && (
                                <div className="d-flex gap-3 align-items-center mt-4 border-top pt-4 flex-wrap">

                                    {!isConfirming ? (
                                        <>
                                            <button className="btn btn-primary px-4" onClick={() => navigate(`/expenses/${expenseId}/edit`)}>Edit</button>

                                            <button className="btn btn-outline-danger px-4" onClick={() => setIsConfirming(true)}>Delete</button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-danger fw-bold">Are you sure? </span>

                                            <button className="btn btn-danger px-3" onClick={() => props.handleDeleteExpense(expenseId)}>Yes, Delete</button>

                                            <button className="btn btn-secondary px-3" onClick={() => setIsConfirming(false)}>Cancel</button>
                                        </>
                                    )}

                                </div>
                            )}

                        </header>

                    </article>

                </div>

            </div>

        </main>
    )
}

export default ExpenseDetails