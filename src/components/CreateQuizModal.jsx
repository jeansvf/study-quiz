import { onAuthStateChanged } from "firebase/auth"
import { collection, doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { MdClose } from "react-icons/md"
import { auth, db } from "../features/firebase-config"
import AddQuestion from "./AddQuestion"

export default function CreateQuizModal({setQuizModalActive, getQuizzes}) {
    const [quizName, setQuizName] = useState()
    const [quizDescription, setQuizDescription] = useState()
    const [quizQuestions, setQuizQuestions] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
            // checks if the user is authenticated
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    let newDocRef = doc(collection(db, "quizzes"))
                    // creates a new document
                    setDoc(newDocRef, {
                        quizId: newDocRef.id,
                        quizName: quizName,
                        description: quizDescription,
                        quizOwner: user.uid,
                        questions: quizQuestions,
                    })
                // re-fetch the data into the quizzes variable
                getQuizzes(user.uid)
            }})
            setQuizModalActive(false)
    }

    return (
        <form onSubmit={(e) => {
            handleSubmit(e)
        }} className="bg-slate-400 p-4 w-8/12 h-4/6 fixed flex flex-col top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 rounded-md">
            <h1 className="text-4xl text-center">Create Quiz</h1>
            <MdClose onClick={() => setQuizModalActive(false)} className="flex absolute right-1 top-1 cursor-pointer" size={30} />
            <label htmlFor="quiz-name" className="w-96">Quiz Name</label>
            <input onChange={(e) => {setQuizName(e.target.value)}} type="text" id="quiz-name" className="w-full text-black" />
            <label htmlFor="quiz-description" className="w-96">Quiz Description</label>
            <textarea onChange={(e) => {setQuizDescription(e.target.value)}} type="text" id="quiz-description" className="w-full h-1/6 resize-none text-black" />
            {
                quizQuestions?.map((question, index) => {
                    return (
                        <div className="mb-4 text-black items-start">
                            <div className="flex items-center">
                                <span className="bg-slate-600 text-slate-500 text-center w-6 h-6 mr-3">{index + 1}</span>
                                <input autoFocus onChange={(e) => question.text = e.target.value} className="flex w-1/2 mb-2 mt-2 placeholder:pl-1" type="text" placeholder="Question"/>
                            </div>
                            <input onChange={(e) => question.a = e.target.value} type="text" placeholder="Alternative A" className="mr-1 placeholder:pl-1" />
                            <input onChange={(e) => question.b = e.target.value} type="text" placeholder="Alternative B" className="mr-1 placeholder:pl-1" />
                            <input onChange={(e) => question.c = e.target.value} type="text" placeholder="Alternative C" className="mr-1 placeholder:pl-1" />
                            <input onChange={(e) => question.d = e.target.value} type="text" placeholder="Alternative D" className="mr-1 placeholder:pl-1" />
                            <input onChange={(e) => {
                                let answer = e.target.value.toLowerCase().toString()
                                if(answer === "a" || answer === "b" || answer === "c" || answer === "d") {
                                    question.rightAnswer = e.target.value
                                }
                            }} type="text" placeholder="Correct Answer (ex: a)" className="mt-1 placeholder:pl-1" />
                        </div>
                    )
                })
            }
            <AddQuestion setQuizQuestions={setQuizQuestions} quizQuestions={quizQuestions}/>
            <input type="submit" value={"Done"} className="hover:cursor-pointer w-16 h-8 bg-slate-900 text-white self-end justify-self-end" />
        </form>
    )
}