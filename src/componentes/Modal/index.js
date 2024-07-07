import React, { useState, useEffect, useMemo } from 'react';
import { useVideoContext } from '../../context/';
import axios from 'axios';
import styles from './Modal.module.css';
import cerrar from "./cancelar.png"



const Modal = () => {
    const { isModalOpen, closeModal, videoSeleccionado, manejoGuardarVideo } = useVideoContext();
    const inicioVideoState = useMemo(() => ({
        id: '',
        titulo: '',
        categoria: '',
        imagenVideo: '',
        video: '',
        descripcion: ''
    }), []);
    const [videoEditado, setVideoEditado] = useState(inicioVideoState);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const buscarCategorias = async () => {
            try {
                const response = await axios.get('https://my-json-server.typicode.com/FaboElProgramador/AluraFlix-api/videos');
                const categoriaUnica = [...new Set(response.data.map(video => video.categoria))];
                setCategorias(categoriaUnica);
            } catch (error) {
                console.error('Error buscando categorias:', error);
            }
        };
        buscarCategorias();
    }, []);

    useEffect(() => {
        if (videoSeleccionado) {
            setVideoEditado(videoSeleccionado);
        } else {
            setVideoEditado(inicioVideoState);
        }
    }, [videoSeleccionado, inicioVideoState]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setVideoEditado((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const manejarGuardar = async () => {
        try {
            await manejoGuardarVideo(videoEditado);
            closeModal();
        } catch (error) {
            console.error('Error guardando video:', error);
        }
    };

    const manejoClear = () => {
        setVideoEditado(inicioVideoState);
    };

    return (
        isModalOpen && (
            <div className={styles.modalContainer}>
                <div className={styles.modal}>
                    <div className={styles.modalCerrar}>
                        <button className={styles.buttonClose} onClick={closeModal}>
                            <img src={cerrar} alt='Cerrar' />
                        </button>
                    </div>
                    <form className={styles.formModal}>
                        <h2>Editar video</h2>
                        <label>
                            Título:
                            <input
                                type="text"
                                name="titulo"
                                placeholder="Ingrese el titulo"
                                value={videoEditado.titulo}
                                onChange={manejarCambio}
                            />
                        </label>
                        <label>
                            Categoria:
                            <select
                                name="categoria"
                                value={videoEditado.categoria}
                                onChange={manejarCambio}
                            >
                                <option value="" disabled>Seleccione la categoria</option>
                                {categorias.map((categ) => (
                                    <option className={styles.listModal} key={categ} value={categ}>
                                        {categ}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Imagen:
                            <input
                                type="text"
                                name="imagenVideo"
                                placeholder="URL de la imagen"
                                value={videoEditado.imagenVideo}
                                onChange={manejarCambio}
                            />
                        </label>
                        <label>
                            Video:
                            <input
                                type="text"
                                name="video"
                                placeholder="URL del video"
                                value={videoEditado.video}
                                onChange={manejarCambio}
                            />
                        </label>
                        <label>
                            Descripcion:
                            <textarea
                                name="descripcion"
                                placeholder="Ingrese la descripcion"
                                value={videoEditado.descripcion}
                                onChange={manejarCambio}
                            />
                        </label>
                    </form>
                    <div className={styles.modalButtons}>
                        <button className={styles.buttonGuardar} onClick={manejarGuardar}>Guardar</button>
                        <button className={styles.buttonLimpiar} onClick={manejoClear}>Limpiar</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;