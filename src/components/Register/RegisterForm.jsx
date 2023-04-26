import { useState } from "react";
import { auth, db } from "../../features/firebase-config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";

export default function LoginForm() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    const navigate = useNavigate()

    const createNewUser = () => {
        createUserWithEmailAndPassword(auth, email, password).then((credentials) => {
            updateProfile(credentials.user, {
                // TODO: change displayname place maybe?
                displayName: name,
            })
            return credentials
        })
        .then((credentials) => {
            let newDocRef = doc(collection(db, "users"))
            setDoc(newDocRef, {
                answeredQuestions: 0,
                correctAnswers: 0,
                documentId: newDocRef.id,
                userId: credentials.user.uid,
                wrongAnswers: 0,
            })
        })
        .then(() => navigate("/my-quizzes"))
    }

    return (    
        <form onSubmit={(e) => {
            e.preventDefault()
            createNewUser()
        }} className="flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-auto">
            <h1 className="text-4xl pb-2">Create Account</h1>
            <label className="pl-2 text-lg self-start font-medium" htmlFor="name">Name</label>
            <input onChange={(e) => setName(e.target.value)} type="text" id="name" className="w-full sm:w-[27rem] h-14 border-black border-[3px] rounded-lg text-2xl pl-1" />
            <label className="pl-2 text-lg self-start font-medium pt-1" htmlFor="email">E-mail</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="w-full sm:w-[27rem] h-14 border-black border-[3px] rounded-lg text-2xl pl-1" />
            <label className="pl-2 text-lg self-start font-medium pt-1" htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="w-full sm:w-[27rem] h-14 border-black border-[3px] rounded-lg text-2xl pl-1" />
            <label className="pl-2 text-lg self-start font-medium pt-1" htmlFor="confirm-password">Confirm Your Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="confirm-password" className="w-full sm:w-[27rem] h-14 border-black border-[3px] rounded-lg text-2xl pl-1" />
            <input type="submit" value="Register" className="bg-black text-white text-lg rounded-lg w-48 h-12 mt-7 cursor-pointer" />
            <Link className="p-6 font-bold text-[#5551ff]" to={"/login"}>Already have an account? Log in</Link>
        </form>
    )
}