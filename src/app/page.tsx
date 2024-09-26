"use client";

import { Button } from "@/components/ui/button";
import { IKImage, IKUpload } from "imagekitio-next";
import { useState } from "react";
export default function Home() {
  const [filePath, setFilePath] = useState("");

  return (
    <>
      <Button variant="destructive">Test</Button>{" "}
      <div className="">
        <IKImage
          path={filePath}
          transformation={[{ raw: "l-text,i-hello world,fs-50,l-end" }]}
          alt="Alt text"
        />
      </div>
    </>
  );
}
