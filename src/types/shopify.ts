export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: {
    edges: {
      node: {
        url: string;
        altText: string;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
      };
    }[];
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  estimatedCost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          product: {
            title: string;
          };
          title: string;
          image: {
            url: string;
          };
          price: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }[];
  };
} 