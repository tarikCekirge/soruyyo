import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Dashboard/Home";
import CreatePoll from "./pages/Dashboard/CreatePoll";
import MyPolls from "./pages/Dashboard/MyPolls";
import VotedPolls from "./pages/Dashboard/VotedPolls";
import Bookmarks from "./pages/Dashboard/Bookmarks";
import LoginForm from "./pages/Auth/LoginForm";
import SignUpForm from "./pages/Auth/SignUpForm";
import UserProvider, { useUser } from "./context/UserContext"; // Import useUser hook

const App = () => {
  return (
    <UserProvider>
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
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/giris" />;
  }
};
