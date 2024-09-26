"use client";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ResultsList = ({ files }: { files: FileObject[] }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {files
        .filter((file) => file.fileType === "image")
        .map((file) => (
          <div key={file.fileId}>
            <Card className="">
              <CardHeader>
                <CardTitle>
                  {file.customMetadata?.displayName || file.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center object-cover">
                <IKImage
                  className="pt-5"
                  path={file.filePath}
                  width={200}
                  height={200}
                  transformation={[
                    // { width: "100", height: "100" },
                    { raw: "l-text,i-hello world,fs-50,l-end" },
                  ]}
                  alt="Alt text"
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
