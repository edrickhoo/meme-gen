"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { IKUpload } from "imagekitio-next";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const UploadMemeButton = () => {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [displayName, setDisplayname] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [tags, setTags] = useState("");

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Upload</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload your meme image</DialogTitle>
            <DialogDescription>
              This is a meme image anyone on the site can build upon.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsUploading(true);
              ikUploadRef.current?.click();
            }}
            action=""
            className="space-y-4"
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  placeholder="Display Name"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayname(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags</Label>{" "}
                <Input
                  id="tags"
                  name="tags"
                  placeholder="A comma delimited lists of tags. E.g tag1,tag2,tag3"
                  required
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <IKUpload
                fileName="test-upload.png"
                customMetadata={{ displayName }}
                tags={[displayName, ...tags.split(",")]}
                onError={(err) => {
                  console.log("Error", err);
                  setIsUploading(false);
                }}
                onSuccess={(res) => {
                  setIsUploading(false);
                  console.log("On Success", res);
                  router.push(`/customise/${res.fileId}`);
                }}
                style={{ display: "none" }}
                ref={ikUploadRef}
              />
            </div>
            <DialogFooter className="flex justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button disabled={isUploading}>
                {isUploading && <Spinner className="text-blue-500" />}
                Select and upload image
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadMemeButton;

const Spinner = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn("animate-spin -ml-1 mr-3 h-5 w-5 text-white", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
