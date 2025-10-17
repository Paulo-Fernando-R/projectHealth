import { useEffect, useState } from "react";
import type { DropdowItem } from "../components/dropdown/Dropdown";

const useShowImage = (search: string, city: DropdowItem | null, type: DropdowItem | null) => {
    const [showImage, setShowImage] = useState(true);

    useEffect(() => {
        if (search || city || type) {
            setShowImage(false);
            return;
        }

        setShowImage(true);
    }, [search, city, type]);

    return showImage;
};

export default useShowImage;
