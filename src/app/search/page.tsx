import ImageKit from "imagekit";
import { unstable_noStore } from "next/cache";
import ResultsList from "./results-list";
import { Button } from "@/components/ui/button";
import UploadMemeButton from "./upload-meme-button";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY || "",
  privateKey: process.env.PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT || "",
});

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
  console.log({ files });

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
