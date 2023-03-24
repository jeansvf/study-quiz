import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { db } from '../features/firebase-config';

export default function Quiz() {
    const params = useParams()
    const quizId = params.quizId
    const docRef = doc(db, "quizzes", quizId)

    const [quiz, setQuiz] = useState()

    useEffect(() => {
        getQuiz()
    }, [])

    const getQuiz = () => {
        getDoc(docRef).then((response) => {
        setQuiz(response.data())})
    }

    return (
        <div>
            {quiz ? (
                <>
                    <div>{quiz.quizName}</div>
                    <div>{quiz.description}</div>
                </>
            ) : (<div>loading...</div>)}
        </div>
    )
}