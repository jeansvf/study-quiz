import { useState } from "react";
import { Link } from "react-router-dom";
import WrongAnswersModal from "./WrongAnswersModal";

export default function FinishedQuiz({correctAnswers, wrongAnswers}) {
    const [wrongAnswersModalActive, setWrongAnswersModalActive] = useState(false)
    return (
        <div className="flex flex-col w-2/4 h-3/4 p-5 bg-gray-500 fixed bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 rounded-md">
            {
                wrongAnswersModalActive == true ? (
                    <WrongAnswersModal wrongAnswers={wrongAnswers} setWrongAnswersModalActive={setWrongAnswersModalActive} />
                ) : null
            }
            <h2 className="p-2 text-center rounded-lg text-4xl bg-gradient-to-r from-green-400 to-blue-500 text-green-100">You finished the quiz!</h2>
            <h3 className="text-2xl m-3">Here's your results:</h3>
            <div className="m-3 text-xl w-fit">
                <p className="p-2 rounded-md mb-2 bg-green-400">
                    Correct answers: <span>{correctAnswers.length}</span>
                </p>
                <p onClick={() => {
                    setWrongAnswersModalActive(true)
                }} className="p-2 rounded-md bg-red-400">
                    Wrong answers: <span>{wrongAnswers.length}</span>
                </p>
            </div>
            <Link to={"/my-quizzes"} className="text-center mt-auto p-2 rounded-md w-1/3 self-center bg-gray-700" type="button">Go back to My Quizzes</Link>
        </div>
    )
}