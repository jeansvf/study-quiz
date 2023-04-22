import { MdClose } from 'react-icons/md'
import { motion } from 'framer-motion'

export default function FinalAnswersModal({answers, activeModal}) {
    return (
        <motion.div
        initial={{
            x: "-50%",
            y: "-50%",
            opacity: 0,
            scale: .9
        }}
        animate={{
            opacity: 1,
            scale: 1,
        }}
        exit={{
            opacity: 0,
            scale: .9
        }}
        transition={{
            duration: .1,
        }}
        className="overflow-y-scroll z-20 w-11/12 sm:w-[26rem] h-3/4 p-3 bg-[#eeeeee] absolute top-1/2 left-1/2 rounded-md">
            <MdClose onClick={() => activeModal(false)} size={30} color='black' className="ml-auto cursor-pointer" />
            {
                answers.map((answer) => {
                    return (
                        <>
                            <p className="m-1 text-black">{answer.text}</p>
                            <div className="grid grid-cols-2 gap-1 m-1 text-xl text-black">
                                    <div className="text-center text-base sm:text-lg bg-white h-8">{answer.rightAnswer == "a" ? (<p className='border-4 sm:border-2 border-green-600'>{answer.a}</p>) : (answer.yourGuess == "a" ? (<p className='border-4 sm:border-2 border-red-500'>{answer.a}</p>) : answer.a)}</div>
                                    <div className="text-center text-base sm:text-lg bg-white h-8">{answer.rightAnswer == "b" ? (<p className='border-4 sm:border-2 border-green-600'>{answer.b}</p>) : (answer.yourGuess == "b" ? (<p className='border-4 sm:border-2 border-red-500'>{answer.b}</p>) : answer.c)}</div>
                                    <div className="text-center text-base sm:text-lg bg-white h-8">{answer.rightAnswer == "c" ? (<p className='border-4 sm:border-2 border-green-600'>{answer.c}</p>) : (answer.yourGuess == "c" ? (<p className='border-4 sm:border-2 border-red-500'>{answer.c}</p>) : answer.a)}</div>
                                    <div className="text-center text-base sm:text-lg bg-white h-8">{answer.rightAnswer == "d" ? (<p className='border-4 sm:border-2 border-green-600'>{answer.d}</p>) : (answer.yourGuess == "d" ? (<p className='border-4 sm:border-2 border-red-500'>{answer.d}</p>) : answer.a)}</div>
                            </div>
                        </>
                    )
                })
            }
        </motion.div>
    )
}