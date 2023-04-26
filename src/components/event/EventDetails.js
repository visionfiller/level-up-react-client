import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEventById } from "../../managers/EventManager"

export const EventDetails = () => {
    const { eventId } = useParams()
    const [event, setEvent] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getEventById(eventId).then((data) => setEvent(data))
    }, [eventId])


return <>
    <div>On {event.date} at {event.time}, we are playing {event.game}</div>
    <div>This is being organized by {event.organizer}</div>
    <div>The theme is {event.description}</div>
    <button onClick={() => navigate(`/events/update/${event.id}`)} className="btn">Update</button>
   
    </>
}