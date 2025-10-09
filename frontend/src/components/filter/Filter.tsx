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
    action: VoidFunction;
    enabled?: boolean ;
};

export default function Filter({
    cities,
    types,
    setCitySelected,
    setTypeSelected,
    search,
    setSearch,
    action,
    enabled = true,
}: FilterProps) {
    function onFocus(e: React.FocusEvent<HTMLDivElement, Element>) {
        e.currentTarget.scrollIntoView({ behavior: "smooth" });
    }
    return (
        <div className={styles.filterBox} onFocus={onFocus}>
            <div className={styles.inputBox}>
                <input
                    type="text"
                    className={"p1 " + styles.field}
                    placeholder="Nome"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    disabled ={!enabled}
                />
                <LuSearch size={24} color={cssColors.text600} onClick={action} />
            </div>
            <div className={styles.filters}>
                <Dropdown itens={cities} setSelected={setCitySelected} placeholder={"Cidade"} />
                <Dropdown itens={types} setSelected={setTypeSelected} placeholder={"Tipo"} />
            </div>
        </div>
    );
}
