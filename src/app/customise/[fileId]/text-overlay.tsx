"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DebouncedPicker } from "@/components/ui/debounce-color-picker";

const TextOverlay = ({
  overlay,
  handleOverlayChange,
  handleRemoveOverlay,
}: {
  overlay: { id: number; transformation: string };
  handleOverlayChange: (id: number, text: string) => void;
  handleRemoveOverlay: (idToRemove: number) => void;
}) => {
  const [textOverlay, setTextOverlay] = useState("");
  const [xPos, setXPos] = useState(50);
  const [yPos, setYPos] = useState(50);
  const [useBgTextColor, setUseBgTextColor] = useState(false);
  const [textBgColor, setTextBgColor] = useState("#aabbcc");

  const onUpdate = (
    text: string,
    x: number,
    y: number,
    textBgColor: string,
    useBgTextColor: boolean
  ) => {
    if (!text) {
      return handleOverlayChange(overlay.id, "");
    }
    const xDecimal = x / 100;
    const yDecimal = y / 100;
    const transformText = `l-text,i-${text},pa-10,fs-80,lx-bw_mul_${xDecimal.toFixed(
      1
    )},ly-bw_mul_${yDecimal.toFixed(1)},${
      useBgTextColor ? `bg-${textBgColor.slice(1)},` : ""
    }l-end`;

    handleOverlayChange(overlay.id, transformText);
  };

  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-center justify-end">
        <Button
          onClick={() => handleRemoveOverlay(overlay.id)}
          variant="destructive"
        >
          Remove
        </Button>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3 flex-1">
          <Label htmlFor="textOverlay">Text Overlay</Label>
          <Input
            id="textOverlay"
            name="textOverlay"
            value={textOverlay}
            onChange={(e) => {
              setTextOverlay(e.target.value);
              onUpdate(e.target.value, xPos, yPos, textBgColor, useBgTextColor);
            }}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={useBgTextColor}
              onCheckedChange={(e) => {
                setUseBgTextColor(e as boolean);
                onUpdate(textOverlay, xPos, yPos, textBgColor, e as boolean);
              }}
              id="textBgColor"
            />
            <Label
              htmlFor="textBgColor"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Text background color
            </Label>
          </div>
          {useBgTextColor && (
            <div className="small">
              <DebouncedPicker
                color={textBgColor}
                onChange={(e) => {
                  setTextBgColor(e);
                  onUpdate(textOverlay, xPos, yPos, e, useBgTextColor);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="xPos">X Position</Label>

        <div className="flex gap-2">
          <Slider
            id="xPos"
            name="xPos"
            defaultValue={[xPos]}
            max={100}
            step={1}
            onValueChange={([v]) => {
              setXPos(v);
              onUpdate(textOverlay, v, yPos, textBgColor, useBgTextColor);
            }}
          />
          <span>{xPos}</span>
        </div>
      </div>
      <div>
        <Label htmlFor="yPos1">Y Position</Label>
        <div className="flex gap-2">
          <Slider
            id="yPos1"
            name="yPos1"
            defaultValue={[yPos]}
            max={100}
            step={1}
            onValueChange={([v]) => {
              setYPos(v);
              onUpdate(textOverlay, xPos, v, textBgColor, useBgTextColor);
            }}
          />
          <span>{yPos}</span>
        </div>
      </div>
    </Card>
  );
};

export default TextOverlay;
