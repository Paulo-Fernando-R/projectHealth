/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./dropdown.module.css";
import { LuChevronDown, LuChevronUp, LuX } from "react-icons/lu";
import cssColors from "../../utils/cssColors";
import DropdownController from "./dropdownController";

export type DropdowItem = {
    id: string;
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
    const [display, setDisplay] = useState<DropdowItem[]>([]);
    const listRef = useRef<HTMLDivElement>(null);

    const controller = new DropdownController(
        listRef,
        itens,
        display,
        setDisplay,
        search,
        setSearch,
        open,
        setOpen,
        setSelected
    );

    const filterItens = (end: number, str: string = search) => controller.filterItens(end, str);

    const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => controller.onScroll(e);

    const handleOpen = (control: boolean) => controller.handleOpen(control);

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) =>
        await controller.onChange(event);

    const onSelect = (item: DropdowItem) => controller.onSelect(item);

    const onBlur = () => controller.onBlur();

    const clear = () => controller.clear();

    useMemo(() => {
        filterItens(controller.itensCount);
    }, [itens]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (listRef.current && !listRef.current.contains(event.target as Node)) {
                onBlur();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleOpen]);

    return (
        <div className={styles.dropBox} ref={listRef}>
            <div className={styles.inputBox}>
                <input
                    onChange={onChange}
                    value={search}
                    className={"p2 " + styles.field}
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

            <ul className={styles.list} id="list" onScroll={onScroll}>
                {!display || display.length === 0 ? (
                    <li className={"p2 " + styles.listItem}>Nenhum item encontrado</li>
                ) : (
                    display.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={"p1 " + styles.listItem}
                                onClick={() => onSelect(item)}
                            >
                                {item.name}
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    );
}
