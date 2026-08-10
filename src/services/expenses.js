const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/expenses`

const index = async function () 
{
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const show = async function (expenseId)
{
  try {
    const res = await fetch(`${BASE_URL}/${expenseId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const create = async function (expenseFormData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseFormData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}


const deleteExpense = async function (expenseId) {
  try {
    const res = await fetch(`${BASE_URL}/${expenseId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function update(expenseId, expenseFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${expenseId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseFormData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}


export { 
    index,
    show,
    create,
    deleteExpense,
    update,
}