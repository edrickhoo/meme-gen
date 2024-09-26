"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { Card } from "@/components/ui/card";

const TextOverlay = ({
  overlay,
  handleOverlayChange,
}: {
  overlay: { id: number; transformation: string };
  handleOverlayChange: (id: number, text: string) => void;
}) => {
  const [textOverlay, setTextOverlay] = useState("");
  const [xPos, setXPos] = useState(50);
  const [yPos, setYPos] = useState(50);

  const onUpdate = (text: string, x: number, y: number) => {
    if (!text) {
      return handleOverlayChange(overlay.id, "");
    }

    const xDecimal = x / 100;
    const yDecimal = y / 100;
    const transformText = `l-text,i-${text},fs-50,lx-bw_mul_${xDecimal.toFixed(
      1
    )},ly-bw_mul_${yDecimal.toFixed(1)},l-end`;

    handleOverlayChange(overlay.id, transformText);
  };

  return (
    <Card className="p-4 space-y-2">
      <div className="space-y-3">
        <Label htmlFor="textOverlay">Text Overlay</Label>
        <Input
          id="textOverlay"
          name="textOverlay"
          value={textOverlay}
          onChange={(e) => {
            setTextOverlay(e.target.value);
            onUpdate(e.target.value, xPos, yPos);
          }}
        />
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
              onUpdate(textOverlay, v, yPos);
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
              onUpdate(textOverlay, xPos, v);
            }}
          />
          <span>{yPos}</span>
        </div>
      </div>
    </Card>
  );
};

export default TextOverlay;
