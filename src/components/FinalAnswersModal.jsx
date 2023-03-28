import { MdClose } from 'react-icons/md'

export default function FinalAnswersModal({answers, activeModal}) {
    return (
        <div className="overflow-y-scroll w-2/4 h-3/4 p-3 bg-gray-900 absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 rounded-md">
            <MdClose onClick={() => activeModal(false)} size={30} className="ml-auto cursor-pointer" />
            {
                answers.map((answer) => {
                    return (
                        <>
                            <p className="m-1">{answer.text}</p>
                            <div className="grid grid-cols-2 gap-1 m-1 text-xl">
                                <div className="text-center bg-gray-700 h-8">{answer.rightAnswer == "a" ? (<p className='border-2 border-green-600'>{answer.a}</p>) : (answer.yourGuess == "a" ? (<p className='border-2 border-red-500'>{answer.a}</p>) : answer.a)}</div>
                                <div className="text-center bg-gray-700 h-8">{answer.rightAnswer == "b" ? (<p className='border-2 border-green-600'>{answer.b}</p>) : (answer.yourGuess == "b" ? (<p className='border-2 border-red-500'>{answer.b}</p>) : answer.c)}</div>
                                <div className="text-center bg-gray-700 h-8">{answer.rightAnswer == "c" ? (<p className='border-2 border-green-600'>{answer.c}</p>) : (answer.yourGuess == "c" ? (<p className='border-2 border-red-500'>{answer.c}</p>) : answer.a)}</div>
                                <div className="text-center bg-gray-700 h-8">{answer.rightAnswer == "d" ? (<p className='border-2 border-green-600'>{answer.d}</p>) : (answer.yourGuess == "d" ? (<p className='border-2 border-red-500'>{answer.d}</p>) : answer.a)}</div>
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}