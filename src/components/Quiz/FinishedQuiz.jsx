import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinalAnswersModal from "./FinalAnswersModal";
import DarkBackground from "../DarkBackground";
import { collection, doc, getDocs, getDocsFromServer, increment, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../features/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function FinishedQuiz({guesses, correctAnswers, wrongAnswers}) {
    const effectRan = useRef(false)
    const [wrongAnswersModalActive, setWrongAnswersModalActive] = useState(false)
    const [correctAnswersModalActive, setCorrectAnswersModalActive] = useState(false)

    useEffect(() => {
        if(effectRan.current === false) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // query the "users" collection to find the user document id
                    const q = query(collection(db, "users"), where("userId", "==", user.uid))
                    getDocsFromServer(q).then(data => data.forEach(element => {
                        // search the document with the user with its id
                        const userDocRef = doc(db, "users", element.data().documentId)
                        // update user document and increment answeredQuestions
                        updateDoc(userDocRef, {
                            answeredQuestions: increment(correctAnswers.length + wrongAnswers.length),
                            correctAnswers: increment(correctAnswers.length),
                            wrongAnswers: increment(wrongAnswers.length),
                            completedQuizzes: increment(1)
                        })
                    }))
                }
            })
        }
        return () => {
            effectRan.current = true;
        }
    }, [])

    return (
        <div className="flex flex-col w-full h-full lg:w-[52rem] sm:w-[40rem] sm:h-3/4 p-5 text-white bg-white fixed bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 sm:rounded-xl">
            <AnimatePresence>
                {/* modal with correct answers */}
                {
                    correctAnswersModalActive == true ? (
                        <>
                            <DarkBackground />
                            <FinalAnswersModal answers={correctAnswers} activeModal={setCorrectAnswersModalActive} />
                        </>
                    ) : null
                }

                {/* modal with wrong answers */}
                {
                    wrongAnswersModalActive == true ? (
                        <>
                            <DarkBackground />
                            <FinalAnswersModal answers={wrongAnswers} activeModal={setWrongAnswersModalActive} />
                        </>
                    ) : null
                }
            </AnimatePresence>
            <h2 className="p-2 text-center rounded-lg text-4xl bg-gradient-to-r from-pink-500 to-blue-500 text-green-100">You finished the quiz!</h2>
            <h3 className="my-3 text-2xl">Here's your results:</h3>
            <div className="mx-2 text-xl w-fit">
                <p onClick={() => setCorrectAnswersModalActive(true)} className="p-2 rounded-md mb-2 bg-green-400 cursor-pointer">
                    Correct answers: <span>{correctAnswers.length}</span>
                </p>
                <p onClick={() => setWrongAnswersModalActive(true)} className="p-2 rounded-md bg-red-400 cursor-pointer">
                    Wrong answers: <span>{wrongAnswers.length}</span>
                </p>
            </div>
            <Link to={"/my-quizzes"} className="text-lg mt-auto px-5 py-2 rounded-md h-11 self-center bg-gradient-to-r from-pink-500 to-blue-500" type="button">My Quizzes</Link>
        </div>
    )
}