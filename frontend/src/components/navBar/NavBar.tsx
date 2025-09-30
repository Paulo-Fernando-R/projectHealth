import styles from "./navBar.module.css";
import { LuInfo } from "react-icons/lu";
import cssColors from "../../utils/cssColors";
export default function NavBar() {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <img src="" alt="Logo" />
                <h2 className={styles.title + " titleh2"}>AndName</h2>
            </div>

            <div className={styles.right}>
                <LuInfo color={cssColors.text700} size={24} />
                <p className="p1">Sobre o Site</p>
            </div>
        </header>
    );
}
