import { HexColorInput, HexColorPicker } from "react-colorful";
import React from "react";

type ColorPickerProps = {
  value: string;
  onChangeColor: (colorStr: string) => void;
};

const ColorPicker = ({ value, onChangeColor }: ColorPickerProps) => {
  return (
    <div className="relative">
      <div className="flex items-center pb-2">
        <p>#</p>
        <HexColorInput color={value} onChange={onChangeColor} className="hex-input"/>
      </div>
      <HexColorPicker
        color={value}
        onChange={onChangeColor}
        className="w-auto"
      />
    </div>
  );
};

export default ColorPicker;
