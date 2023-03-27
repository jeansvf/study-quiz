import { BsPlus } from 'react-icons/bs'

export default function AddQuestion({setQuizQuestions, quizQuestions}) {
    return (
        <button onClick={() => {
            setQuizQuestions([...quizQuestions, {}])
        }} className='flex items-center text-md mt-2' type="button">
            <BsPlus size={25} /> Add Question
        </button>
    )
}