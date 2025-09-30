import { Route, Routes, BrowserRouter } from "react-router";


export default function AppRoutes() {
    return (
        <BrowserRouter>
            {/* <NavBar /> */}

            <Routes>
                <Route path="/" element={<div>Hello</div>} />
                
                <Route path="/profile" element={<h1>Profile</h1>} />
            </Routes>
        </BrowserRouter>
    );
}