import Image from "next/image";
import React from "react";
import NoResultsSvg from "../../../public/no-results.svg";

const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-6">
      <p className="text-lg font-semibold">
        Unfortunately, no results were found
      </p>
      <Image alt="No Results" src={NoResultsSvg} />
    </div>
  );
};

export default NoResults;
