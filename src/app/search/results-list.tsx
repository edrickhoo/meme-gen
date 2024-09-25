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

const ResultsList = ({ files }: { files: FileObject[] }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {files
        .filter((file) => file.fileType === "image")
        .map((file) => (
          <div key={file.fileId}>
            <Card className="w-[350px]">
              {/* <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader> */}
              <CardContent>
                <IKImage
                  className="pt-5"
                  path={file.filePath}
                  height={300}
                  width={300}
                  transformation={[{ raw: "l-text,i-hello world,fs-50,l-end" }]}
                  alt="Alt text"
                />
              </CardContent>
              {/* <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter> */}
            </Card>
          </div>
        ))}
    </div>
  );
};

export default ResultsList;
