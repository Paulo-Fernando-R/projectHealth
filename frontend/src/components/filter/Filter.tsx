/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Dropdown, { type DropdowItem } from "../dropdown/Dropdown";
import styles from "./filter.module.css";
import { LuSearch } from "react-icons/lu";
import cssColors from "../../utils/cssColors";

export type FilterProps = {
    cities: DropdowItem[];
    types: DropdowItem[];
    setCitySelected: React.Dispatch<React.SetStateAction<DropdowItem | null>>;
    setTypeSelected: React.Dispatch<React.SetStateAction<DropdowItem | null>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function Filter({
    cities,
    types,
    setCitySelected,
    setTypeSelected,
    search,
    setSearch,
}: FilterProps) {
    return (
        <div className={styles.filterBox}>
            <div className={styles.inputBox}>
                <input
                    type="text"
                    className={"p1 " + styles.field}
                    placeholder="Nome"
                    value={search}
                    onChange={(e) => setSearch?.(e.target.value)}
                />
                <LuSearch size={24} color={cssColors.text600} />
            </div>
            <div className={styles.filters}>
                <Dropdown itens={cities} setSelected={setCitySelected} placeholder={"Cidade"} />
                <Dropdown itens={types} setSelected={setTypeSelected} placeholder={"Tipo"} />
            </div>
        </div>
    );
}
