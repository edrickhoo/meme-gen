"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import React, { useState } from "react";
import TextOverlay from "./text-overlay";
import { Button } from "@/components/ui/button";
import { text } from "stream/consumers";

const CustomisePanel = ({
  file,
}: {
  file: Pick<FileObject, "filePath" | "name">;
}) => {
  const [textOverlays, setTextOverlays] = useState([
    {
      id: new Date().getTime(),
      transformation: ``,
    },
  ]);

  const transformations = [];
  if (textOverlays) {
    transformations.push({
      raw: textOverlays
        .filter((overlay) => overlay.transformation)
        .map((overlay) => overlay.transformation)
        .join(":"),
    });
  }
  const handleOverlayChange = (id: number, text: string) => {
    const foundIdx = textOverlays.findIndex((overlay) => overlay.id === id);
    if (foundIdx === -1) return;
    textOverlays[foundIdx].transformation = text;

    setTextOverlays([...textOverlays]);
  };

  const handleRemoveOverlay = (idToRemove: number) => {
    setTextOverlays(
      textOverlays.filter((overlay) => overlay.id !== idToRemove)
    );
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <form className="space-y-4">
        <div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setTextOverlays([
                ...textOverlays,
                { id: new Date().getTime(), transformation: "" },
              ]);
            }}
          >
            Add Additional Text
          </Button>
        </div>
        {textOverlays.map((overlay) => {
          return (
            <TextOverlay
              key={overlay.id}
              overlay={overlay}
              handleRemoveOverlay={handleRemoveOverlay}
              handleOverlayChange={handleOverlayChange}
            />
          );
        })}
      </form>
      <IKImage
        className="pt-5"
        path={file.filePath}
        transformation={transformations}
        alt={file.name}
        width={300}
        height={300}
      />
    </div>
  );
};

export default CustomisePanel;
