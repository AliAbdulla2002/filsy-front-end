import { useEffect, useState } from "react"

import * as expenseService from '../services/expenses'

const Dashboard = function (props) 
{
    const totalExpenses = props.expenses.reduce(function (sum, expense) 
    {
        return sum + expense.amount
    }, 0)

    return (
        <section>
            <header>
                <h1>Welcome {props.user.username}!</h1>
                <h2>Your Financial Summary</h2>
            </header>
            
            <div className="dashboard-summary">
                
                <article className="card">
                    <header>
                        <h2>Total Expenses</h2>
                    </header>
                    <p className="expense-text">{totalExpenses.toLocaleString()} BD</p>
                </article>

                <article className="card">
                    <header>
                        <h2>Saving Goals</h2>
                    </header>
                    <p className="expense-text">You have {props.events.length} active goals</p>
                </article>

            </div>
        </section>
    )
}

export default Dashboard