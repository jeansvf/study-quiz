export default function CreateQuizButton({setQuizModalActive}) {
    return (
        <button onClick={() => {
            setQuizModalActive(true)
        }} className="absolute right-0 bottom-0 m-6 bg-yellow-500 rounded-md p-4 px-5 text-xl text-black hover:cursor-pointer">Create Quiz</button>
    )
}