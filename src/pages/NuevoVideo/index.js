import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useVideoContext } from '../../context';
import styles from './NuevoVideo.module.css';

const NuevoVideo = () => {
    const { manejoAgregarVideo, buscarVideos } = useVideoContext();
    const navigate = useNavigate();
    const inicioVideoState = {
        titulo: '',
        categoria: '',
        imagenVideo: '',
        video: '',
        descripcion: ''
    };
    const [nuevoVideo, setNuevoVideo] = useState(inicioVideoState);
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

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setNuevoVideo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const manejarEntrega = async (e) => {
        e.preventDefault();
        try {
            await manejoAgregarVideo(nuevoVideo);
            setNuevoVideo(inicioVideoState);
            buscarVideos();
            navigate('/');
        } catch (error) {
            console.error('Error agregando video:', error);
        }
    };

    return (
        <div className={styles.nuevoVideoContainer}>
            <div className={styles.cabeceraFormulario}>
                <h2 className={styles.tituloCabecera}>Nuevo video</h2>
                <p className={styles.parrafoCabecera}>Completa los campos para agregar un nuevo video.</p>
            </div>
            <form className={styles.formulario} onSubmit={manejarEntrega}>
                <div className={styles.sectionFormulario}>
                    <div className={styles.formIzquierdo}>
                        <div className={styles.campo}>
                            <label className={styles.label}>
                                Título:
                                <input
                                    type="text"
                                    name="titulo"
                                    value={nuevoVideo.titulo}
                                    onChange={manejarCambio}
                                    className={styles.input}
                                    placeholder="Ingrese el título"
                                    required
                                />
                            </label>
                        </div>
                        <div className={styles.campo}>
                            <label className={styles.label}>
                                Imagen:
                                <input
                                    type="text"
                                    name="imagenVideo"
                                    value={nuevoVideo.imagenVideo}
                                    onChange={manejarCambio}
                                    className={styles.input}
                                    placeholder="URL de la imagen"
                                    required
                                />
                            </label>
                        </div>
                        <div className={styles.campo}>
                            <label className={styles.label}>
                                Descripción:
                                <textarea
                                    name="descripcion"
                                    value={nuevoVideo.descripcion}
                                    onChange={manejarCambio}
                                    className={styles.textarea}
                                    placeholder="¿De qué se trata el video?"
                                    required
                                />
                            </label>
                        </div>
                    </div>
                    <div className={styles.formDerecho}>
                        <div className={styles.campo}>
                            <label className={styles.label}>
                                Categoría:
                                <select
                                    name="categoria"
                                    value={nuevoVideo.categoria}
                                    onChange={manejarCambio}
                                    className={styles.select}
                                    required
                                >
                                    <option value="">Seleccione la categoría</option>
                                    {categorias.map((categ) => (
                                        <option className={styles.listNuevovideo} key={categ} value={categ}>{categ}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className={styles.campo}>
                            <label className={styles.label}>
                                Video:
                                <input
                                    type="text"
                                    name="video"
                                    value={nuevoVideo.video}
                                    onChange={manejarCambio}
                                    className={styles.input}
                                    placeholder="URL del video"
                                    required
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.buttonGuardar}>Guardar</button>
                    <button type="button" className={styles.buttonLimpiar} onClick={() => setNuevoVideo(inicioVideoState)}>Limpiar</button>
                </div>
            </form>
        </div>
    );
};

export default NuevoVideo;