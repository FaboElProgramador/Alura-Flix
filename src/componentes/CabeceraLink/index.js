import { Link } from "react-router-dom";
import styles from "./CabeceraLink.module.css"

function CabeceraLink({ url, children }) {
    return (
        <Link to={url} className={styles.linkHeader}>
            {children}
        </Link>
    )
}

export default CabeceraLink;