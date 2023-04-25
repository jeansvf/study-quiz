import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../features/firebase-config"
import { motion } from "framer-motion";
import profilePic from "../../assets/profile_pic.png"
import { collection, getDocs, query, where } from "firebase/firestore";

export default function UserProfile() {
    const [userEmail, setUserEmail] = useState()
    const [userName, setUserName] = useState()
    const [createdQuizzes, setCreatedQuizzes] = useState([])
    const [completedQuizzes, setCompletedQuizzes] = useState()
    const [answeredQuestions, setAnsweredQuestions] = useState()
    const [correctRate, setCorrectRate] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if(user){
                setUserEmail(user.email)
                setUserName(user.displayName)
                getCreatedQuizzes(user.uid)
            }
        })
    }, [])

    const getCreatedQuizzes = async (uid) => {
        const q = query(collection(db, "quizzes"), where("quizOwner", "==", uid))
        const querySnapshot = await getDocs(q)
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
                <p className="opacity-70">Completed Quizzes: <span>23</span></p>
                <p className="opacity-70">Answered Questions: <span>80</span></p>
                <p className="opacity-70">Correct Answers Rate: <span>4.3/5</span></p>
            </motion.div>
        </div>
    )
}