import { Route, Routes, BrowserRouter } from "react-router";
import NavBar from "./components/navBar/NavBar";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Details from "./pages/details/Details";
import Footer from "./components/Footer/Footer";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <NavBar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/details/:name" element={<Details />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
