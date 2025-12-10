import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "SHOPIFY_STORE_DOMAIN";
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "SHOPIFY_STOREFRONT_ACCESS_TOKEN";

const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;

export async function GET(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    const { handle } = params;

    const query = `
      {
        productByHandle(handle: "${handle}") {
          id
          title
          handle
          description
          descriptionHtml
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 20) {
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
    
    if (!result.data.productByHandle) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { product: result.data.productByHandle },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product from Shopify:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
} 