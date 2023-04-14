import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../features/firebase-config"
import { motion } from "framer-motion";

export default function UserProfile() {
    const [userEmail, setUserEmail] = useState()
    const [userName, setUserName] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setUserEmail(user.email)
                setUserName(user.displayName)
            }
        })
    }, [])

    return (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center mt-8">
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
            className="flex flex-col items-center">
                <img src="https://placehold.co/100x100" alt="No Image" className="w-40 hover:opacity-50 cursor-pointer rounded-full"/>
                <span className="text-white text-3xl mt-3">{userName}</span>
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
            className="ml-8 text-white">
                <p className="opacity-60">E-mail: {userEmail}</p>
                <p className="opacity-60">Created Quizzes: 14</p>
                <p className="opacity-60">Completed Quizzes: <span>23</span></p>
                <p className="opacity-60">Answered Questions: <span>80</span></p>
                <p className="opacity-60">Correct Answers Rate: <span>4.3/5</span></p>
            </motion.div>
        </div>
    )
}