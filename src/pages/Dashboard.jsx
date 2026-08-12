import { useState, useEffect } from "react"

import * as exchangeRateService from '../services/exchangeRates'

const Dashboard = function (props) 
{
    const [rates, setRates] = useState()

    useEffect(function () 
    {
        const fetchRates = async function () 
        {
            const data = await exchangeRateService.getRates()
            
            if (data && data.bhd) 
            {
                setRates({
                    usd: data.bhd.usd.toFixed(2),
                    gbp: data.bhd.gbp.toFixed(2),
                    eur: data.bhd.eur.toFixed(2)
                })
            }
        }
        fetchRates()
    }, [])

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

                    <p className="expense-text">{totalExpenses} BD</p>

                    <p className="expense-text">You have {props.expenses.length} expenses</p>

                </article>

                <article className="card">

                    <header>
                        <h2>Saving Goals</h2>
                    </header>

                    <p className="expense-text">You have {props.events.length} active goals</p>

                </article>

                <article className="card">

                    <header>
                        <h2>Exchange Rates</h2>
                    </header>

                    {rates ? (
                        <ul>
                            <li>1 BHD = {rates.usd} USD</li>
                            <li>1 BHD = {rates.gbp} GBP</li>
                            <li>1 BHD = {rates.eur} EUR</li>
                        </ul>
                    ) : (
                        <p>Loading rates...</p>
                    )}

                </article>

            </div>

        </section>
    )
}

export default Dashboard