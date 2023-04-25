import { createEvent } from '../../managers/EventManager.js'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGamers } from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"

export const EventForm = () => {
    const navigate = useNavigate()
    const [gamers, setGamers] = useState([])
    const [games, setGames]= useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        gameId: "",
        description: "",
        time: "",
        date: "",
        location: "",
        gamerId: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
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
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId"onChange={changeEventState}>
                        <option value ="0" />
                        {games.map((game) => <option value= {game.id}id={game.id}>{game.title}</option>)}
                    </select>
                    
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gamerId">Hosted By: </label>
                    <select name="gamerId"onChange={changeEventState}>
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
                        location: currentEvent.location,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.gameId),
                        organizer: parseInt(currentEvent.gamerId)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}