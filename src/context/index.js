import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const VideoContext = createContext();

export const useVideoContext = () => {
    return useContext(VideoContext);
};

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [seleccionarVideo, setSeleccionarVideo] = useState(null);

    useEffect(() => {
        buscarVideos();
    }, []);

    const buscarVideos = async () => {
        try {
            const response = await axios.get('https://my-json-server.typicode.com/FaboElProgramador/AluraFlix-api/videos');
            setVideos(response.data);
        } catch (error) {
            console.error('Error buscando videos:', error);
        }
    };

    const manejoGuardarVideo = async (videoEditado) => {
        try {
            const response = await axios.put(`https://my-json-server.typicode.com/FaboElProgramador/AluraFlix-api/videos/${videoEditado.id}`, videoEditado);
            console.log('Video actualizado:', response.data);

            setVideos(prevVideos => {
                return prevVideos.map(video => {
                    if (video.id === videoEditado.id) {
                        return videoEditado;
                    }
                    return video;
                });
            });

            closeModal();
        } catch (error) {
            console.error('Error en actualizacion video:', error);
        }
    };

    const manejoAgregarVideo = async (nuevoVideo) => {
        try {
            const response = await axios.post('https://my-json-server.typicode.com/FaboElProgramador/AluraFlix-api/videos', nuevoVideo);
            console.log('Nuevo video agregado:', response.data);

            setVideos(prevVideos => [...prevVideos, response.data]);
        } catch (error) {
            console.error('Error agregando video:', error);
        }
    };

    const manejoDeleteVideo = async (videoId) => {
        try {
            await axios.delete(`https://my-json-server.typicode.com/FaboElProgramador/AluraFlix-api/videos/${videoId}`);
            setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
        } catch (error) {
            console.error('Error eliminando video:', error);
        }
    };

    const openModal = (video) => {
        setSeleccionarVideo(video);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSeleccionarVideo(null);
        setIsModalOpen(false);
    };

    const videoContextValue = {
        videos,
        buscarVideos,
        manejoGuardarVideo,
        manejoAgregarVideo,
        manejoDeleteVideo,
        isModalOpen,
        openModal,
        closeModal,
        seleccionarVideo
    };

    return (
        <VideoContext.Provider value={videoContextValue}>
            {children}
        </VideoContext.Provider>
    );
};