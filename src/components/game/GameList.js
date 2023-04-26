import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteGame, getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
       getAllGames()
    }, [])

const getAllGames = () => {
    getGames().then(data => setGames(data))
}
    return (<>
        <button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        navigate({ pathname: "/games/new" })
    }}
>Register New Game</button>

        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <button onClick={()=> navigate(`/games/details/${game.id}`)} className="btn">Game Details</button>
                        <button onClick={() => deleteGame(game.id).then(getAllGames)} className="btn">Delete</button>
                    </section>
                })
            }
        </article>
        </>
    )
}