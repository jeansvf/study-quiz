import { BsPatchQuestion } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="fixed left-0 top-0 flex flex-col items-center w-20 h-full bg-[#212121]">
            {/* better the nav css */}
            <Link to={"/account"} className="flex flex-col justify-center items-center w-full h-18 mt-4 mb-6">
                <img src="https://placehold.co/50x50" alt="profile picture" className="bg-gray-400 rounded-full w-14 h-14" />
                <span className="text-white text-lg mt-1">John</span>
            </Link>
            <Link to={"/my-quizzes"} className="flex justify-center items-center w-full h-20 hover:bg-[#373737]">
                <BsPatchQuestion size={38} color="white"/>
            </Link>
        </nav>
    )
}