import axios from 'axios';
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Route, Routes, useLocation, useNavigate } from "react-router";
import ExitWrapper from "./components/ExitWrapper";
import Navbar from "./components/Navbar";
import { useUser } from './context/userContext';
import useSocket from './hook/useSocket';
import About from "./pages/About";
import Chat from './pages/Chat';
import Home from "./pages/Home";
import Inbox from './pages/Inbox';
import Item from "./pages/Item";
import Items from "./pages/Items";
import Login from "./pages/Login";
import Profile from './pages/Profile';
import Register from "./pages/Register";
import ReportItem from "./pages/ReportItem";
import Test from "./pages/Test";
import './styles/App.css';
import './styles/item.css';
import './styles/nav.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateUser, loading, error } = useUser();
  const io = useSocket();
  useEffect(() => {
    if (!loading && user) {
      io.send("register", user._id);
      io.subscribeToRoom(`u_${user.userId}`, (message) => {
        toast.custom((t) => (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="toast-container" onClick={() => { navigate(`/chat/${message.itemId}`); toast.dismiss(t.id) }}>
            <div className="toast-content">
              <p>New message: {message.content}</p>
            </div>
          </motion.div>
        ));
      });
    }
  }, [user])

  axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL; // Set the base URL for all requests
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait"  >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<ExitWrapper ><Home /></ExitWrapper>} />
          <Route path="/auth/login" element={<ExitWrapper ><Login /></ExitWrapper>} />
          <Route path="/auth/register" element={<ExitWrapper ><Register /></ExitWrapper>} />
          <Route path="/report/lost" element={<ExitWrapper><ReportItem type="lost" /></ExitWrapper>} />
          <Route path="/report/found" element={<ExitWrapper><ReportItem type="found" /></ExitWrapper>} />
          <Route path="/items" element={<ExitWrapper ><Items /></ExitWrapper>} />
          <Route path="/me" element={<ExitWrapper ><Profile /></ExitWrapper>} />
          <Route path="/inbox" element={<ExitWrapper ><Inbox /></ExitWrapper>} />
          <Route path="/chat/:itemId" element={<ExitWrapper ><Chat /></ExitWrapper>} />
          <Route path="/item/:id" element={<ExitWrapper ><Item /></ExitWrapper>} />
          <Route path="/about" element={<ExitWrapper ><About /></ExitWrapper>} />
          <Route path="/test" element={<ExitWrapper ><Test /></ExitWrapper>} />
        </Routes>
      </AnimatePresence >
    </>
  );
}

export default App;
