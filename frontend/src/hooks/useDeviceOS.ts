import { useMemo } from "react";

const useDeviceOS = () => {
    const getOS = () => {
        const userAgent = window.navigator.userAgent || window.navigator.vendor;

        const apple = /iPhone|iPad|Mac/i;
        const android = /Android/i;
        const windows = /Windows/i;

        if (apple.test(userAgent)) {
            return "Apple";
        }
        if (android.test(userAgent)) {
            return "Android";
        }
        if (windows.test(userAgent)) {
            return "Windows";
        }
        return "Unknown";
    };

    const memoizedOS = useMemo(() => getOS(), []);

    return memoizedOS;
};

export default useDeviceOS;

