import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGameById } from "../../managers/GameManager"

export const GameDetails = () => {
    const { gameId } = useParams()
    const [game, setGame] = useState({})
    const navigate = useNavigate()


    useEffect(
        () => {
            getGameById(gameId).then((data) => setGame(data))
        }, [gameId]
    )





    return <>
        <section key={`game--${game.id}`} className="game">
            <div className="game__title">{game.title} by {game.maker}</div>
            <div className="game__players">{game.number_of_players} players needed</div>
            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
            <button onClick={()=> navigate(`/games/update/${game.id}`)} className="btn">Update</button>
        </section>
    </>
}