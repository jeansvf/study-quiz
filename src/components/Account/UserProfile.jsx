import { useEffect, useState } from "react";
import { auth, db, storage } from "../../features/firebase-config"
import { motion } from "framer-motion";
import profilePic from "../../assets/profile_pic.png"
import { collection, getDocsFromServer, query, serverTimestamp, where } from "firebase/firestore";
import { useRef } from "react";
import { FiEdit } from "react-icons/fi"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function UserProfile() {
    const effectRan = useRef(false)

    const [userName, setUserName] = useState()
    const [tempUserImage, setTempUserImage] = useState(null)
    const [userImage, setUserImage] = useState([])
    const [createdQuizzes, setCreatedQuizzes] = useState([])
    const [completedQuizzes, setCompletedQuizzes] = useState()
    const [answeredQuestions, setAnsweredQuestions] = useState()
    const [wrongAnswers, setWrongAnswers] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [score, setScore] = useState(0)

    useEffect(() => {
        if(effectRan.current === false) {
            setUserName(auth.currentUser.displayName)
            getCreatedQuizzes(auth.currentUser.uid)

            // get profile picture
            const imageListRef = ref(storage, "user-profile-pictures/")
            listAll(imageListRef).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setUserImage([url])
                        console.log(userImage);
                    })
                })
            })

            const q = query(collection(db, "users"), where("userId", "==", auth.currentUser.uid))
                getDocsFromServer(q).then(data => data.forEach((e) => {
                    setCompletedQuizzes(e.data().completedQuizzes)
                    setAnsweredQuestions(e.data().answeredQuestions)
                    setCorrectAnswers(e.data().correctAnswers)
                    setWrongAnswers(e.data().wrongAnswers)
            }))
        }
    }, [])

    useEffect(() => {
        setScore((correctAnswers / answeredQuestions * 5).toString().substring(0, 3))
    }, [correctAnswers])

    const getCreatedQuizzes = async (uid) => {
        const q = query(collection(db, "quizzes"), where("quizOwner", "==", uid))
        const querySnapshot = await getDocsFromServer(q)
        querySnapshot.forEach(doc => {
            setCreatedQuizzes((prev) => [...prev, doc.data()])
        })
    }
    
    const uploadProfilePicture = () => {
        const imageRef = ref(storage, `user-profile-pictures/${auth.currentUser.uid}`)
        uploadBytes(imageRef, tempUserImage).then(() => {
            console.log(tempUserImage);
        })
    }

    return (
        <div className="flex flex-col items-center absolute left-1/2 top-20 -translate-x-1/2 sm:w-fit h-[14rem] sm:flex-row mt-8">
            <motion.div
            initial={{
                scale: 0,
            }}
            animate={{
                y: 0,
                scale: 1,
            }}
            transition={{
                ease: "circOut",
                duration: .6
            }}
            className="flex flex-col items-center w-40">
                <label htmlFor="file-input" className="flex relative rounded-full text-transparent hover:text-black">
                    <FiEdit size={40} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                    {userImage.map((url) => {
                        return <img src={url} alt="no profile picture" className="hover:opacity-50 h-40 w-40 cursor-pointer rounded-full border-4 border-black"/>
                    })}
                </label>
                <input onChange={(event) => {
                    setTempUserImage(event.target.files[0])
                    uploadProfilePicture()
                }} type="file" id="file-input" className="hidden" />
                <motion.span className="text-3xl mt-2 text-center">{userName}</motion.span>
            </motion.div>
            <motion.div
            initial={{
                y: "-14%",
                opacity: 0
            }}
            animate={{
                y: 0,
                scale: 1,
                opacity: 1,
            }}
            transition={{
                ease: "easeOut",
                duration: .3,
                delay: .2
            }}
            className="flex flex-col sm:ml-8 mx-auto mt-4 sm:mt-0 sm:mx-0 items-center sm:items-start self-center w-fit-content text-lg">
                <p className="opacity-70">Created Quizzes: {createdQuizzes.length}</p>
                <p className="opacity-70">Completed Quizzes: {completedQuizzes}</p>
                <p className="opacity-70">Answered Questions: {answeredQuestions}</p>
                <p className="opacity-70">Answers Score: <span>{score}</span></p>
            </motion.div>
        </div>
    )
}