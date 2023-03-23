export default function CreateQuizButton({setQuizModalActive}) {
    return (
        <button onClick={() => {
            setQuizModalActive(true)
        }} className="m-6 bg-red-300 rounded-md px-2 py-1 hover:cursor-pointer">Create Quiz</button>
    )
}