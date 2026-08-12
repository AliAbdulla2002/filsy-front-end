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
        <main className="container mt-4 mb-5">

            <header className="text-center mb-5">
                <h1 className="fw-bold">Welcome {props.user.username}!</h1>
                <h2 className="text-muted fs-4">Your Financial Summary</h2>
            </header>

            <div className="row g-4">

                <div className="col-12 col-md-4">
                    <article className="card h-100 shadow-sm border-0 text-center p-3">

                        <header className="card-header bg-white border-0 pb-0">
                            <h2 className="fs-5 text-secondary m-0">Total Expenses</h2>
                        </header>

                        <div className="card-body">
                            <p className="display-6 fw-bold text-dark mb-2">{totalExpenses} BD</p>

                            <p className="text-muted small m-0">You have {props.expenses.length} expenses</p>
                        </div>

                    </article>
                </div>

                <div className="col-12 col-md-4">
                    <article className="card h-100 shadow-sm border-0 text-center p-3">

                        <header className="card-header bg-white border-0 pb-0">
                            <h2 className="fs-5 text-secondary m-0">Saving Goals</h2>
                        </header>

                        <div className="card-body d-flex flex-column justify-content-center">
                            <p className="fs-5 text-dark m-0">You have <span className="fw-bold text-primary">{props.events.length}</span> active goals</p>
                        </div>

                    </article>
                </div>

                <div className="col-12 col-md-4">
                    <article className="card h-100 shadow-sm border-0 text-center p-3">

                        <header className="card-header bg-white border-0 pb-0">
                            <h2 className="fs-5 text-secondary m-0">Exchange Rates</h2>
                        </header>

                        <div className="card-body">
                            {rates ? (
                                <ul className="list-unstyled m-0 fs-5">
                                    <li className="mb-2">1 BHD = <span className="fw-bold">{rates.usd}</span> USD</li>
                                    
                                    <li className="mb-2">1 BHD = <span className="fw-bold">{rates.gbp}</span> GBP</li>
                                    
                                    <li>1 BHD = <span className="fw-bold">{rates.eur}</span> EUR</li>
                                </ul>
                            ) : (
                                <p className="text-muted m-0">Loading rates...</p>
                            )}
                        </div>

                    </article>
                </div>

            </div>

        </main>
    )
}

export default Dashboard