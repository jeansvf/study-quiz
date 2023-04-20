import { HiMenuAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";
import profilePic from "../assets/profile_pic.png";
import { useSideBarContext } from "../SideBarContext";

export default function NavBar() {
    const { setSideBarActive } = useSideBarContext()

    return (
        <nav className="fixed top-0 flex w-full justify-between items-center h-16 bg-white drop-shadow-md">
            <HiMenuAlt2 onClick={() => setSideBarActive(true)} className="cursor-pointer ml-4" size={38} />
            <Link to={"/account"} className="flex h-fit mr-6">
                <img src={profilePic} alt="profile picture" className="bg-gray-400 rounded-full w-14 h-14" />
            </Link>
        </nav>
    )
}