import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { HexColorPicker } from "react-colorful";

export const DebouncedPicker = ({
  color,
  onChange,
}: {
  color: string;
  onChange: (val: string) => void;
  className?: string;
}) => {
  const debounced = useDebouncedCallback((e) => {
    onChange(e);
  }, 100);

  return <HexColorPicker color={color} onChange={debounced} />;
};
