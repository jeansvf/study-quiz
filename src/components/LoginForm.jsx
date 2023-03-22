import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            signInWithEmailAndPassword(fire.auth, email, password)
        }} className="flex flex-col w-96" >
            <label htmlFor="email">E-mail</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="" />
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="" />
            <input type="submit" value="Login" className="hover:cursor-pointer" />
        </form>
    )
}