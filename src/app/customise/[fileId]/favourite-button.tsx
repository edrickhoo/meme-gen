import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import React from "react";
import { toggleFavouriteMemeAction } from "./actions";
import { Heart } from "lucide-react";

type FavouriteButtonProps = {
  fileId: string;
  isFavourited: boolean;
  filePath: string;
  fileWidth: number;
  fileHeight: number;
};

const FavouriteButton = ({
  fileId,
  isFavourited,
  filePath,
  fileWidth,
  fileHeight,
}: FavouriteButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <form
            action={async () => {
              toggleFavouriteMemeAction(
                fileId,
                filePath,
                `/customise/${fileId}`,
                fileWidth,
                fileHeight
              );
            }}
          >
            <Button
              type="submit"
              onClick={async () => {}}
              className="w-fit self-end"
            >
              {isFavourited ? (
                <HeartFilledIcon
                  className={`${isFavourited ? "text-red-500" : ""}`}
                  height={24}
                  width={24}
                />
              ) : (
                <Heart />
              )}
            </Button>
          </form>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFavourited ? "Unfavourite" : "Favourite"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FavouriteButton;
