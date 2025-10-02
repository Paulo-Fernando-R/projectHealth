/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Dropdown, { type DropdowItem } from "../dropdown/Dropdown";
import styles from "./filter.module.css";
import { LuSearch } from "react-icons/lu";
import cssColors from "../../utils/cssColors";
export default function Filter() {
    const [selected, setSelected] = React.useState<DropdowItem | null>(null);
    const [itens] = React.useState<DropdowItem[]>([
        { id: 1, name: "Banana" },
        { id: 2, name: "Melancia" },
        { id: 3, name: "Avião" },
        { id: 4, name: "Whiskey" },
        { id: 5, name: "Laranja" },
    ]);

    const [list, setList] = React.useState<DropdowItem[]>([]);

    async function fetchData() {
        const response = await fetch("../../../public/lista6000.json");
        const data = await response.json();
        setList(data);
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    if (list.length === 0) {
        return <div>Loading...</div>;
    }



    return (
        <div className={styles.filterBox}>
            <div className={styles.inputBox}>
                <input type="text" className={"p1 " + styles.field} placeholder="Nome" />
                <LuSearch size={24} color={cssColors.text600} />
            </div>
            <div className={styles.filters}>
                <Dropdown itens={list} setSelected={setSelected} placeholder={"Cidade"} />
                {/* <Dropdown itens={itens} setSelected={setSelected} placeholder={"Tipo"} /> */}
            </div>
        </div>
    );
}
