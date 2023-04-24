import { useState } from "react";
import CheckBox from './CheckBox'

export default function Question({question, index, questionType}) {
    const [checkedId, setCheckedId] = useState('')

    const handleCheck = (id) => {
        if (id === checkedId) {
        setCheckedId('');
        } else {
        setCheckedId(id);
        }
    }
    return (
        <div className="mt-4">
            <p className="mb-1 text-xl">Question <span>{index + 1}</span></p>
            {/* if type of question is multiple choice, render multiple choices */}
            {questionType == "multiple-choice" ? (
                <div className="flex">
                    <textarea autoFocus onChange={(e) => question.text = e.target.value} placeholder="Type your question" className="w-2/3 mr-2 pl-1 h-32 text-lg bg-[#eeeeee] rounded-md resize-none" type="text"/>
                    <div className="w-1/3">
                        <div className="flex mb-1 relative items-center">
                            <p className="w-4 mr-1 text-lg">A)</p><input onChange={(e) => question.a = e.target.value} className="rounded-l-md bg-[#eeeeee] text-lg w-full" type="text" />
                            <CheckBox checkedId={checkedId} handleCheck={handleCheck} question={question} id={"a"} />
                        </div>
                        <div className="flex mb-1 relative items-center">
                            <p className="w-4 mr-1 text-lg">B)</p><input onChange={(e) => question.b = e.target.value} className="rounded-l-md bg-[#eeeeee] text-lg w-full" type="text" />
                            <CheckBox checkedId={checkedId} handleCheck={handleCheck} question={question} id={"b"} />
                        </div>
                        <div className="flex mb-1 relative items-center">
                            <p className="w-4 mr-1 text-lg">C)</p><input onChange={(e) => question.c = e.target.value} className="rounded-l-md bg-[#eeeeee] text-lg w-full" type="text" />
                            <CheckBox checkedId={checkedId} handleCheck={handleCheck} question={question} id={"c"} />
                        </div>
                        <div className="flex mb-1 relative items-center">
                            <p className="w-4 mr-1 text-lg">D)</p><input onChange={(e) => question.d = e.target.value} className="rounded-l-md bg-[#eeeeee] text-lg w-full" type="text" />
                            <CheckBox checkedId={checkedId} handleCheck={handleCheck} question={question} id={"d"} />
                        </div>
                    </div>
                </div>)
                : (
                <div className="flex">
                    <textarea autoFocus onChange={(e) => question.text = e.target.value} placeholder="Type your question" className="w-2/3 mr-2 pl-1 h-32 text-lg bg-[#eeeeee] rounded-md resize-none" type="text"/>
                    <textarea onChange={(e) => question.rightAnswer = e.target.value.toLowerCase()} placeholder="Type the answer" className="w-1/3  pl-1 h-32 text-lg bg-[#eeeeee] rounded-md resize-none" type="text"/>
                </div>)}
        </div>
    )
}