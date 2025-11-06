/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import cssColors from "../../utils/cssColors";

export default function AdBanner() {
    const adRef = useRef<HTMLDivElement>(null);

    const url = import.meta.env.VITE_PUBLIC_ADS_BANNER_URL;
    const key = import.meta.env.VITE_PUBLIC_ADS_BANNER_URL;

    useEffect(() => {
        const configScript = document.createElement("script");
        configScript.type = "text/javascript";
        configScript.innerHTML = `
      atOptions = {
        'key' : '${key}',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;

        const adScript = document.createElement("script");
        adScript.type = "text/javascript";
        adScript.src = url;
        adScript.async = true;

        if (adRef.current) {
            adRef.current.appendChild(configScript);
            adRef.current.appendChild(adScript);
        }

        return () => {
            if (adRef.current) adRef.current.innerHTML = "";
        };
    }, []);

    return (
        <>
            <div
                ref={adRef}
                style={{
                    width: "320px",
                    height: "50px",
                    margin: "0 auto",
                    textAlign: "center",
                }}
            ></div>

            <small
                style={{
                    color: cssColors.text600,
                    fontFamily: "inherit",
                    marginTop: "-20px",
                    alignSelf: "center",
                }}
            >
                Anúncios de terceiros
            </small>
        </>
    );
}
