import { HiMenu } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import profilePic from "../assets/profile_pic.png";
import { useSideBarContext } from "../SideBarContext";

export default function NavBar() {
    const { setSideBarActive } = useSideBarContext()
    const location = useLocation()
    
    const setTitle = () => {
        switch (location.pathname) {
            case "/my-quizzes":
                return "My Quizzes"
            case "/account":
                return "Account"
            default:
                return ""
        }
    }
    return (
        <nav className="fixed top-0 flex w-full z-10 justify-between items-center h-16 bg-white drop-shadow-md">
            <span className="absolute left-1/2 -translate-x-1/2 text-xl font-medium underline underline-offset-2">{setTitle()}</span>
            <HiMenu onClick={() => setSideBarActive(true)} className="cursor-pointer ml-4" size={38} />
            <Link to={"/account"} className="flex h-fit mr-6">
                <img src={profilePic} alt="profile picture" className="bg-gray-400 rounded-full w-14 h-14" />
            </Link>
        </nav>
    )
}