import CreateQuizButton from "../components/CreateQuizButton";
import QuizComponent from "../components/QuizComponent";

import {onAuthStateChanged} from "firebase/auth"
import { auth, db } from "../features/firebase-config"
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function MyQuizzes() {
    const [finalQuery, setFinalQuery] = useState([])
    useEffect(() => {
        renderQuizzes()
    }, [])
    const renderQuizzes = async () => {
        const q = query(collection(db, "quizzes"), where("quizOwner", "==", "HspUCmIgy8d7rWqEpIIvtQDNlLC3"))
        const querySnapshot = await getDocs(q)
        return querySnapshot.forEach(doc => {
            setFinalQuery((prev) => [...prev, doc.data()])
        });
    }
    return (
        <>
            <h1 className="text-4xl m-4 text-center">My quizzes</h1>

            {
                finalQuery?.map((el) => {
                    renderQuizzes()
                    return <QuizComponent quizName={el.quizName} description={el.description} />
                })
            }

            <button className="bg-slate-500 m-4 p-1" onClick={() => renderQuizzes()}>render</button>
            <button className="bg-slate-500 m-4 p-1" onClick={() => {
                addDoc(collection(db, "quizzes"), {
                    quizName: "PEPERONI QUIZZZZZZZ",
                    description: "AAAAAAAAAAAAAAAAAAAAAA",
                    quizOwner: auth.currentUser.uid,
                })
            }}>create</button>
            <button onClick={() => {
                console.log(finalQuery)
            }}>test</button>
            <CreateQuizButton />
        </>
    )
}