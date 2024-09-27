import { unstable_noStore } from "next/cache";
import { imagekit } from "@/lib/image-kit";
import CustomisePanel from "./customise-panel";
import { getFavouriteMeme } from "./loaders";
import { auth } from "@/auth";

const CustomisePage = async ({ params }: { params: { fileId: string } }) => {
  // For incase it uses native fetch func under the hook for imagekit not to cache
  unstable_noStore();

  const session = await auth();

  const file = await imagekit.getFileDetails(params.fileId);
  const isFavourited = session ? await getFavouriteMeme(params.fileId) : false;

  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
      {" "}
      <div className="space-y-3">
        {" "}
        <h1 className="text-4xl font-bold">Customise</h1>
        <CustomisePanel
          // file={{
          //   filePath: file.filePath,
          //   name: file.name,
          //   fileId: file.fileId,
          // }}
          file={file}
          isFavourited={isFavourited}
          isAuthenicated={!!session}
        />
      </div>
    </div>
  );
};

export default CustomisePage;
