import { useState } from "react";
import { auth } from "../../features/firebase-config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    const navigate = useNavigate()

    const createNewUser = () => {
        createUserWithEmailAndPassword(auth, email, password).then((credentials) => {
            updateProfile(credentials.user, {
                displayName: name,
            })
            
        }).then(() => navigate("/my-quizzes"))
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            createNewUser()
        }} className="flex flex-col w-96 text-white">
            <label htmlFor="email">Name</label>
            <input onChange={(e) => setName(e.target.value)} type="text" id="name" className="text-black" />
            <label htmlFor="email">E-mail</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="text-black" />
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="text-black" />
            <input type="submit" value="Sign In" className="hover:cursor-pointer" />
        </form>
    )
}