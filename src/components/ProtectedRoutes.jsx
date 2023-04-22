import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../features/firebase-config"
import { Outlet, useNavigate } from "react-router-dom"
import Login from "../pages/Login"
import { useState } from "react"

export default function ProtectedRoutes() {
    const [isAuth, setIsAuth] = useState(false)
    onAuthStateChanged(auth, (user) => user ? setIsAuth(true) : setIsAuth(false))

    return isAuth ? <Outlet /> : <Login />
}