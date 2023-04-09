import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import MyQuizzes from "./pages/MyQuizzes";
import Quiz from "./pages/Quiz";
import Register from "./pages/Register";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-quizzes" element={<MyQuizzes />} />
            <Route path="/quiz/:quizId" element={<Quiz />} />
            <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
  )
}
