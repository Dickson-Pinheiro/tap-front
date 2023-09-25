import { Routes, BrowserRouter, Route } from "react-router-dom";
import Notes from "./pages//notes/Notes";
import Principal from "./layouts/Principal";
import Create from "./pages/notes/Create";
import Edit from "./pages/notes/Edit";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import PrincipalPublic from "./layouts/PrincipalPublic";
import Dash from "./pages/Dash";
import Checklists from "./pages/Checklists";
import CreateChecklist from "./pages/CreateChecklist";
import EditChecklist from "./pages/EditChecklist";
import Accordions from "./pages/Accordions";
import Blocks from "./pages/Blocks";
import Board from "./pages/Board";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/dash" element={<Dash/>} />
                <Route path="/board" element={<Board />} />
            </Routes>
        </BrowserRouter>
    )
}