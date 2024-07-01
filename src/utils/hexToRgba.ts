export const hexToRgba = (hex: string, alpha?: number) => {
  hex = hex.replace(/^#/, '');

  let bigint: number;
  if (hex.length === 3) {
    bigint = parseInt(
      hex
        .split('')
        .map((x) => x + x)
        .join(''),
      16,
    );
  } else if (hex.length === 6) {
    bigint = parseInt(hex, 16);
  } else {
    throw new Error('Invalid hex color format. Use #RRGGBB or #RGB.');
  }

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  if (alpha !== undefined) {
    if (alpha < 0 || alpha > 1) {
      throw new Error('Alpha value must be between 0 and 1.');
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};
