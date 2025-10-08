const cssColors = {
    primary100: getCssColor("--primary100"),
    primary200: getCssColor("--primary200"),
    bg100: getCssColor("--bg100"),
    text100: getCssColor("--text100"),
    text600: getCssColor("--text600"),
    text700: getCssColor("--text700"),
    text800: getCssColor("--text800"),

    accent100: getCssColor("--accent100"),
    accent200: getCssColor("--accent200"),
    accent300: getCssColor("--accent300"),
};

export const feedColors = [cssColors.accent100, cssColors.accent200, cssColors.accent300];

function getCssColor(colorName: string): string {
    const root = getComputedStyle(document.documentElement);
    return root.getPropertyValue(colorName).trim();
}

export default cssColors;
