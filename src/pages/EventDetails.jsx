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
            <main className="container mt-5 d-flex justify-content-center">

                <div className="loader"></div>

            </main>
        )
    }

    return (
        <main className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6">

                    <article className="card shadow-sm border-0 p-4">

                        <header>
                            <h2 className="fw-bold mb-3">{event.name}</h2>

                            <p className="fs-5 fw-bold text-secondary mb-2">Target Amount: {event.targetAmount.toLocaleString()} BD</p>

                            <p className="fs-4 fw-bold text-primary mb-3">Saved So Far: {event.savedAmount.toLocaleString()} BD</p>

                            <p className="text-muted small mb-4">
                                Created on <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                            </p>

                            {props.user && event.owner && (event.owner._id === props.user._id || event.owner === props.user._id) && (
                                <div className="d-flex gap-3 align-items-center mt-4 border-top pt-4 flex-wrap">

                                    {!isConfirming ? (
                                        <>
                                            <button className="btn btn-primary px-4" onClick={() => navigate(`/events/${eventId}/edit`)}>Edit</button>

                                            <button className="btn btn-outline-danger px-4" onClick={() => setIsConfirming(true)}>Delete</button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-danger fw-bold">Are you sure? </span>

                                            <button className="btn btn-danger px-3" onClick={() => props.handleDeleteEvent(eventId)}>Yes, Delete</button>

                                            <button className="btn btn-secondary px-3" onClick={() => setIsConfirming(false)}>Cancel</button>
                                        </>
                                    )}

                                </div>
                            )}

                        </header>

                    </article>

                </div>

            </div>

        </main>
    )
}

export default EventDetails