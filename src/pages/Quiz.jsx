import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import QuizSolve from '../components/QuizSolve';
import { db } from '../features/firebase-config';

export default function Quiz() {
    const params = useParams()
    const quizId = params.quizId
    const docRef = doc(db, "quizzes", quizId)

    const [quiz, setQuiz] = useState()

    // set the quiz variable to the value of the selected quiz
    useEffect(() => {
        getQuiz()
    }, [])

    const getQuiz = () => {
        getDoc(docRef).then((response) => {
        setQuiz(response.data())})
    }

    return (
        <main className='w-full h-screen'>
            {quiz ? (
                // start quiz
                <QuizSolve quiz={quiz}/>
            ) : (
                <div className="absolute right-1/2 top-1/2 h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            )}
        </main>
    )
}