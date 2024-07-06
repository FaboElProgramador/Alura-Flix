import React from "react";
import { Outlet, useLocation } from "react-router-dom"; import Banner from "componentes/Banner";
import Cabecera from "../../componentes/Cabecera";

import PieDePagina from "componentes/Footer";
import { VideoProvider } from "../../context/index";


function PaginaBase() {
    const location = useLocation();

    return (
        <VideoProvider>
            <main>
                <Cabecera />
                {location.pathname === '/' && <Banner/>}
                <Outlet />
                <PieDePagina />
            </main>
        </VideoProvider>
    );
}

export default PaginaBase;