import { useParams } from 'react-router-dom'

export default function Quiz() {
    const params = useParams()
    console.log(params);
    query(collection(db, "objects"), where("objectId", "==", x))
    return (
        <div>{}</div>
    )
}