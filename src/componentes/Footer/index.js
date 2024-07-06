import styles from "./Footer.module.css"
import logo from "./LogoFlix.png"
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function PieDePagina() {
    return (
        <footer className={styles.footerContainer}>
            <img src={logo} alt="Logo AluraFlix" className={styles.logo} />

            <div className={styles.links}>
                <li>
                    <a href="https://www.linkedin.com/in/fabian-vazquez-bb9b2628b/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className={styles.icons} />
                    </a>
                </li>
                <li>
                    <a href="https://github.com/FaboElProgramador" target="_blank" rel="noopener noreferrer">
                        <FaGithub className={styles.icons} />
                    </a>
                </li>
            </div>
            <div className={styles.textContainer}>
                <p>Desarrollado por Fabian Vazquez</p>
                <p>2024</p>
            </div>

        </footer>
    )
}

export default PieDePagina;