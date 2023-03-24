import { useNavigate } from 'react-router-dom'

export default function QuizComponent({quiz}) {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col bg-emerald-300 w-96 h-56 m-6">
            <h2 className="px-2 py-1 text-xl">{quiz.quizName}</h2>
            <h2 className="px-2 py-1 text-white">{quiz.description}</h2>
            <button onClick={() => {
                navigate(`/quiz/${quiz.quizId}`)
            }} className="self-end hover:cursor-pointer bg-slate-500 w-12 m-4 mt-auto rounded-md">start</button>
        </div>
    )
}