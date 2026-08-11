import { Link } from "react-router"

const EventList = function (props) 
{
    if (props.events.length === 0)
    {
        return (

            <main className="card">

                <p>You haven't added any saving goals yet!</p>

            </main>
        )
    }

    return (
        <main className="expense-list">

            {props.events.map((event) => (
                
                <Link key={event._id} to={`/events/${event._id}`}>

                    <article className="card">

                        <header>
                            <h2>{event.name}</h2> 
                        </header>

                        <p className="expense-text">Target Amount: {event.targetAmount.toLocaleString()} BD</p>
                        
                        <p className="expense-text">Saved So Far: {event.savedAmount.toLocaleString()} BD</p>

                    </article>

                </Link>
            ))}

        </main>
    )
}

export default EventList