import { useEffect, useState } from "react"

import * as expenseService from '../services/expenses'

const Dashboard = function (props)
{

    const [expenses, setExpenses] = useState([])

    useEffect(function ()
    {

        const fetchExpenses = async function ()
        {
            const expensesData = await expenseService.index()

            setExpenses(expensesData)
        }
        if (props.user) fetchExpenses()

    }, [props.user])

    return (

        <section>

            <header>

                <h1>Welcome {props.user.username}!</h1>

                <h2>Your Recent Expenses</h2>

            </header>
            
            <div className="expense-list">

                {expenses.length > 0 ? (

                    expenses.map((expense) => (

                        <div className="card" key={expense._id}>

                            <header>

                                <h2>{expense.title}</h2>

                                <p className="expense-badge">{expense.amount} BD</p>

                                <p className="expense-date">Added on {new Date(expense.createdAt).toLocaleDateString()}</p>

                            </header>
                        </div>
                    ))
                ) : (
                    <p>No expenses found. Start tracking your money!</p>
                )}

            </div>
            
        </section>
    )
}

export default Dashboard