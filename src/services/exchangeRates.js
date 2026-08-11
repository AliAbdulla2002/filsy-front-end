const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/bhd.json'

const getRates = async function () 
{
    try 
    {
        const res = await fetch(BASE_URL)

        return res.json()
    }

    catch (error) 
    {
        console.log(error)
    }
}

export { 
    getRates,
}