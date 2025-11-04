import React from "react";
import Dropdown, { type DropdowItem } from "../dropdown/Dropdown";
import styles from "./filter.module.css";
import { LuSearch } from "react-icons/lu";
import cssColors from "../../utils/cssColors";
import Spinner from "../spinner/Spinner";

export type FilterProps = {
    cities: DropdowItem[];
    types: DropdowItem[];
    citySelected: DropdowItem | null;
    setCitySelected: React.Dispatch<React.SetStateAction<DropdowItem | null>>;
    typeSelected: DropdowItem | null;
    setTypeSelected: React.Dispatch<React.SetStateAction<DropdowItem | null>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    action: VoidFunction;
    enabled?: boolean;
};

export default function Filter({
    cities,
    types,
    citySelected,
    setCitySelected,
    typeSelected,
    setTypeSelected,
    search,
    setSearch,
    action,
    enabled = true,
}: FilterProps) {
    function onFocus(e: React.FocusEvent<HTMLDivElement, Element>) {
        e.currentTarget.scrollIntoView({ behavior: "smooth" });
    }
    function onPressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            action();
        }
    }
    return (
        <div className={styles.filterBox} onFocus={onFocus}>
            <div className={styles.inputBox}>
                <input
                    type="text"
                    className={"p1 " + styles.field}
                    placeholder={enabled ? "Pesquisar nome..." : "Carregando..."}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    disabled={!enabled}
                    onKeyPress={onPressEnter}
                />
                {enabled ? (
                    <LuSearch size={24} color={cssColors.text600} onClick={action} />
                ) : (
                    <Spinner />
                )}
            </div>
            <div className={styles.filters}>
                <Dropdown
                    itens={cities}
                    setSelected={setCitySelected}
                    placeholder={"Cidade"}
                    selected={citySelected}
                />
                <Dropdown
                    itens={types}
                    setSelected={setTypeSelected}
                    placeholder={"Tipo"}
                    selected={typeSelected}
                />
            </div>
        </div>
    );
}
