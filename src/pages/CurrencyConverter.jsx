import { useState, useEffect } from "react"

import * as exchangeRateService from '../services/exchangeRates'

const CurrencyConverter = function ()
{
    const [rates, setRates] = useState()

    const [amount, setAmount] = useState(1)

    useEffect(function ()
    {
        const fetchRates = async function ()
        {
            const data = await exchangeRateService.getRates()

            if (data && data.bhd)
            {
                setRates(
                {
                    usd: data.bhd.usd,

                    gbp: data.bhd.gbp,

                    eur: data.bhd.eur,
                })
            }
        }
        fetchRates()
    }, [])

    const handleChange = function (event)
    {
        setAmount(event.target.value)
    }

    return (
        <main className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6">

                    <div className="card shadow-sm border-0 p-4">

                        <header>

                            <h2 className="text-center mb-4 fw-bold">Currency Converter</h2>

                        </header>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Amount in BHD</label>
                            <input type="number" className="form-control form-control-lg" value={amount} onChange={handleChange} min="0" />
                        </div>

                        {rates ? (
                            <div className="bg-light p-4 rounded text-center">
                                <p className="fs-5 fw-bold text-dark mb-3">{amount || 0} BHD = <span className="text-primary">{((amount || 0) * rates.usd).toFixed(2)} USD</span></p>

                                <p className="fs-5 fw-bold text-dark mb-3">{amount || 0} BHD = <span className="text-primary">{((amount || 0) * rates.gbp).toFixed(2)} GBP</span></p>

                                <p className="fs-5 fw-bold text-dark m-0">{amount || 0} BHD = <span className="text-primary">{((amount || 0) * rates.eur).toFixed(2)} EUR</span></p>
                            </div>
                        ) : (
                            <p className="text-center text-muted mt-3">Loading rates...</p>
                        )}

                    </div>

                </div>

            </div>

        </main>
    )
}

export default CurrencyConverter