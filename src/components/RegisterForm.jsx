import { useState } from "react";
import { auth, db } from "../features/firebase-config"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function LoginForm() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const createNewUser = () => {
        createUserWithEmailAndPassword(auth, email, password).then((credentials) => {
            setDoc(doc(db, "users", credentials.user.uid), {
                userName: "rob",
            })
        })
    }
    
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            createNewUser()
        }} className="flex flex-col w-96" >
            <label htmlFor="email">E-mail</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="text-black" />
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="text-black" />
            <input type="submit" value="Sign In" className="hover:cursor-pointer" />
        </form>
    )
}