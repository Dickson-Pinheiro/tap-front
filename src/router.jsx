import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Principal from "./layouts/Principal";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import PrincipalPublic from "./layouts/PrincipalPublic";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrincipalPublic />} >
                    <Route path="" element={<Login/>}/>
                    <Route path="signup" element={<Signup />} />
                </Route>
                <Route path="/notes" element={<Principal />}>
                    <Route path="home" element={<Home />} />
                    <Route path="create" element={<Create />} />
                    <Route path="edit/:id" element={<Edit />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}