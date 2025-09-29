/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";

function getDeviceType() {
    const width = window.innerWidth;
    if (width <= 768) {
        return "mobile";
    } else if (width <= 1024) {
        return "tablet";
    } else {
        return "desktop";
    }
}

const useDeviceType = () => {
    const [deviceType, setDeviceType] = useState<"desktop" | "mobile" | "tablet">(getDeviceType());

    useEffect(
        useCallback(() => {
            const handleSize = () => setDeviceType(getDeviceType());
            window.addEventListener("resize", handleSize);
            return () => window.removeEventListener("resize", handleSize);
        }, [])
    );

    return deviceType;
};

export default useDeviceType;
