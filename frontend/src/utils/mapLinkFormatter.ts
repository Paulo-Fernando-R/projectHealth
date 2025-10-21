export default class MapLinkFormatter {
    static openAppLink(device: string, lat: string, lon: string) {
        if (device === "Apple") {
            return `http://maps.apple.com/?ll=${lat},${lon}`;
        }
        return `https://www.google.com/maps?q=${lat},${lon}`;
    }

    static embedMapLink(lat: string, lon: string, delta = 0.002) {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);

        const src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - delta}
                     %2C${latitude - delta}%2C${longitude + delta}%2C${latitude + delta}
                     &layer=mapnik&marker=${latitude}%2C${longitude}`;

        return src;
    }
}
