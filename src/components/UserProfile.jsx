import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { auth, db } from "../features/firebase-config"

export default function UserProfile() {
    const [userEmail, setUserEmail] = useState()


    onAuthStateChanged(auth, (user) => {
        if(user){
            setUserEmail(user.email)
        } else {
            setUserEmail("not logged in")
        };
    })
    return (
        <>
            <div>E-mail: {userEmail}</div>
            <button onClick={() => {signOut(auth)}}>Log Out</button>
            <button onClick={() => {
                
            }} className="block">Test</button>
        </>
    )
}