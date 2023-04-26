import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createGame, getGameById, getGameTypes, updateGame } from '../../managers/GameManager.js'


export const UpdateGameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const [currentGame, setCurrentGame] = useState({
        title: "",
        maker: "",
        number_of_players: 0,
        skill_level: 0,
        game_type: 0
        
    })
    const {gameId} = useParams()
    useEffect(() => {
        getGameById(gameId).then((data) => setCurrentGame(data))
        getGameTypes().then((data) => setGameTypes(data))
    }, [])
   

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const newGame = {...currentGame}
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game Details</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                       value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select value={currentGame.game_type} name="game_type"onChange={changeGameState}>
                        <option value ="0" />
                        {gameTypes.map((gameType) => <option key={gameType.id} value={gameType.id}id={gameType.id}>{gameType.label}</option>)}
                    </select>
                    
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: currentGame.id,
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    updateGame(game)
                        .then(() => navigate(`/games/details/${game.id}`))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}