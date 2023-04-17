import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import FinalAnswersModal from "./FinalAnswersModal";
import DarkBackground from "../DarkBackground";

export default function FinishedQuiz({guesses, correctAnswers, wrongAnswers}) {
    const [wrongAnswersModalActive, setWrongAnswersModalActive] = useState(false)
    const [correctAnswersModalActive, setCorrectAnswersModalActive] = useState(false)
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