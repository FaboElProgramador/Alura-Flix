import { Link } from "react-router-dom"
import styles from "./Cabecera.module.css"
import logo from "./LogoFlix.png"
import CabeceraLink from "../CabeceraLink"

function Cabecera() {
    return (
        <header className={styles.cabecera}>
            <Link to="/">
                <section className={styles.logoContainer}>
                    <img src={logo} alt="Logo AluraFlix" />

                </section>
            </Link>
            <nav>
                <CabeceraLink url="./">
                    <button className={styles.buttonHome}>
                        Home
                    </button>
                </CabeceraLink>
                <CabeceraLink url="./NuevoVideo">
                    <button className={styles.buttonNuevoVideo}>
                        Nuevo Video
                    </button>
                </CabeceraLink>
            </nav>
        </header>
    )
}

export default Cabecera;