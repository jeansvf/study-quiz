import { HiMenuAlt3 } from 'react-icons/hi';
import { BsPatchQuestionFill } from 'react-icons/bs';
import { MdPowerSettingsNew } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function SideBar({setSideBarActive}) {
    return (
        <div className="flex flex-col fixed left-0 top-0 h-full w-72 z-20 bg-white">
            <HiMenuAlt3 onClick={setSideBarActive(false)} className='ml-auto cursor-pointer m-4' size={38}/>
            <Link to={"/my-quizzes"} className='flex justify-center items-center text-[1.4rem] cursor-pointer py-3 hover:bg-[#f1f1f1]'>
                <BsPatchQuestionFill className='mr-3' size={34}/> My Quizzes
            </Link>
            <div className='flex justify-center items-center mt-auto text-[1.4rem] cursor-pointer py-3 hover:bg-[#f1f1f1]'>
                <MdPowerSettingsNew className='mr-2' size={34}/> Log Out
            </div>
        </div>
    )
}