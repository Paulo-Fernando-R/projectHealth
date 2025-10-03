/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./navBar.module.css";
import { LuInfo } from "react-icons/lu";
import cssColors from "../../utils/cssColors";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
export default function NavBar() {

    const navigate = useNavigate();
    const location = useLocation();
    const [hideAbout, setHideAbout] = useState(false);

    const goToAbout = () => {
        navigate("/about");
    };
    const goToHome = () => {
        navigate("/");
    };

    useEffect(() => {
        setHideAbout(location.pathname === "/about");
    }, [location]);
    
    return (
        <header className={styles.header}>
            <div className={styles.left} onClick={goToHome}>
                <img src="" alt="Logo" />
                <h2 className={styles.title + " titleh2"}>AndName</h2>
            </div>

            {!hideAbout && (
                <div className={styles.right} onClick={goToAbout}>
                    <LuInfo color={cssColors.text700} size={24} />
                    <p className="p1">Sobre o Site</p>
                </div>
            )}
        </header>
    );
}
