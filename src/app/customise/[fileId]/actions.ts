"use server";

import { db } from "@/app/db/db";
import { favourites } from "@/app/db/schema";
import { assertAuthenicated } from "@/lib/auth-utils";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const toggleFavouriteMemeAction = async (imgId: string) => {
  const userId = await assertAuthenicated();

  const existingFavourite = await db.query.favourites.findFirst({
    where: and(eq(favourites.userId, userId), eq(favourites.memeId, imgId)),
  });

  if (existingFavourite) {
    await db
      .delete(favourites)
      .where(and(eq(favourites.userId, userId), eq(favourites.memeId, imgId)));
  } else {
    await db.insert(favourites).values({
      userId,
      memeId: imgId,
    });
  }

  revalidatePath(`/customise/${imgId}`);
};
