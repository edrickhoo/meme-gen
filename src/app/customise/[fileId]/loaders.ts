import { db } from "@/app/db/db";
import { favourites } from "@/app/db/schema";
import { assertAuthenicated } from "@/lib/auth-utils";
import { and, eq } from "drizzle-orm";

export const getFavouriteMeme = async (imgId: string) => {
  const userId = await assertAuthenicated();
  const favourite = await db.query.favourites.findFirst({
    where: and(eq(favourites.userId, userId), eq(favourites.memeId, imgId)),
  });

  return !!favourite;
};
