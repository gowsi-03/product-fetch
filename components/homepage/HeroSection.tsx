"use client";

import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import type { Asset } from "contentful";

type HeroSectionProps = {
  heroBanner?: Asset;
  heroHeadline: string;
  heroSubtext?: Document | string;
};

export function HeroSection({
  heroBanner,
  heroHeadline,
  heroSubtext,
}: HeroSectionProps) {
  const heroBannerUrl = heroBanner?.fields?.file?.url;
  const heroBannerTitle =
    typeof heroBanner?.fields?.title === "string"
      ? heroBanner.fields.title
      : "Hero Banner";

  return (
    <div className="my-8 relative w-full h-[40vh] sm:h-[42vh] md:h-[45vh]">
      {heroBannerUrl ? (
        <Image
          src={`https:${heroBannerUrl}`}
          alt={heroBannerTitle}
          fill
          priority
          className="object-cover w-full h-full rounded-lg"
        />
      ) : (
        <p>Hero banner image not available.</p>
      )}

      <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-28">
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg uppercase max-w-52 md:max-w-2xl">
          {heroHeadline}
        </h2>
        {heroSubtext &&
        typeof heroSubtext === "object" &&
        "content" in heroSubtext ? (
          <div>{documentToReactComponents(heroSubtext as Document)}</div>
        ) : typeof heroSubtext === "string" ? (
          <p className="text-sm sm:text-lg md:text-2xl drop-shadow-md uppercase max-w-md sm:max-w-2xltext-gray-500">{heroSubtext}</p>
        ) : null}
      </div>
    </div>
  );
}
