import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Principal from "./layouts/Principal";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Principal />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/edit/:id" element={<Edit />} />
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}