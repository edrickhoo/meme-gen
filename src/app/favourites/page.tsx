import { unstable_noStore } from "next/cache";
import React from "react";
import FavouritesList from "./favourites-list";
import { getFavouritedMemes } from "./loaders";

const FavouritesPage = async () => {
  unstable_noStore();
  const favourites = await getFavouritedMemes();

  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold">Favourites</h1>
        <FavouritesList files={favourites} />
      </div>
    </div>
  );
};

export default FavouritesPage;
