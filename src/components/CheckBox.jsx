import { BsCheck } from "react-icons/bs";

export default function CustomCheckBox({checkedId, handleCheck, question, id}) {
    return (
        <label>
            <input onChange={() => {
                handleCheck(id)
                question.rightAnswer = id
                console.log(question);
            }} type="checkbox" />
            <span className={`${checkedId == id ? `bg-green-400 ` : `bg-neutral-300`} h-7 w-6 rounded-r-md flex items-center cursor-pointer`}>
                <BsCheck className="" size={26} color="black"/>
            </span>
        </label>
    )
}