"use client";

import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import React, { useCallback, useState } from "react";
import TextOverlay from "./text-overlay";
import { Button } from "@/components/ui/button";
import { useDebouncedCallback } from "use-debounce";

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
  const handleOverlayChange = useCallback((id: number, text: string) => {
    setTextOverlays((textOverlays) => {
      const foundIdx = textOverlays.findIndex((overlay) => overlay.id === id);
      if (foundIdx === -1) return [];
      textOverlays[foundIdx].transformation = text;
      return [...textOverlays];
    });
  }, []);

  const onOverlayUpdate = useCallback(
    useDebouncedCallback(
      (
        id: number,
        text: string,
        x: number,
        y: number,
        textBgColor: string,
        useBgTextColor: boolean
      ) => {
        if (!text) {
          return handleOverlayChange(id, "");
        }
        const xDecimal = x / 100;
        const yDecimal = y / 100;
        const transformText = `l-text,i-${text},pa-10,fs-50,lx-bw_mul_${xDecimal.toFixed(
          1
        )},ly-bw_mul_${yDecimal.toFixed(1)},${
          useBgTextColor ? `bg-${textBgColor.slice(1)},` : ""
        }l-end`;

        handleOverlayChange(id, transformText);
      },
      250
    ),
    [handleOverlayChange]
  );

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
              onOverlayUpdate={onOverlayUpdate}
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
