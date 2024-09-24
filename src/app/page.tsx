"use client";

import { Button } from "@/components/ui/button";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import { useState } from "react";
import Header from "./header";
export default function Home() {
  const [filePath, setFilePath] = useState("");
  console.log(process.env.NEXT_PUBLIC_URL_ENDPOINT, "asdsa");

  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Authentication request failed: ${error.message}`);
      }
    }
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <Button variant="destructive">Test</Button>
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
    </ImageKitProvider>
  );
}
