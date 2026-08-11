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
        <main className="card">
            
            <header>

                <h2>Currency Converter</h2>
                
            </header>

            <label>Amount in BHD</label>
            <input type="number" value={amount} onChange={handleChange} min="0" />

            {rates ? (
                <div>
                    <p className="expense-text">{amount || 0} BHD = {((amount || 0) * rates.usd).toFixed(2)} USD</p>

                    <p className="expense-text">{amount || 0} BHD = {((amount || 0) * rates.gbp).toFixed(2)} GBP</p>

                    <p className="expense-text">{amount || 0} BHD = {((amount || 0) * rates.eur).toFixed(2)} EUR</p>
                </div>
            ) : (
                <p>Loading rates...</p>
            )}

        </main>
    )
}

export default CurrencyConverter