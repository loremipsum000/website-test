import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "SHOPIFY_STORE_DOMAIN";
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "SHOPIFY_STOREFRONT_ACCESS_TOKEN";

const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;

export async function GET(request: NextRequest) {
  try {
    const query = `
      {
        products(first: 24) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(STOREFRONT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API request failed with status ${response.status}`);
    }

    const result = await response.json();
    const edges = result?.data?.products?.edges;
    const products = Array.isArray(edges) ? edges.map((edge: any) => edge.node) : [];

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products from Shopify:", error);
    // Return an empty array instead of an error
    return NextResponse.json(
      { products: [] },
      { status: 200 }
    );
  }
} 