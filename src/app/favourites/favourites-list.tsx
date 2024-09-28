"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IKImage } from "imagekitio-next";
import React from "react";
import FavouriteButton from "../customise/[fileId]/favourite-button";
import { Favourite } from "../db/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

type FavouritesListProps = {
  files: Favourite[];
};

const FavouritesList = ({ files }: FavouritesListProps) => {
  if (files.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center gap-8 py-16 h-full">
        <h3 className="text-xl font-semibold">No favourites</h3>
        <p>
          Please{" "}
          <Link className="text-blue-800" href={"/search?q="}>
            click here
          </Link>{" "}
          to browse and favourite some memes
        </p>
        <Image
          className="w-full h-full aspect-auto max-w-[500px]"
          src={"./no-data.svg"}
          alt={"No Data"}
          width={300}
          height={0}
        />
      </Card>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {files.map((file) => (
        <div key={file.memeId}>
          <Card className="">
            <CardHeader>
              {/* <CardTitle>
                  {file.customMetadata?.displayName || file.name}
                </CardTitle> */}
            </CardHeader>
            <CardContent className="flex items-center justify-center object-cover">
              <IKImage
                className="pt-5"
                path={file.filePath}
                width={file.fileWidth}
                height={file.fileHeight}
                alt="Alt text"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild>
                <Link href={`/customise/${file.memeId}`}>Customise</Link>
              </Button>
              <FavouriteButton
                fileId={file.memeId}
                isFavourited={true}
                filePath={file.filePath}
                fileWidth={file.fileWidth}
                fileHeight={file.fileHeight}
              />
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default FavouritesList;
