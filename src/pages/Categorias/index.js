import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardVideo from "../../componentes/Cards";

const PaginaCategorias = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const buscarVideos = async () => {
            try {
                const response = await axios.get('https://my-json-server.typicode.com/FaboElProgramador/AluraFlix-api/video');
                setVideos(response.data);
            } catch (error) {
                console.error("Error buscando videos:", error);
            }
        };
        buscarVideos();
    }, []);

    return (
        <div className="pagina-categorias">
            <h1>Categorias</h1>
            <div className="videos">
                {videos.map((video) => (
                    <CardVideo key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default PaginaCategorias;