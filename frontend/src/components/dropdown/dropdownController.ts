import cssColors from "../../utils/cssColors";
import type { DropdowItem } from "./Dropdown";

export default class DropdownController {
    readonly itensCount = 100;
    listRef: React.RefObject<HTMLDivElement | null>;
    itens: DropdowItem[];
    display: DropdowItem[];
    setDisplay: React.Dispatch<React.SetStateAction<DropdowItem[]>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelected: React.Dispatch<React.SetStateAction<DropdowItem | null>>;

    constructor(
        listRef: React.RefObject<HTMLDivElement | null>,
        itens: DropdowItem[],
        display: DropdowItem[],
        setDisplay: React.Dispatch<React.SetStateAction<DropdowItem[]>>,
        search: string,
        setSearch: React.Dispatch<React.SetStateAction<string>>,
        open: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        setSelected: React.Dispatch<React.SetStateAction<DropdowItem | null>>
    ) {
        this.listRef = listRef;
        this.itens = itens;
        this.display = display;
        this.setDisplay = setDisplay;
        this.search = search;
        this.setSearch = setSearch;
        this.open = open;
        this.setOpen = setOpen;
        this.setSelected = setSelected;
    }

    private isOpen = (control: boolean) => this.setOpen(control);

    filterItens(end: number, str: string) {
        if (str.length > 0) {
            const filtered = this.itens.filter((item) =>
                item.name.toLowerCase().includes(str.toLowerCase())
            );
            this.setDisplay(filtered.slice(0, end));
            return;
        }
        this.setDisplay(this.itens.slice(0, end));
    }

    onScroll(e: React.UIEvent<HTMLUListElement, UIEvent>) {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop < 200) {
            this.filterItens(this.display.length + this.itensCount, this.search);
        }
    }

    handleOpen(control: boolean) {
        this.isOpen(control);

        this.listRef.current!.style.paddingTop = control ? "0.625rem" : "0";
        this.listRef.current!.style.paddingBottom = control ? "0.625rem" : "0";
        this.listRef.current!.style.borderColor = control
            ? cssColors.primary200
            : cssColors.text600;

        const el = this.listRef.current?.querySelector<HTMLUListElement>("#list");
        el!.style.display = control ? "block" : "none";
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        const el = this.listRef.current?.querySelector<HTMLUListElement>("#list");
        el!.scrollTop = 0;

        this.setSearch(event.target.value);
        this.filterItens(this.itensCount, event.target.value);

        if (event.target.value === "") this.handleOpen(false);
        else this.handleOpen(true);
    }

    onSelect(item: DropdowItem) {
        this.setSelected(item);
        this.setSearch(item.name);
        this.handleOpen(false);
    }

    onBlur() {
        if (this.search.length === 0) this.handleOpen(false);
    }

    clear() {
        this.setSearch("");
        this.setSelected(null);
        this.handleOpen(false);
        const el = this.listRef.current?.querySelector<HTMLUListElement>("#list");
        el!.scrollTop = 0;
    }
}
