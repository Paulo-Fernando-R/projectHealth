/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./about.module.css";

export default function About() {
    return (
        <div className={styles.container}>
            <h1 className="titleh1">Sobre o Site</h1>

            <h3 className="titleh3">Origem e natureza dos dados</h3>

            <p className={"p2 " + styles.p}>
                As informações apresentadas neste site provêm exclusivamente do Cadastro Nacional de
                Estabelecimentos de Saúde (CNES), mantido pelo Ministério da Saúde, disponibilizado
                publicamente pelo portal cnes.datasus.gov.br CNES Serviços e Informações do Brasil.
                Essas bases de dados são de domínio público e acessíveis a qualquer pessoa por meio
                dos canais oficiais do CNES. Serviços e Informações do Brasil.
                <br />
                <br />
                Nenhuma informação de natureza privada ou sigilosa é coletada, armazenada ou exibida
                neste site. O conteúdo disponibilizado tem como objetivo facilitar o acesso e a
                visualização dos dados públicos, sem qualquer alteração no teor ou na integridade
                das informações originais.
            </p>

            <h3 className="titleh3">Transparência legal e exclusão de dados privados</h3>

            <p className={"p2 " + styles.p}>
                A Lei nº 12.527/2011 (Lei de Acesso à Informação — LAI) regulamenta o direito
                fundamental de acesso às informações públicas e estabelece que a publicidade é
                regra, sendo o sigilo exceção Planalto Serviços e Informações do Brasil.
                <br />
                Por meio dessa lei, está garantido que bases como o CNES possam ser disponibilizadas
                à sociedade, desde que respeitados os limites legais para sigilo (caso existam).
                Serviços e Informações do Brasil+1
            </p>
        </div>
    );
}
