import { generateMetadataFromSeo } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/client";
import { getLitepaperPage } from "@/sanity/lib/queries";
import { cache } from "react";
import LitepaperPDF from "./pdf";

const getPageData = cache(
  async () => (await sanityFetch({ query: getLitepaperPage })) as any
);

export async function generateMetadata() {
  const page = await getPageData();
  return generateMetadataFromSeo(page.seo);
}
export default async function LitepaperPage() {
  const page = await getPageData();
  return (
    <LitepaperPDF url={page.fileUrl} />
  );
}


if (typeof Promise.withResolvers === "undefined") {
  if (typeof window !== 'undefined') {
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject
      const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve, reject }
    }
  } else {
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    global.Promise.withResolvers = function () {
      let resolve, reject
      const promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve, reject }
    }
  }
}