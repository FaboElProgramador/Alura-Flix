import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaBase from "./pages/PaginaBase"
import Inicio from "./pages/Inicio";
import NuevoVideo from "./pages/NuevoVideo";


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaBase />}>
                    <Route index element={<Inicio />} />
                    <Route path="NuevoVideo" element={<NuevoVideo />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;