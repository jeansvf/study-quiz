import { motion } from "framer-motion"
import { TfiClose } from "react-icons/tfi"

export default function quizTypeSelection({quizQuestions, setQuestionTypeSelect, setQuizQuestions}) {
    return (
        <motion.div
        className="flex flex-col mt-3 ml-[.1rem] w-full">
            <span className="font-medium text-lg">What will be the type of the question?</span>
            <div className="flex items-center">
                <button onClick={() => {
                    setQuestionTypeSelect(false)
                    setQuizQuestions([...quizQuestions, {questionType: "multiple-choice"}])
                }} className="w-fit p-1 px-2 rounded-md text-lg h-fit bg-[#836FFF]" type="button">Multiple Choice</button>
                <button onClick={() => {
                    setQuestionTypeSelect(false)
                    setQuizQuestions([...quizQuestions, {questionType: "write-answer"}])
                }} className="w-fit p-1 px-2 mx-2 rounded-md text-lg h-fit bg-[#6FE5FF]" type="button">Text</button>
                <button onClick={() => setQuestionTypeSelect(false) } className="flex items-center justify-center h-full w-9 rounded-md text-lg bg-[#FF6F6F] text-center" type="button">
                    <TfiClose />
                </button>
            </div>
        </motion.div>
    )
}