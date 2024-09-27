"use client";

import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import React, { useCallback, useState } from "react";
import TextOverlay from "./text-overlay";
import { Button } from "@/components/ui/button";
import { useDebouncedCallback } from "use-debounce";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [blur, setBlur] = useState(false);
  const [sharpen, setSharpen] = useState(false);
  const [greyscale, setGreyscale] = useState(false);
  const transformations = [];

  if (blur) {
    transformations.push({ raw: `bl-10` });
  }

  if (sharpen) {
    transformations.push({ raw: `e-sharpen-10` });
  }

  if (greyscale) {
    transformations.push({ raw: `e-grayscale` });
  }

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
        let conditionalTransformations = "";
        if (useBgTextColor) {
          conditionalTransformations += `bg-${textBgColor.slice(1)},`;
        }
        const transformText = `l-text,i-${text},pa-10,fs-50,lx-bw_mul_${xDecimal.toFixed(
          1
        )},ly-bw_mul_${yDecimal.toFixed(1)},${conditionalTransformations}l-end`;
        console.log(transformText);
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
        <div>
          <Card className="p-4 space-y-4">
            <h2 className="text-2xl">Effects</h2>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={blur}
                  onCheckedChange={(e) => {
                    setBlur(e as boolean);
                  }}
                  id="blur"
                />
                <Label
                  htmlFor="blur"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Blur
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={sharpen}
                  onCheckedChange={(e) => {
                    setSharpen(e as boolean);
                  }}
                  id="sharpen"
                />
                <Label
                  htmlFor="sharpen"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sharpen
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={greyscale}
                  onCheckedChange={(e) => {
                    setGreyscale(e as boolean);
                  }}
                  id="greyscale"
                />
                <Label
                  htmlFor="greyscale"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Greyscale
                </Label>
              </div>
            </div>
          </Card>
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
      <div className="flex flex-col gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={async () => {
                  const image: HTMLImageElement | null =
                    document.querySelector(".meme > img");
                  const src = image?.getAttribute("src");
                  if (!src) {
                    return;
                  }
                  const res = await fetch(src);
                  const blob = await res.blob();
                  const url = window.URL.createObjectURL(blob);
                  console.log(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = image?.alt || "";
                  a.click();
                }}
                className="w-fit self-end"
              >
                <Download />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download Image</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="meme">
          <IKImage
            className="pt-5"
            path={file.filePath}
            transformation={transformations}
            alt={file.name}
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomisePanel;
