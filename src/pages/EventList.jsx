import { Link } from "react-router"

const EventList = function (props)
{
    if (props.events.length === 0)
    {
        return (

            <main className="container mt-5">

                <div className="card shadow-sm border-0 text-center p-5">
                    <p className="fs-5 text-muted m-0">You haven't added any saving goals yet!</p>
                </div>

            </main>
        )
    }

    return (
        <main className="container mt-4 mb-5">

            <div className="row g-4">

                {props.events.map((event) => (

                    <div key={event._id} className="col-12 col-md-6 col-lg-4">

                        <Link to={`/events/${event._id}`} className="text-decoration-none">

                            <article className="card h-100 shadow-sm border-0 p-4">

                                <header className="mb-3">
                                    <h2 className="fs-5 fw-bold text-dark m-0">{event.name}</h2>
                                </header>

                                <p className="fs-6 fw-bold text-secondary mb-2">Target Amount: {event.targetAmount.toLocaleString()} BD</p>

                                <p className="fs-5 fw-bold text-primary m-0">Saved So Far: {event.savedAmount.toLocaleString()} BD</p>

                            </article>

                        </Link>
                        
                    </div>
                ))}

            </div>

        </main>
    )
}

export default EventList