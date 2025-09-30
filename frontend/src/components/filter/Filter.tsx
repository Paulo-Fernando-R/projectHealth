import React from "react";
import Dropdown, { type DropdowItem } from "../dropdown/Dropdown";
export default function Filter() {
    const [selected, setSelected] = React.useState<DropdowItem | null>(null);
    const [itens] = React.useState<DropdowItem[]>([
        { id: 1, name: "Banana" },
        { id: 2, name: "Melancia" },
        { id: 3, name: "Avião" },
        { id: 4, name: "Whiskey" },
        { id: 5, name: "Laranja" },
    ]);
    const placeholder = "Selecione um item";

    return (
        <div>
            <Dropdown itens={itens} setSelected={setSelected} placeholder={placeholder} />
            {selected && (
                <div>
                    <p>{selected.name}</p>
                </div>
            )}
        </div>
    );
}
