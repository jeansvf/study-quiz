import { onAuthStateChanged } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { auth, db } from "../features/firebase-config"

export default function CreateQuizModal({setQuizModalActive, getQuizzes}) {
    const [quizName, setQuizName] = useState()
    const [quizDescription, setQuizDescription] = useState()
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    addDoc(collection(db, "quizzes"), {
                    quizName: quizName,
                    description: quizDescription,
                    quizOwner: user.uid,
                }).then(() => getQuizzes(user.uid))
            }})
            setQuizModalActive(false)
        }} className="bg-slate-400 w-2/6 h-1/2 absolute justify-center flex flex-col top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 rounded-md">
            <h1 className="text-4xl text-center">Create Quiz</h1>
            <button onClick={() => setQuizModalActive(false)} className="flex mr-1 absolute right-0 top-0">X</button>
            <label htmlFor="quiz-name" className="w-96 self-center">Quiz Name</label>
            <input onChange={(e) => {setQuizName(e.target.value)}} type="text" id="quiz-name" className="w-96 self-center m-1" />
            <label htmlFor="quiz-description" className="w-96 self-center">Quiz Description</label>
            <input onChange={(e) => {setQuizDescription(e.target.value)}} type="text" id="quiz-description" className="w-96 h-2/6 self-center m-1" />
            <input type="submit" value={"Done"} className="hover:cursor-pointer w-96 self-center m-1 bg-slate-900 text-white" />
        </form>
    )
}