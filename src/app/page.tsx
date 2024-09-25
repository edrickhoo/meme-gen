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
      <div>
        <h2>File upload</h2>
        <IKUpload
          fileName="test-upload.png"
          onError={(err) => {
            console.log("Error", err);
          }}
          onSuccess={(res) => {
            console.log("On Success", res);
            setFilePath(res.filePath);
          }}
        />
      </div>
    </>
  );
}
