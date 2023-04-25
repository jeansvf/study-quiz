import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../features/firebase-config'
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
                        className='flex flex-col fixed top-1/2 left-1/2 rounded-xl h-fit w-80 bg-zinc-900 p-3 z-10'>
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
                        className='flex flex-col fixed top-1/2 left-1/2 rounded-xl h-fit w-80 bg-zinc-900 p-3 z-10'>
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
            <div className='relative bg-white h-56 w-full rounded-xl'>
                <div className='h-14 px-4 py-3 text-white text-2xl bg-[#353535] rounded-tr-xl rounded-tl-xl'>
                    <span className='block h-8 max-w-full overflow-hidden'>{quiz.quizName}</span>
                </div>
                <div className='h-[6.5rem] px-4 py-2 overflow-hidden text-[1.3rem] text-black opacity-60'>
                    {quiz.description}
                </div>
                <div className='mt-auto absolute right-2 bottom-2'>
                    <button onClick={() => setRemoveQuizWarning(true)} className='bg-[#a9a9a9] hover:opacity-80 text-xl text-black ml-2 px-4 py-1 rounded-md' type='button'>delete</button>
                    <button onClick={() => setQuizStartWarning(true)} className='bg-[#353535] hover:opacity-80 text-xl text-white ml-2 px-5 py-1 rounded-md' type='button'>start</button>
                </div>
            </div>
        </>
    )
}