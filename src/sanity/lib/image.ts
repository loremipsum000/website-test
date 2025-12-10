import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "../env";

// Use safe defaults so image URL creation still works during local mock mode.
const builder = createImageUrlBuilder({
  projectId: projectId || "demo",
  dataset: dataset || "production",
});

type SupportedImageSource = SanityImageSource | string | { url?: string };

export const urlFor = (source: SupportedImageSource) => {
  if (!source) {
    return { url: () => "" };
  }

  if (typeof source === "string") {
    return { url: () => source };
  }

  if (
    typeof source === "object" &&
    "url" in source &&
    typeof (source as { url?: string }).url === "string"
  ) {
    return { url: () => (source as { url?: string }).url! };
  }

  return builder.image(source);
};
