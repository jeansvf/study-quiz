import CreateQuizButton from "../components/CreateQuizButton";
import QuizComponent from "../components/QuizComponent";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../features/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import CreateQuizModal from "../components/CreateQuizModal";

export default function MyQuizzes() {
    const effectRan = useRef(false)
    const [quizzes, setQuizzes] = useState()
    const [quizModalActive, setQuizModalActive] = useState()

    useEffect(() => {
        if(effectRan.current === false) {
        // if user is logged in, add quizzes to the quizzes state
        onAuthStateChanged(auth, (user) => {
            if(user) getQuizzes(user.uid)
        })
        return () => {
            effectRan.current = true;
        }
    }}, [])

    // add quizzes from the user to the quizzes state
    const getQuizzes = async (uid) => {
        setQuizzes([])
        const q = query(collection(db, "quizzes"), where("quizOwner", "==", uid))
        const querySnapshot = await getDocs(q)
        return querySnapshot.forEach(doc => {
            setQuizzes((prev) => [...prev, doc.data()])
        });
    }
    return (
        <>
            <h1 className="text-4xl m-4 text-center">My quizzes</h1>

            {/* render the modal to add quizzes */}
            {
                quizModalActive == true ? <CreateQuizModal setQuizModalActive={setQuizModalActive} getQuizzes={getQuizzes}/> : null
            }

            <main className="grid grid-cols-4">
                {/* render the quizzes from the quizzes state */}
                {
                    quizzes != undefined ? (
                        quizzes?.map((quiz) => {
                            return <QuizComponent quiz={quiz} key={quiz.quizId}/>
                        })
                    ) : (
                        <div className="absolute right-1/2 top-1/2 h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                        </div>
                    )
                }
            </main>

            <CreateQuizButton setQuizModalActive={setQuizModalActive} />
        </>
    )
}