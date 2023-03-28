import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../features/firebase-config";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate()

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            signInWithEmailAndPassword(auth, email, password).then(() => navigate("/my-quizzes"))
        }} className="flex flex-col w-96" >
            <label htmlFor="email">E-mail</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="text-black" />
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="text-black" />
            <input type="submit" value="Login" className="hover:cursor-pointer" />
        </form>
    )
}