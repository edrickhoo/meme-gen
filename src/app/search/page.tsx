import { unstable_noStore } from "next/cache";
import ResultsList from "./results-list";
import UploadMemeButton from "./upload-meme-button";
import { imagekit } from "@/lib/image-kit";
import { getFavCountFromIdsAction } from "../customise/[fileId]/actions";
import { FileObject } from "imagekit/dist/libs/interfaces";

export type FileWithFav = FileObject & {
  favCount?: number;
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  // For incase it uses native fetch func under the hook for imagekit not to cache
  unstable_noStore();

  const files = await imagekit.listFiles({
    // searchQuery: `name:${searchParams.q}`,
    tags: `${searchParams.q}`,
  });

  const favCounts = await getFavCountFromIdsAction(
    files.map((file) => file.fileId)
  );

  files.map((file: FileWithFav) => {
    const foundFav = favCounts.find((fav) => fav.memeId === file.fileId);
    if (foundFav) {
      file.favCount = foundFav.favCount;
    }
    return file;
  });

  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Search Results</h1>
        <UploadMemeButton />
      </div>
      {searchParams.q && <h2>Looking for {searchParams.q}</h2>}
      <ResultsList files={files} />
    </div>
  );
};

export default SearchPage;
