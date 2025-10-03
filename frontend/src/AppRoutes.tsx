import { Route, Routes, BrowserRouter } from "react-router";
import NavBar from "./components/navBar/NavBar";
import Home from "./pages/home/Home";
import About from "./pages/about/About";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <NavBar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route path="/profile" element={<h1>Profile</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
