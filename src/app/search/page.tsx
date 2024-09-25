import ImageKit from "imagekit";
import { unstable_noStore } from "next/cache";
import ResultsList from "./results-list";

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
  // For fetch func not to cache
  unstable_noStore();

  const files = await imagekit.listFiles({
    searchQuery: `name:${searchParams.q}`,
  });
  console.log({ files });

  return (
    <div className="container mx-auto space-y-8 py-8">
      <h1 className="text-4xl font-bold">Search Results</h1>
      {searchParams.q && <h2>Looking for {searchParams.q}</h2>}
      <ResultsList files={files} />
    </div>
  );
};

export default SearchPage;
