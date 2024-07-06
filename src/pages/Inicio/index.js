import React from "react";
import CardVideo from "../../componentes/Cards";
import Modal from "../../componentes/Modal";
import styles from "./index.modules.css"
import { useVideoContext } from "../../context";

const colorPorDefecto = "#CCCCCC";

const categoriasColores = {
    'Front End': '#6BD1FF',
    'BackEnd': '#00C86F',
    'Innovacion y Gestion': '#FFBA05',
    // Agrega más categorías y colores según sea necesario
};

const PaginaInicio = () => {
    const { videos } = useVideoContext();

    return (
        <div className={styles.inicioContainer}>
            {Object.keys(categoriasColores).map(categoriaNombre => (
                <div key={categoriaNombre} className={styles.categoria}>
                    <h2 className={styles.nombre} style={{ backgroundColor: categoriasColores[categoriaNombre] || colorPorDefecto}}>
                        {categoriaNombre}
                    </h2>
                    <div className={styles.video}>
                        {videos.filter(video => video.categoria === categoriaNombre).map(video => (
                            <CardVideo {...video} key={video.id} video={video} />
                        ))}
                    </div>
                </div>
            ))}
            <Modal />
        </div>
    );
};

export default PaginaInicio;