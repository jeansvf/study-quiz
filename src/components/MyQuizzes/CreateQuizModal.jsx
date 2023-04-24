import { onAuthStateChanged } from "firebase/auth"
import { collection, doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { TfiClose } from "react-icons/tfi"
import { BsPlus } from "react-icons/bs"
import { auth, db } from "../../features/firebase-config"
import { AnimatePresence, motion } from "framer-motion"
import ModalQuestion from "./ModalQuestion"
import QuizTypeSelection from "./QuizTypeSelection"

export default function CreateQuizModal({setQuizModalActive, getQuizzes}) {
    const [quizName, setQuizName] = useState()
    const [quizDescription, setQuizDescription] = useState()
    const [quizQuestions, setQuizQuestions] = useState([])
    const [questionTypeSelect, setQuestionTypeSelect] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
            // checks if the user is authenticated
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    let newDocRef = doc(collection(db, "quizzes"))
                    // creates a new document
                    setDoc(newDocRef, {
                        quizId: newDocRef.id,
                        quizName: quizName,
                        description: quizDescription,
                        quizOwner: user.uid,
                        questions: quizQuestions,
                    })
                // re-fetch the data into the quizzes variable
                getQuizzes(user.uid)
            }})
            setQuizModalActive(false)
    }

    return (
        <motion.form
        initial={{
            scale: .9,
            opacity: 0
        }}
        animate={{
            scale: 1,
            opacity: 1,
            y: 0
        }}
        exit={{
            scale: .9,
            opacity: 0,
        }}
        transition={{
            duration: .1
        }}
        onSubmit={(e) => {
            handleSubmit(e)
        }} className="bg-white z-20 overflow-y-scroll overflow-x-hidden pb-24 pt-6 px-6 w-full h-full top-0 fixed flex flex-col sm:rounded-xl sm:p-6 sm:left-1/3 sm:top-20 sm:w-[40rem] sm:h-[50rem]">
            <TfiClose onClick={() => setQuizModalActive(false)} className="absolute right-6 cursor-pointer" size={30} color="black" />
            <div className="flex flex-col">
                <h1 className="text-4xl mb-4 text-center text-black">Create Quiz</h1>
                <label htmlFor="quiz-name" className="w-96 text-black text-lg">Quiz Name</label>
                <input onChange={(e) => {setQuizName(e.target.value)}} type="text" id="quiz-name" className="rounded-md pl-1 bg-[#eeeeee] text-black text-lg" />
                <label htmlFor="quiz-description" className="w-96 text-black text-lg mt-2">Quiz Description</label>
                <textarea onChange={(e) => {setQuizDescription(e.target.value)}} type="text" id="quiz-description" className="rounded-md pl-1 h-24 resize-none bg-[#eeeeee] text-black text-lg" />
            </div>
                {/* render questions */}
                {
                    quizQuestions?.map((question, index) => {
                        return (
                            <ModalQuestion question={question} index={index} questionType={question.questionType}/>
                            )
                        })
                    }
                {/* render quiz type selection */}
                <AnimatePresence>
                    {
                        questionTypeSelect ? (
                            <QuizTypeSelection quizQuestions={quizQuestions} setQuizQuestions={setQuizQuestions} setQuestionTypeSelect={setQuestionTypeSelect} />
                            ) : null
                        }
                </AnimatePresence>
                {/* render add question button */}
                <AnimatePresence>
                {
                    questionTypeSelect ? null : (
                    <button onClick={() => setQuestionTypeSelect(true)} className='flex items-center w-fit mt-3 text-md text-black text-lg' type="button">
                    <BsPlus size={26} /> Add Question
                    </button>)
                }
                </AnimatePresence>
            <input type="submit" value={"Done"} className="hover:cursor-pointer py-1 px-4 rounded-md mt-auto text-xl bg-green-400 self-end justify-self-end" />
        </motion.form>
    )
}