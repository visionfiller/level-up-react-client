import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEvents } from "../../managers/EventManager"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (<>
    <button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        navigate({ pathname: "/events/new" })
    }}
>Register New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div>On {event.date} at {event.time}, we are playing {event.game}</div>
                        <div>This is being organized by {event.organizer}</div>
                        <div>The theme is {event.description}</div>
                        
                    </section>
                })
            }
        </article>
        </>
    )
}