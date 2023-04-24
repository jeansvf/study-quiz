import { useState } from "react"
import FinishedQuiz from "./FinishedQuiz"

export default function QuizSolve ({quiz}) {

    const [actualQuestion, setActualQuestion] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [wrongAnswers, setWrongAnswers] = useState([])
    const [typedAnswer, setTypedAnswer] = useState("")

    const checkQuestion = (answer) => {

        // if question is guessed right, add to correctAnswers
        if (quiz.questions[actualQuestion].rightAnswer == answer) {
            setCorrectAnswers(prev => [...prev, quiz.questions[actualQuestion]])
        } else {
            // get the guessed alternative
            let answeredQuestion = quiz.questions[actualQuestion]
            answeredQuestion.yourGuess = answer
            setWrongAnswers([...wrongAnswers, answeredQuestion])
        }

        // go to next question
        setActualQuestion(prev => prev + 1)
    }

    return (
        <>
        {
            quiz.questions[actualQuestion]?.questionType == "multiple-choice" ? (
                <div>
                    {actualQuestion + 1 <= quiz.questions.length ? (
                    <div className="flex flex-col w-full h-full lg:w-[60rem] sm:w-[40rem] sm:h-5/6 bg-white fixed bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 rounded-md">
                        <h1 className="text-4xl my-3 mx-4 text-[#353535]">{quiz.quizName}</h1>
                        <p className="text-xl mx-4 text-black">{actualQuestion + 1 + " - "}{quiz.questions[actualQuestion].text}</p>
                        <div className="grid grid-cols-2 gap-1 m-3 mt-auto text-xl text-white">
                            <button onClick={(e) => checkQuestion("a")} className="bg-[#353535] h-8 rounded-tl-lg" type="button">{quiz.questions[actualQuestion].a}</button>
                            <button onClick={(e) => checkQuestion("b")} className="bg-[#353535] h-8 rounded-tr-lg" type="button">{quiz.questions[actualQuestion].b}</button>
                            <button onClick={(e) => checkQuestion("c")} className="bg-[#353535] h-8 rounded-bl-lg" type="button">{quiz.questions[actualQuestion].c}</button>
                            <button onClick={(e) => checkQuestion("d")} className="bg-[#353535] h-8 rounded-br-lg" type="button">{quiz.questions[actualQuestion].d}</button>
                        </div>
                    </div>
                ) : null}
            </div>
        ) : 
            <div>
                {actualQuestion + 1 <= quiz.questions.length ? (
                    <div className="flex flex-col w-full h-full lg:w-[60rem] sm:w-[40rem] sm:h-5/6 bg-white fixed bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 rounded-md">
                        <h1 className="text-4xl my-3 mx-4 text-[#353535]">{quiz.quizName}</h1>
                        <p className="text-xl mx-4 text-black">{actualQuestion + 1 + " - "}{quiz.questions[actualQuestion].text}</p>
                        <div className="flex w-full mt-auto">
                            <textarea onKeyDown={(e) => e.key == "Enter" ? checkQuestion(typedAnswer.toLowerCase()) : null} onChange={(e) => setTypedAnswer(e.target.value)} autoFocus className="w-full m-3 pl-1 resize-none h-16 text-xl rounded-md bg-[#f1f1f1]" placeholder="Type your answer" />
                            <button onClick={() => checkQuestion(typedAnswer.toLowerCase())} className="mr-3 mb-3 mt-3 px-3 rounded-md bg-[#353535] text-white" type="button">Done</button>
                        </div>
                    </div>
                ) : null}
                {actualQuestion + 1 > quiz.questions.length ? (
                    <FinishedQuiz correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} />
                ) : null}
            </div>
        }
        </>
    )
}