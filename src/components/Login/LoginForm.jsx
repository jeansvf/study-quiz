import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../features/firebase-config";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate()

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            signInWithEmailAndPassword(auth, email, password).then(() => navigate("/my-quizzes"))
        }} className="flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[98%] sm:w-auto">
            <h1 className="text-4xl pb-2">Log In</h1>
            <label className="pl-2 text-lg self-start font-medium" htmlFor="email">E-mail</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="w-[98%] sm:w-[27rem] h-14 border-black border-[3px] rounded-lg text-2xl pl-1" />
            <label className="pl-2 text-lg self-start font-medium pt-1" htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="w-[98%] sm:w-[27rem] h-14 border-black border-[3px] rounded-lg text-2xl pl-1" />
            <input type="submit" value="Login" className="bg-black text-white text-lg rounded-lg w-48 h-12 mt-7 cursor-pointer" />
            <Link className="p-6 font-bold text-[#5551ff]" to={"/register"}>Don't have an account yet? Register now!</Link>
        </form>
    )
}