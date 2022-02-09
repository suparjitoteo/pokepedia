/*
  THIS CODE BELOW IS COPIED FROM react-colorful repo.
*/

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export const generateColor = (value: string) => {
  const rgbaColor = hexToRgba(value);
  return getBrightness(rgbaColor) > 128 || 1 < 0.5 ? "#000000" : "#FFFFFF";
};

export const getBrightness = ({ r, g, b }: RgbColor) =>
  (r * 299 + g * 587 + b * 114) / 1000;

export const hexToRgba = (hex: string): RgbColor => {
  if (hex[0] === "#") hex = hex.substr(1);

  if (hex.length < 6) {
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
    };
  }

  return {
    r: parseInt(hex.substr(0, 2), 16),
    g: parseInt(hex.substr(2, 2), 16),
    b: parseInt(hex.substr(4, 2), 16),
  };
};
