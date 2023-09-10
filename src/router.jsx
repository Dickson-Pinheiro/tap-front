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

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrincipalPublic />} >
                    <Route path="" element={<Login/>}/>
                    <Route path="signup" element={<Signup />} />
                </Route>
                <Route path="/dash" element={<Principal />}>
                    <Route path="/dash" element={<Dash/>} /> 
                    <Route path="checklists" element={<Checklists />} />
                    <Route path="checklists/create" element={<CreateChecklist />} />
                    <Route path="checklists/edit/:id" element={<EditChecklist />} />
                    <Route path="notes" element={<Notes />} />
                    <Route path="notes/create" element={<Create />} />
                    <Route path="notes/edit/:id" element={<Edit />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}