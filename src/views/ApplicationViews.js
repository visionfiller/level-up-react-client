import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/event/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/event/EventForm"
import { UpdateGameForm } from "../components/game/UpdateForm"
import { UpdateEventForm } from "../components/event/UpdateEventForm"
import { GameDetails } from "../components/game/GameDetails"
import { EventDetails } from "../components/event/EventDetails"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} />
                <Route path="/games" element={<GameList />} />
                <Route path="/games/details/:gameId" element={<GameDetails />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/games/update/:gameId" element={<UpdateGameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/events/details/:eventId" element={<EventDetails />} />
                <Route path="/events/update/:eventId" element={<UpdateEventForm />} />
            </Route>
        </Routes>
    </>
}