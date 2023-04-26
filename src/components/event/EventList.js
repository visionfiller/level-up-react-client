import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllEvents()
    }, [])
const getAllEvents = ()=> {
    getEvents().then(data => setEvents(data))
}
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
                        <div>The theme is {event.description}</div>
                        <button onClick={()=> navigate(`/events/details/${event.id}`)} className="btn">Event Details</button>
                        <button onClick={() => deleteEvent(event.id).then(getAllEvents)} className="btn">Delete</button>
                        {event.joined ? <button onClick={()=> leaveEvent(event.id).then(getAllEvents) }>Leave</button> 
                        :<button onClick={()=> joinEvent(event.id).then(getAllEvents)}>Join</button>}
                    </section>
                })
            }
        </article>
        </>
    )
}