import { useParams, useNavigate } from "react-router"

import { useState, useEffect } from "react"

import * as eventService from '../services/events'

const EventDetails = function (props)
{
    const navigate = useNavigate()

    const { eventId } = useParams()

    const [event, setEvent] = useState(null)

    const [isConfirming, setIsConfirming] = useState(false)

    useEffect(function ()
    {
        const fetchEvent = async function ()
        {
            const eventData = await eventService.show(eventId)

            setEvent(eventData)
        }
        fetchEvent()
    }, [eventId])

    if (!event)
    {
        return (
            <main>

                <div className="loader"></div>

            </main>
        )
    }

    return (
        <article className="card">

            <header>
                <h2>{event.name}</h2>

                <p className="expense-text">Target Amount: {event.targetAmount} BD</p>

                <p className="expense-text">Saved So Far: {event.savedAmount} BD</p>

                <p className="expense-date">
                    Created on <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                </p>

                {props.user && event.owner && (event.owner._id === props.user._id || event.owner === props.user._id) && (
                    <div className="actions">

                        {!isConfirming ? (
                            <>
                                <button onClick={() => navigate(`/events/${eventId}/edit`)}>Edit</button>

                                <button onClick={() => setIsConfirming(true)}>Delete</button>
                            </>
                        ) : (
                            <>
                                <span>Are you sure? </span>

                                <button onClick={() => props.handleDeleteEvent(eventId)}>Yes, Delete</button>

                                <button onClick={() => setIsConfirming(false)}>Cancel</button>
                            </>
                        )}

                    </div>
                )}

            </header>

        </article>
    )
}

export default EventDetails