import { useState } from "react";
import CheckBox from './CheckBox'

export default function Question({question, index}) {
    const [checkedId, setCheckedId] = useState('')

    const handleCheck = (id) => {
        if (id === checkedId) {
        setCheckedId('');
        } else {
        setCheckedId(id);
        }
    }
    return (
        <div className="mt-4 text-black">
            <p className="mb-1 text-xl text-black">Question <span>{index + 1}</span></p>
            <div className="flex">
                <textarea autoFocus onChange={(e) => question.text = e.target.value} className="w-2/3 h-32 text-lg bg-[#eeeeee] rounded-md resize-none" type="text"/>
                <div className="text-black w-1/3">
                    <div className="flex mb-1 relative items-center">
                        <p className="w-4 ml-3 mr-1">A)</p><input onChange={(e) => question.a = e.target.value} className="rounded-l-md bg-[#eeeeee] text-black text-lg w-full" type="text" />
                        <CheckBox checkedId={checkedId} handleCheck={handleCheck} question={question} id={"a"} />
                    </div>
                    <div className="flex mb-1 relative items-center">
                        <p className="w-4 ml-3 mr-1">B)</p><input onChange={(e) => question.b = e.target.value} className="rounded-l-md bg-[#eeeeee] text-black text-lg w-full" type="text" />
                        <CheckBox checkedId={checkedId} handleCheck={handleCheck} question={question} id={"b"} />
                    </div>
                    <div className="flex mb-1 relative items-center">
                        <p className="w-4 ml-3 mr-1">C)</p><input onChange={(e) => question.c = e.target.value} className="rounded-l-md bg-[#eeeeee] text-black text-lg w-full" type="text" />
                        <CheckBox checkedId={checkedId} handleCheck={handleCheck} question={question} id={"c"} />
                    </div>
                    <div className="flex mb-1 relative items-center">
                        <p className="w-4 ml-3 mr-1">D)</p><input onChange={(e) => question.d = e.target.value} className="rounded-l-md bg-[#eeeeee] text-black text-lg w-full" type="text" />
                        <CheckBox checkedId={checkedId} handleCheck={handleCheck} question={question} id={"d"} />
                    </div>
                </div>
            </div>
        </div>
    )
}