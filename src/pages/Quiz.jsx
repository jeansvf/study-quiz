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

    // start quiz
    const solveQuiz = () => {
        
        return (
            <QuizSolve quiz={quiz}/>
        )
    }

    return (
        <main className='w-full h-screen'>
            {quiz ? (
                solveQuiz()
            ) : (<div>loading...</div>)}
        </main>
    )
}