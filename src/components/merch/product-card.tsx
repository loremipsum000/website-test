"use client";

import Image from "next/image";
import Link from "next/link";
import { ShopifyProduct } from "@/types/shopify";

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Get the first image and variant
  const firstImage = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges[0]?.node;
  
  // Format the price
  const price = firstVariant?.price?.amount 
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: firstVariant.price.currencyCode,
      }).format(parseFloat(firstVariant.price.amount))
    : 'Price unavailable';

  return (
    <div className="group relative overflow-hidden rounded-lg">
      <Link href={`/merch/product/${product.handle}`}>
        <div className="relative h-80 w-full overflow-hidden bg-gray-900">
          {firstImage?.url ? (
            <Image
              src={firstImage.url}
              alt={firstImage.altText || product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-800">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-semibold text-white">{product.title}</h3>
          <p className="mt-2 text-lg font-medium text-white">{price}</p>
          
          <div className="mt-2">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full transition duration-300"
            >
              Add to cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
} 