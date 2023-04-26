import { getEventById, updateEvent } from '../../managers/EventManager.js'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGamers } from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"

export const UpdateEventForm = () => {
    const navigate = useNavigate()
    const [gamers, setGamers] = useState([])
    const [games, setGames]= useState([])
    const {eventId} = useParams()
    const [currentEvent, setCurrentEvent] = useState({
        game: "",
        description: "",
        time: "",
        date: "",
        location: "",
        organizer: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getEventById(eventId).then((data) => setCurrentEvent(data))
        getGamers().then((data) => setGamers(data))
        getGames().then((data) => setGames(data))
        
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const newEvent = {...currentEvent}
        newEvent[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(newEvent)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Update Event Details</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select value = {currentEvent.game} name="game" onChange={changeEventState}>
                        
                        {games.map((game) => <option value= {game.id}id={game.id}>{game.title}</option>)}
                    </select>
                    
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gamerId">Hosted By: </label>
                    <select value={currentEvent.organizer} name="organizer"onChange={changeEventState}>
                        <option value ="0" />
                        {gamers.map((gamer) => <option value= {gamer.id}id={gamer.id}>{gamer.full_name}</option>)}
                    </select>
                    
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        id: currentEvent.id,
                        location: currentEvent.location,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.game),
                        organizer: parseInt(currentEvent.organizer)
                    }

                    // Send POST request to your API
                    updateEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}