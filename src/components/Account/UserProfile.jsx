import { useEffect, useState } from "react";
import { auth, db } from "../../features/firebase-config"
import { motion } from "framer-motion";
import profilePic from "../../assets/profile_pic.png"
import { collection, getDocsFromServer, query, where } from "firebase/firestore";
import { useRef } from "react";

export default function UserProfile() {
    const effectRan = useRef(false)

    const [userName, setUserName] = useState()
    const [createdQuizzes, setCreatedQuizzes] = useState([])
    const [completedQuizzes, setCompletedQuizzes] = useState()
    const [answeredQuestions, setAnsweredQuestions] = useState()
    const [wrongAnswers, setWrongAnswers] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [rating, setRating] = useState(0)

    useEffect(() => {
        if(effectRan.current === false) {
            setUserName(auth.currentUser.displayName)
            getCreatedQuizzes(auth.currentUser.uid)

            const q = query(collection(db, "users"), where("userId", "==", auth.currentUser.uid))
                getDocsFromServer(q).then(data => data.forEach((e) => {
                    setCompletedQuizzes(e.data().completedQuizzes)
                    setAnsweredQuestions(e.data().answeredQuestions)
                    setCorrectAnswers(e.data().correctAnswers)
                    setWrongAnswers(e.data().wrongAnswers)
            }))
        }
    }, [])

    useEffect(() => {setRating((correctAnswers / answeredQuestions * 5).toString().substring(0, 3))}, [correctAnswers])

    const getCreatedQuizzes = async (uid) => {
        const q = query(collection(db, "quizzes"), where("quizOwner", "==", uid))
        const querySnapshot = await getDocsFromServer(q)
        querySnapshot.forEach(doc => {
            setCreatedQuizzes((prev) => [...prev, doc.data()])
        })
    }

    return (
        <div className="flex flex-col items-center absolute left-1/2 top-20 -translate-x-1/2 sm:w-fit h-[14rem] sm:flex-row mt-8">
            <motion.div
            initial={{
                scale: 0,
            }}
            animate={{
                y: 0,
                scale: 1,
            }}
            transition={{
                ease: "circOut",
                duration: .6
            }}
            className="flex flex-col items-center w-40">
                <img src={profilePic} alt="No Image" className="hover:opacity-50 cursor-pointer rounded-full"/>
                <motion.span className="text-3xl mt-2 text-center">{userName}</motion.span>
            </motion.div>
            <motion.div
            initial={{
                y: "-14%",
                opacity: 0
            }}
            animate={{
                y: 0,
                scale: 1,
                opacity: 1,
            }}
            transition={{
                ease: "easeOut",
                duration: .3,
                delay: .2
            }}
            className="flex flex-col sm:ml-8 mx-auto mt-4 sm:mt-0 sm:mx-0 items-center sm:items-start self-center w-fit-content text-lg">
                <p className="opacity-70">Created Quizzes: {createdQuizzes.length}</p>
                <p className="opacity-70">Completed Quizzes: {completedQuizzes}</p>
                <p className="opacity-70">Answered Questions: {answeredQuestions}</p>
                <p className="opacity-70">Answers Score: {rating}</p>
            </motion.div>
        </div>
    )
}