"use server";

import { db } from "@/app/db/db";
import { favouriteCounts, favourites } from "@/app/db/schema";
import { assertAuthenicated } from "@/lib/auth-utils";
import { eq, and, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const toggleFavouriteMemeAction = async (
  imgId: string,
  filePath: string,
  pathToRevalidate: string,
  fileHeight: number,
  fileWidth: number
) => {
  const userId = await assertAuthenicated();

  const existingFavourite = await db.query.favourites.findFirst({
    where: and(eq(favourites.userId, userId), eq(favourites.memeId, imgId)),
  });

  const favouritesCount = await db
    .select()
    .from(favouriteCounts)
    .where(eq(favouriteCounts.memeId, imgId));

  if (existingFavourite) {
    await db
      .delete(favourites)
      .where(and(eq(favourites.userId, userId), eq(favourites.memeId, imgId)));

    await updateFavouriteCount(imgId, favouritesCount[0].favCount - 1);
  } else {
    await db.insert(favourites).values({
      userId,
      memeId: imgId,
      filePath: filePath,
      fileWidth,
      fileHeight,
    });

    if (favouritesCount[0]) {
      await updateFavouriteCount(imgId, favouritesCount[0].favCount + 1);
    } else {
      await createFavouriteCountEntry(imgId);
    }
  }

  revalidatePath(pathToRevalidate);
};

const createFavouriteCountEntry = async (memeId: string) => {
  return await db
    .insert(favouriteCounts)
    .values({ memeId: memeId, favCount: 1 });
};

const updateFavouriteCount = async (memeId: string, amount: number) => {
  await db
    .update(favouriteCounts)
    .set({ favCount: amount })
    .where(eq(favouriteCounts.memeId, memeId));
};

export const getFavCountFromIdsAction = async (ids: string[]) => {
  return await db
    .select()
    .from(favouriteCounts)
    .where(inArray(favouriteCounts.memeId, ids));
};
