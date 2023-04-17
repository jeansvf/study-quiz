import { motion } from "framer-motion"

export default function DarkBackground() {
    return (
        <motion.div initial={{
            opacity: 0
        }}
        animate={{
            opacity: .6
        }}
        exit={{
            opacity: 0
        }}
        className="fixed z-10 top-0 left-0 w-full h-full bg-black opacity-50"></motion.div>
    )
}