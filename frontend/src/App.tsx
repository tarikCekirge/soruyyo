import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Dashboard/Home";
import CreatePoll from "./pages/Dashboard/CreatePoll";
import MyPolls from "./pages/Dashboard/MyPolls";
import VotedPolls from "./pages/Dashboard/VotedPolls";
import Bookmarks from "./pages/Dashboard/Bookmarks";
import LoginForm from "./pages/Auth/LoginForm";
import SignUpForm from "./pages/Auth/SignUpForm";
import UserProvider from "./context/UserContext";
import { Toaster } from "@/components/ui/sonner"


const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="giris" element={<LoginForm />} />
          <Route path="kayit-ol" element={<SignUpForm />} />
          <Route path="dashboard" element={<Home />} />
          <Route path="yeni-anket" element={<CreatePoll />} />
          <Route path="anketlerim" element={<MyPolls />} />
          <Route path="oylananlar" element={<VotedPolls />} />
          <Route path="kaydedilenler" element={<Bookmarks />} />
        </Routes>
      </Router>
      <Toaster richColors />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/giris" />;
  }
};

