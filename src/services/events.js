const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/events`


const index = async function () 
{
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) 
  {
    console.log(error)
  }
}

const show = async function (eventId) 
{
  try {
    const res = await fetch(`${BASE_URL}/${eventId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) 
  {
    console.log(error)
  }
}

const create = async function (eventFormData)
{
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventFormData),
    })
    return res.json()
  } catch (error) 
  {
    console.log(error)
  }
}

const deleteEvent = async function (eventId)
{
  try {
    const res = await fetch(`${BASE_URL}/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return res.json()
  } catch (error) 
  {
    console.log(error)
  }
}

async function update(eventId, eventFormData) 
{
  try {
    const res = await fetch(`${BASE_URL}/${eventId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventFormData),
    })
    return res.json()
  } catch (error) 
  {
    console.log(error)
  }
}



export { 
    index,
    show,
    create,
    deleteEvent,
    update,
}