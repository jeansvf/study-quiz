import { MdClose } from 'react-icons/md'

export default function WrongAnswersModal({wrongAnswers, setQuizModalActive, setWrongAnswersModalActive}) {
    return (
        <div className="overflow-y-scroll w-2/4 h-3/4 p-3 bg-gray-900 absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 rounded-md">
            <MdClose onClick={() => setWrongAnswersModalActive(false)} size={30} className="ml-auto cursor-pointer" />
            {
                wrongAnswers.map((answer) => {  
                    return (
                        <>
                            <p className="m-1">{answer.text}</p>
                            <div className="grid grid-cols-2 gap-1 m-1 text-xl">
                                <button className="bg-gray-700 h-8" type="button">{answer.rightAnswer == "a" ? (<p className='border-2 border-green-600'>{answer.a}</p>) : answer.a}</button>
                                <button className="bg-gray-700 h-8" type="button">{answer.rightAnswer == "b" ? (<p className='border-2 border-green-600'>{answer.b}</p>) : answer.b}</button>
                                <button className="bg-gray-700 h-8" type="button">{answer.rightAnswer == "c" ? (<p className='border-2 border-green-600'>{answer.c}</p>) : answer.c}</button>
                                <button className="bg-gray-700 h-8" type="button">{answer.rightAnswer == "d" ? (<p className='border-2 border-green-600'>{answer.d}</p>) : answer.d}</button>
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}