"use client";
import { IKImage } from "imagekitio-next";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { FileWithFav } from "./page";

const ResultsList = ({ files }: { files: FileWithFav[] }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {files
        .filter((file) => file.fileType === "image")
        .map((file) => (
          <div key={file.fileId}>
            <Card className="">
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between items-center">
                    <div>{file.customMetadata?.displayName || file.name}</div>
                    <div className="flex items-center justify-center gap-1">
                      <HeartFilledIcon className="h-4 w-4" />
                      <div>{file.favCount || 0}</div>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center object-cover">
                <IKImage
                  className="pt-5"
                  path={file.filePath}
                  width={file.width}
                  height={file.height}
                  alt={
                    file?.customMetadata?.displayName?.toString() ||
                    file.name ||
                    "Image"
                  }
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild>
                  <Link href={`/customise/${file.fileId}`}>Customise</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default ResultsList;
