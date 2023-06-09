import { HiMenu } from 'react-icons/hi';
import { BsPatchQuestionFill } from 'react-icons/bs';
import { MdPowerSettingsNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSideBarContext } from '../SideBarContext'
import { motion } from 'framer-motion';
import { signOut } from "firebase/auth";
import { auth } from '../features/firebase-config';

export default function SideBar() {
    const { setSideBarActive } = useSideBarContext()
    return (
        <motion.div
        initial={{
            x: "-100%"
        }}
        animate={{
            x: 0,
        }}
        exit={{
            x: "-100%",
        }}
        transition={{
            duration: .2
        }}
        className="flex flex-col fixed left-0 top-0 h-full w-64 z-30 bg-white">
            <HiMenu onClick={() => setSideBarActive(false)} className='cursor-pointer m-4' size={38}/>
            <Link onClick={() => setSideBarActive(false)} to={"/my-quizzes"} className='flex justify-center items-center text-[1.4rem] cursor-pointer py-3 hover:bg-[#f1f1f1]'>
                <BsPatchQuestionFill className='mr-3' size={34}/> My Quizzes
            </Link>
            <a onClick={() => signOut(auth)} className='flex justify-center items-center mt-auto text-[1.4rem] cursor-pointer py-3 hover:bg-[#f1f1f1]'>
                <MdPowerSettingsNew className='mr-2' size={34}/> Log Out
            </a>
        </motion.div>
    )
}