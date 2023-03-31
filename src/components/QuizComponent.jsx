import { useNavigate } from 'react-router-dom'

export default function QuizComponent({quiz}) {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col bg-zinc-700 rounded-xl w-5/6 h-56 m-6">
            <div className='flex bg-zinc-600 rounded-tr-xl rounded-tl-xl h-1/4'>
                <h2 className="px-2 py-1 text-3xl text-gray-100 self-center">{quiz.quizName}</h2>
            </div>
                <h3 className="px-2 py-1 text-white">{quiz.description}</h3>
            <button onClick={() => {
                navigate(`/quiz/${quiz.quizId}`)
            }} className="w-1/6 p-1 mt-auto ml-auto mb-2 mr-2 text-xl text-black hover:cursor-pointer bg-green-400 hover:bg-green-300 rounded-md">start</button>
        </div>
    )
}