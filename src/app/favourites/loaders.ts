import { assertAuthenicated } from "@/lib/auth-utils";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { favourites } from "../db/schema";

export const getFavouritedMemes = async () => {
  const userId = await assertAuthenicated();

  const favouritedMemes = await db.query.favourites.findMany({
    where: eq(favourites.userId, userId),
  });

  // const favouritedMemesImagePaths = await Promise.all(
  //   favouritedMemes.map((fav) => {
  //     return imagekit.getFileDetails(fav.memeId);
  //   })
  // );

  return favouritedMemes;
};
