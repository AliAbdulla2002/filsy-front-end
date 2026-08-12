import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

import * as eventService from '../services/events'

const EventForm = function (props)
{
    const { eventId } = useParams()

    const initialState = {
        name: '',

        targetAmount: '',

        savedAmount: 0,
    }

    const [formData, setFormData] = useState(initialState)

  const handleChange = function (event)
  {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = function (evt)
  {
    evt.preventDefault()

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
    <main className="container mt-5">

        <div className="row justify-content-center">

            <div className="col-12 col-md-8 col-lg-6">

                <div className="card shadow-sm border-0 p-4">

                    <h1 className="text-center mb-4 fs-3 fw-bold">{eventId ? 'Edit Goal' : 'New Goal'}</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Goal Name</label>
                            <input required type='text' className="form-control" name='name' value={formData.name} onChange={handleChange}/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Target Amount</label>
                            <input required type='number' className="form-control" name='targetAmount' value={formData.targetAmount} onChange={handleChange}/>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Saved Amount</label>
                            <input required type='number' className="form-control" name='savedAmount' value={formData.savedAmount} onChange={handleChange}/>
                        </div>

                        <button type='submit' className="btn btn-primary w-100 fw-bold p-2">SUBMIT</button>

                    </form>

                </div>

            </div>

        </div>

    </main>
  )
}

export default EventForm