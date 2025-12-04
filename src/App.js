import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Item from "./pages/Item";
import Items from "./pages/Items";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportItem from "./pages/ReportItem";
import './styles/App.css';
import './styles/item.css';
import './styles/nav.css';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/report/lost" element={<ReportItem type="lost" />} />
        <Route path="/report/found" element={<ReportItem type="found" />} />
        <Route path="/items" element={<Items />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/about" element={<About />} />


      </Routes>
    </>
  );
}

export default App;
