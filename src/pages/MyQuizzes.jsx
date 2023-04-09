import QuizComponent from "../components/QuizComponent";
import LoadingSvg from "../components/LoadingSvg";
import CreateQuizModal from "../components/CreateQuizModal";
import { RiAddFill } from 'react-icons/ri'

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../features/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from 'framer-motion'

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
        <div className="overscroll-none">
            <AnimatePresence>
                {/* render the modal to add quizzes */}
                {
                    quizModalActive == true ? (
                        <CreateQuizModal setQuizModalActive={setQuizModalActive} getQuizzes={getQuizzes}/>
                        ) : null
                    }
            </AnimatePresence>

            <h1 className="text-4xl m-4 text-center text-white">My quizzes</h1>

            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between gap-x-6 gap-y-6 m-6">
                {/* render the quizzes from the quizzes state */}
                {
                    quizzes != undefined ? (
                        quizzes?.map((quiz) => {
                            return <QuizComponent quiz={quiz} key={quiz.quizId} getQuizzes={getQuizzes}/>
                        })
                    ) : (
                        <LoadingSvg />
                    )
                }
            </main>

            <RiAddFill type="button" onClick={() => setQuizModalActive(true)} className="fixed right-0 bottom-0 m-8  hover:fill-teal-400 hover:cursor-pointer" color="#14b8a6" size={60} />
        </div>
    )
}