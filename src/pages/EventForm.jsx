import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import * as eventService from '../services/events'

const EventForm = function (props)  
{
    const { eventId } = useParams()

    const initialState = {
        
        name: '',

        targetAmount: '',
    }

    const [formData, setFormData] = useState(initialState)

  const handleChange = function (event)
  {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = function (event)
  {
    event.preventDefault()

    if (eventId) 
    {
        props.handleUpdateEvent(eventId, formData)
    } else 
    {
        props.handleAddEvent(formData)
    }
  }

  useEffect(function ()
  {
    const fetchEvent = async function ()
    {
        const eventData = await eventService.show(eventId)

        setFormData(eventData)
    }

    if (eventId) fetchEvent()
    
    return () => setFormData(initialState)}, [eventId])

  return (
    <main className='card'>

    <h1>{eventId ? 'Edit Goal' : 'New Goal'}</h1>

      <form onSubmit={handleSubmit}>

        <label>Goal Name</label>
        <input required type='text' name='name' value={formData.name} onChange={handleChange}/>
        
        <label>Target Amount</label>
        <input required type='number' name='targetAmount' value={formData.targetAmount} onChange={handleChange}/>

        <button type='submit'>SUBMIT</button>

      </form>

    </main>
  )
}

export default EventForm