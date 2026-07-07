import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Queues from "./pages/Queues";
import Jobs from "./pages/Jobs";
import Workers from "./pages/Workers";

import DashboardLayout from "./layouts/DashboardLayout";

export default function App(){

    return(

        <Routes>

            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register />} />

            <Route element={<DashboardLayout/>}>

                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/queues" element={<Queues/>}/>
                <Route path="/jobs" element={<Jobs/>}/>
                <Route path="/workers" element={<Workers/>}/>

            </Route>

        </Routes>

    );

}