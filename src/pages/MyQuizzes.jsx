import QuizComponent from "../components/MyQuizzes/QuizComponent";
import LoadingSvg from "../components/LoadingSvg";
import CreateQuizModal from "../components/MyQuizzes/CreateQuizModal";
import SideBar from "../components/SideBar";
import DarkBackground from "../components/DarkBackground";
import { BsPlus } from 'react-icons/bs';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../features/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from 'framer-motion';
import { useSideBarContext } from "../SideBarContext";

export default function MyQuizzes() {
    const effectRan = useRef(false)
    const [quizzes, setQuizzes] = useState()
    const [quizModalActive, setQuizModalActive] = useState(false)

    const { sideBarActive } = useSideBarContext();

    useEffect(() => {
        if(effectRan.current === false) {
        // if user is logged in, add quizzes to the quizzes state
        onAuthStateChanged(auth, (user) => {
            if(user) getQuizzes(user.uid)
        })
        return () => {
            effectRan.current = true;
        }}
    }, [])

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
            <AnimatePresence>
                {sideBarActive ? (
                    <>
                        <SideBar />
                        <DarkBackground />
                    </>
                ) : null}
            </AnimatePresence>
            <div className="mt-28">
                <AnimatePresence>
                    {/* render the modal to add quizzes */}
                    {
                        quizModalActive == true ? (
                            <>
                                <DarkBackground />
                                <CreateQuizModal setQuizModalActive={setQuizModalActive} getQuizzes={getQuizzes}/>
                            </>
                            ) : null
                    }
                </AnimatePresence>
                <main className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between gap-x-6 gap-y-6 m-6"}>
                    {/* render the quizzes from the quizzes state */}
                    {
                        quizzes != undefined ? (
                            quizzes?.map((quiz) => {
                                return <QuizComponent quiz={quiz} key={quiz.quizId} getQuizzes={getQuizzes}/>
                        })) : (
                            <LoadingSvg />
                        )
                    }
                </main>
                <BsPlus type="button" onClick={() => setQuizModalActive(true)} className="fixed p-2 right-0 bottom-0 m-8 hover:opacity-80 cursor-pointer rounded-full bg-[#353535]" color="#ffffff" size={60} />
            </div>
        </>
    )
}