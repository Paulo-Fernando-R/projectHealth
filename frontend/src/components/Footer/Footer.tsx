import styles from "./footer.module.css";
import logo from "../../assets/images/logo_alt1.png";
export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.left}>
                <img src={logo} alt="Logo" />
                <h2 className={styles.title + " titleh3"}>Saúde Localiza</h2>
            </div>

            <div className={styles.developers}>
                <h4 className="p1">Desenvolvido por:</h4>
                <a href="https://www.linkedin.com/in/paulo-fernando-071bb31a9/">Paulo Rodrigues</a>
                <a href="https://www.linkedin.com/in/theu-ferreira/">Matheus Ferreira</a>
            </div>

            <p>
                O objetivo deste site é ajudar as pessoas a encontrar facilmente hospitais,
                clínicas, laboratórios e postos de saúde em qualquer lugar do Brasil.
                <br /> <br /> O site utiliza dados públicos oficiais do CNES (Cadastro Nacional de
                Estabelecimentos de Saúde), do Ministério da Saúde.
            </p>
        </div>
    );
}
