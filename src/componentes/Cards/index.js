import React from "react";
import styles from "./Cards.module.css"
import eliminar from "./eliminar.png"
import editar from "./editar.png"
import { useVideoContext } from "../../context/index";

const CardVideo = ({ video }) => {
    const { manejoDeleteVideo, openModal } = useVideoContext()

    const manejoDelete = async () => {
        try {
            await manejoDeleteVideo(video.id);
        } catch (error) {
            console.error("Error eliminando video", error);
        }
    };

    const manejoEdit = () => {
        openModal(video);
    };

    return (
        <div className={styles.cardContainer}>
            <a href={video.video} target="_blank" rel="noopener noreferrer">
                <img className={styles.imgVideo} src={video.imagenVideo} alt={video.titulo} />
            </a>
            <div className={styles.infoContainer}>
                <div className={styles.buttons}>
                    <button className={styles.buttonEliminar} onClick={manejoDelete}>
                        <img src={eliminar} alt="Eliminar" />
                        <h3 className={styles.tituloButton}>Eliminar</h3>
                    </button>
                    <button className={styles.buttonEditar} onClick={manejoEdit}>
                        <img src={editar} alt="Editar" />
                        <h3 className={styles.tituloButton}>Editar</h3>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardVideo;