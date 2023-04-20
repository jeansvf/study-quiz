import { AnimatePresence } from "framer-motion"
import { useSideBarContext } from "../SideBarContext"
import UserProfile from "../components/Account/UserProfile"
import DarkBackground from "../components/DarkBackground"
import SideBar from "../components/SideBar"

export default function Account() {
    const { sideBarActive } = useSideBarContext()
    return (
        <>
            <AnimatePresence>
                {sideBarActive ? (
                    <>
                        <SideBar />
                        <DarkBackground />
                    </>
                    ) : null}
            </AnimatePresence>
            <UserProfile />
        </>
    )
}