import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../features/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'

export default function QuizComponent({quiz, getQuizzes}) {
    const [quizStartWarning, setQuizStartWarning] = useState(false)
    const [removeQuizWarning, setRemoveQuizWarning] = useState(false)

    const navigate = useNavigate()
    return (
        <>
        <AnimatePresence>
            {
                quizStartWarning ? (
                    <motion.div
                    initial={{
                        opacity: 0,
                        scale: .4,
                        x: "-50%",
                        y: "-50%"
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        scale: .4,
                    }}
                    transition={{
                        duration: .1,
                    }}
                    className='flex flex-col fixed top-1/2 left-1/2 rounded-xl h-48 w-80 bg-zinc-900 p-3'>
                        <p className='text-2xl text-white'>Are you sure you want to start <span className='text-blue-500'>{quiz.quizName}</span> ?</p>
                        <p className='text-base text-white opacity-50 my-1'>(All the answers will affect your stats)</p>
                        <div className='flex mt-auto justify-between'>
                            <button onClick={() => setQuizStartWarning(false)} type='button' className='w-5/12 h-12 bg-red-400 text-white rounded-md text-lg'>Cancel</button>
                            <button onClick={() => navigate(`/quiz/${quiz.quizId}`)} type='button' className='w-5/12 h-12 bg-green-400 text-white rounded-md text-lg'>Start</button>
                        </div>
                    </motion.div>
                ) : null
            }
            {
                removeQuizWarning ? (
                    <motion.div
                    initial={{
                        opacity: 0,
                        scale: .4,
                        x: "-50%",
                        y: "-50%"
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        scale: .4,
                    }}
                    transition={{
                        duration: .1,
                    }}
                    className='flex flex-col fixed top-1/2 left-1/2 rounded-xl h-48 w-80 bg-zinc-900 p-3'>
                        <p className='text-2xl text-white'>Delete <span className='text-blue-500'>{quiz.quizName}</span> ?</p>
                        <p className='text-red-400 my-1'>Deleted quizzes cannot be recovered!</p>
                        <div className='flex mt-auto justify-between'>
                            <button onClick={() => setRemoveQuizWarning(false)} type='button' className='w-5/12 h-12 bg-gray-400 text-white rounded-md text-lg'>Cancel</button>
                            <button onClick={() => {
                                setRemoveQuizWarning(false)
                                onAuthStateChanged(auth, (user) => {
                                    if(user) {
                                        deleteDoc(doc(db, "quizzes", quiz.quizId))
                                    }
                                    getQuizzes(user.uid)
                                })
                            }} type='button' className='w-5/12 h-12 bg-red-400 hover:bg-red-500 text-white rounded-md text-lg'>Delete</button>
                        </div>
                    </motion.div>
                ) : null
            }
        </AnimatePresence>

            <div className="flex flex-col bg-zinc-700 rounded-xl w-full h-56">
                <div className="flex bg-zinc-600 rounded-tr-xl rounded-tl-xl h-1/4">
                    <h2 className="px-3 text-3xl text-gray-100 self-center">{quiz.quizName}</h2>
                </div>
                    <h3 className="px-3 py-1 text-white">{quiz.description}</h3>
                <div className='flex justify-between ml-auto mt-auto'>
                    <button type="button" onClick={() => setRemoveQuizWarning(true)} className="w-[68px] p-1 my-3 mr-3 text-xl text-black hover:cursor-pointer bg-red-400 hover:bg-red-300 rounded-md">delete</button>
                    <button type="button" onClick={() => setQuizStartWarning(true)} className="w-14 p-1 my-3 mr-3 text-xl text-black hover:cursor-pointer bg-green-400 hover:bg-green-300 rounded-md">start</button>
                </div>
            </div>
        </>
    )
}