export default function CreateQuizButton({setQuizModalActive}) {
    return (
        <button onClick={() => {
            setQuizModalActive(true)
        }} className="m-6 bg-yellow-500 rounded-md px-2 py-1 hover:cursor-pointer">Create Quiz</button>
    )
}