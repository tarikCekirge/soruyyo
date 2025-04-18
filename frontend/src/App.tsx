import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom"

import Home from "./pages/Dashboard/Home"
import CreatePoll from "./pages/Dashboard/CreatePoll"
import MyPolls from "./pages/Dashboard/MyPolls"
import VotedPolls from "./pages/Dashboard/VotedPolls"
import Bookmarks from "./pages/Dashboard/Bookmarks"
import LoginForm from "./pages/Auth/LoginForm"
import SignUpForm from "./pages/Auth/SignUpForm"

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/giris" element={<LoginForm />} />
          <Route path="/kayit-ol" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/create-poll" element={<CreatePoll />} />
          <Route path="/my-polls" element={<MyPolls />} />
          <Route path="/voted-polls" element={<VotedPolls />} />
          <Route path="/bookmarked-polls" element={<Bookmarks />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token")
  return isAuthenticated ? (
    <Navigate to={"/dasboard"} />
  ) : (
    <Navigate to={"/giris"} />
  )
}