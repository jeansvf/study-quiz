import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import MyQuizzes from "./pages/MyQuizzes";
import Quiz from "./pages/Quiz";
import Register from "./pages/Register";
import WithoutNav from "./components/WithoutNav";
import WithNav from "./components/WithNav";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route element={<WithoutNav />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<WithoutNav />}>
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<WithoutNav />}>
              <Route path="/" element={<LandingPage />} />
            </Route>
            <Route element={<WithoutNav />}>
              <Route path="/quiz/:quizId" element={<Quiz />} />
            </Route>
            <Route element={<WithNav />}>
              <Route path="/account" element={<Account />} />
            </Route>
            <Route element={<WithNav />}>
              <Route path="/my-quizzes" element={<MyQuizzes />} />
            </Route>
        </Routes>
      </BrowserRouter>
  )
}
