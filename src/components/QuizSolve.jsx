import { useState } from "react"

export default function QuizSolve ({quiz}) {

    const [actualQuestion, setActualQuestion] = useState(0)

    const checkQuestion = (answer) => {

        
        if (quiz.questions[actualQuestion].rightAnswer == answer) {
            console.log("right");
        } else {
            console.log("wrong");
        }
        
        if(actualQuestion + 1 == quiz.questions.length) {
            // todo: end the quiz
            return
        }

        // go to next question
        setActualQuestion(prev => prev + 1)
    }

    return (
        <div className="flex flex-col w-2/4 h-3/4 bg-gray-500 fixed bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 rounded-md">
            <h1 className="text-4xl mt-2 ml-3">{quiz.quizName}</h1>
            <p className="text-xl m-3">{actualQuestion + 1 + " - "}{quiz.questions[actualQuestion].text}</p>
            <div className="grid grid-cols-2 gap-1 m-1 mt-auto text-xl">
                <button onClick={(e) => checkQuestion("a")} className="bg-gray-700 h-8" type="button">{quiz.questions[actualQuestion].a}</button>
                <button onClick={(e) => checkQuestion("b")} className="bg-gray-700 h-8" type="button">{quiz.questions[actualQuestion].b}</button>
                <button onClick={(e) => checkQuestion("c")} className="bg-gray-700 h-8" type="button">{quiz.questions[actualQuestion].c}</button>
                <button onClick={(e) => checkQuestion("d")} className="bg-gray-700 h-8" type="button">{quiz.questions[actualQuestion].d}</button>
            </div>
        </div>
    )
}