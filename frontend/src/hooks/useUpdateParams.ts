/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import type { DropdowItem } from "../components/dropdown/Dropdown";

const useUpdateParams = (
    refetch: VoidFunction,
    city: DropdowItem | null,
    type: DropdowItem | null,
    firstRender: React.RefObject<boolean>
) => {
    useEffect(() => {
        if (firstRender.current) {
            if (city) {
                refetch();
            }

            firstRender.current = false;
            return;
        }

        refetch();
    }, [city, type]);
};

export default useUpdateParams;
