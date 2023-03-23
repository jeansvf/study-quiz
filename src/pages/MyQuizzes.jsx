import CreateQuizButton from "../components/CreateQuizButton";
import QuizComponent from "../components/QuizComponent";

import {onAuthStateChanged} from "firebase/auth"
import { auth, db } from "../features/firebase-config"
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import CreateQuizModal from "../components/CreateQuizModal";

export default function MyQuizzes() {
    const effectRan = useRef(false)
    const [quizzes, setQuizzes] = useState([])
    const [quizModalActive, setQuizModalActive] = useState()

    useEffect(() => {
        if(effectRan.current === false) {
        onAuthStateChanged(auth, (user) => {
            if(user) getQuizzes(user.uid)
        })
        return () => {
            effectRan.current = true;
        }
    }
    }, [])

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

            {
                quizModalActive == true ? (
                    <CreateQuizModal setQuizModalActive={setQuizModalActive} getQuizzes={getQuizzes}/>
                ) : null
            }

            <main className="grid grid-cols-4">
                {
                    quizzes?.map((el) => {
                        return <QuizComponent quizName={el.quizName} description={el.description} />
                    })
                }
            </main>

            <button className="bg-slate-500 m-4 p-1" onClick={() => getQuizzes()}>render</button>
            <button onClick={() => {
                console.log(quizzes)
                console.log(uid)
            }}>test</button>
            <CreateQuizButton setQuizModalActive={setQuizModalActive} />
        </>
    )
}