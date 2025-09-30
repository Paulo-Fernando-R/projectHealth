import { useRef, useState } from "react";
import styles from "./dropdown.module.css";
import { LuChevronDown, LuChevronUp, LuX } from "react-icons/lu";
import cssColors from "../../utils/cssColors";

export type DropdowItem = {
    id: number;
    name: string;
};

export type DropdownProps = {
    itens: DropdowItem[];
    setSelected: React.Dispatch<React.SetStateAction<DropdowItem | null>>;
    placeholder?: string;
};

export default function Dropdown({ itens, setSelected, placeholder }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const listRef = useRef<HTMLDivElement>(null);
    const isOpen = (control: boolean) => setOpen(control);

    const handleOpen = (control: boolean) => {
        isOpen(control);

        listRef.current!.style.paddingTop = control ? "0.625rem" : "0";
        listRef.current!.style.borderColor = control ? cssColors.primary200 : cssColors.text600;

        const el = listRef.current?.querySelector<HTMLUListElement>("#list");
        el!.style.display = control ? "block" : "none";
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearch(event.target.value);
        if (event.target.value === "") handleOpen(false);
        else handleOpen(true);
    };

    const onSelect = (item: DropdowItem) => {
        setSelected(item);
        setSearch(item.name);
        handleOpen(false);
    };

    const onBlur = () => {
        if (search === "") handleOpen(false);
    };

    const clear = () => {
        setSearch("");
        setSelected(null);
        handleOpen(false);
    };

    return (
        <div className={styles.dropBox} ref={listRef} onBlur={onBlur}>
            <div className={styles.inputBox}>
                <input
                    onChange={onChange}
                    value={search}
                    className={"p1 " + styles.field}
                    type="text"
                    placeholder={placeholder}
                />

                {search && <LuX onClick={clear} size={24} color={cssColors.text600} />}

                {open ? (
                    <LuChevronUp
                        onClick={() => handleOpen(false)}
                        size={24}
                        color={cssColors.text600}
                    />
                ) : (
                    <LuChevronDown
                        onClick={() => handleOpen(true)}
                        size={24}
                        color={cssColors.text600}
                    />
                )}
            </div>

            <ul className={styles.list} id="list">
                {itens.map((item, index) => {
                    if (item.name.toLowerCase().includes(search.toLowerCase()))
                        return (
                            <li
                                key={index}
                                className={"p1 " + styles.listItem}
                                onClick={() => onSelect(item)}
                            >
                                {item.name}
                            </li>
                        );
                })}
            </ul>
        </div>
    );
}
