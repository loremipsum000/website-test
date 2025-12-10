// ./src/sanity/lib/queries.ts

import { groq } from "next-sanity";

export const imageFields = groq`
  _type,
  crop{
  _type,
  right,
  top,
  left,
  bottom
  },
  hotspot{
  _type,
  x,
  y,
  height,
  width,
  },
  asset->{...}
  `;

export const twitterQuery = groq`
  _type,
  site,
  creator,
  cardType,
  handle
  `;

export const openGraphQuery = groq`
  _type,
  siteName,
  url,
  description,
  title,
  image{
  ${imageFields}
  }
  `;

export const metaAttributesQuery = groq`
  _type,
  attributeValueString,
  attributeType,
  attributeKey,
  attributeValueImage{
  ${imageFields}
  }
  `;

export const seofields = groq`
  _type,
  metaTitle,
  nofollowAttributes,
  seoKeywords,
  metaDescription,
  openGraph{
  ${openGraphQuery}
  },
  twitter{
  ${twitterQuery}
  },
  additionalMetaTags[]{
  _type,
  metaAttributes[]{
  ${metaAttributesQuery}
  }
  }
  `;

export const seo = groq`seo{
  ${seofields}
}`;

export const PROJECTS_QUERY = groq`*[_type == "project"] {
 _id,
 name,
 image,
 link,
 tags[]->{name},
}`;

export const getHomePage = groq`*[_type == "homePage"][0] {
  hero {
    title,
    subtitle,
    cta {
      title,
      url
    },
    secondaryCta {
      title,
      url
    }
  },
  dotsonicFloater,
  infrastructurePartners[],
  networkStatsSection {
    title,
    subtitle,
    stats[] {
      title,
      value
    },
    cta { 
      title,
      url
    }
  },
  feemCard,
  appShowcase {
    caption,
    apps[]
  },
  airdropSection {
    cta {
      title,
      url
    }
  },
  innovatorFundSection {
    title,
    subtitle,
    cta {
      title,
      url
    }, 
    secondaryCta {
      title,  
      url
    },
    innovatorFundCard {
      prefix,
      postfix,
      dollarAmount,
      cta {
        title,
        url
      }
    }
  },
  backingSection,
  sonicStackSection {
    title,
    url,
    subtitle,
    features[] {
      title,
      icon,
      url,
      bulletPoints,
      showAuditPartners,
      auditPartners[] {
        name,
        logo,
        url
      }
    },
   },
  ${seo}
}`;

export const getTokenPage = groq`*[_type == "tokenPage"][0] {
  hero {
    title,
    subtitle,
    cta {
      title,
      url
    }
  },
  utilitySection {
    title,
    description,
    utilityCards[] {
      icon,
      title,
      description
    }
  },
  migrationSection {
    title,
    description,
    illustration,
    cta {
      title,
      url
    }
  },
  validatorNodeCard -> {
    title,
    description,
    validatorIcons,
    features[] {
      title,
      description
    },
    cta,
    secondaryCta
  },
  ${seo}
}`;

export const getBoomPage = groq`*[_type == "boomPage"][0] {
    hero {
      image,
      description
    },
    prizeCard {
      fantomAmount
    },
    cards[] {
      title,
      description,
      image,
      cta {
        title,
        url
      }
    },
    rankingCards,
    bonusCards,
    bountySection {
        title,
        description,
        cta,
        bounties[] {
          title,
          categories[] -> {
            name
          }
      }
    },
    faq[] {
        question,
        answer  
      },
    ${seo}
} `;

export const getDeveloperResourcesPage = groq`*[_id == "developerResourcesPage"][0] {
  title,
  tagline,
  quickstartCards[],
  ${seo}
}`;

export const getFooterData = groq`*[_type == "footer"][0] {
  logo,
  copyrightNotice,
  linkSections[] {
    title,
   links[] {
      title,
      url
    }
  }
}`;

export const getNewsletterCtaData = groq`*[_id == "newsletterCta"][0] {
  showNewsletterCta,
  title,
  subtitle,
  signUpText,
  socialLinks[] {
    type,
    title,
    url
  },
  successMessage,
  errorMessage
}`;

export const getInnovatorFundCard = groq`*[_id == "innovatorFundCard"][0] {
  prefix,
  postfix,
  dollarAmount,
  cta {
    title,
    url
  },
  partners[] {
    name,
    logo
  }
}`;

export const getBoomCard = groq`*[_id == "boomCard"][0] {
  sonicLogo,
  tagline,
  boomIllustration,
  cta {
    title,
    url
  }
}`;

export const getAboutPage = groq`*[_id == "aboutPage"][0] {
  title,
  tagline,
  team[],
  additionalHeadCount,
  events[]->,
  ${seo}
}`;

export const getGetInTouchPage = groq`*[_id == "getInTouchPage"][0] {
  contactSection,
  quickstartSection,
  ${seo}
}`;

export const getAirdropPage = groq`*[_id == "airdropPage"][0]`;

export const getNavBanner = groq`*[_id == "navBanner"][0] {
  text,
  link,
  isActive
}`;

export const getSodasPage = groq`
  *[_id == "sodasPage"][0] {
    heroSection {
      title,
      description,
      cta,
      secondaryCta,
      image
    },
    howItWorksSection {
      title,
      termsAndConditionsUrl,
      description,
      steps[] {
        title,
        description
      }
    },
    upcomingEventsSection {
      title,
      description,
      events[]->
    },
    ${seo}
}
`;

export const getLitepaperPage = groq`*[_id == "litepaper"][0] {
  "fileUrl": file.asset->url,
  ${seo}
}`;

export const getCardPage = groq`*[_id == "cardPage"][0] {
  heroSection {
    title,
    subtitle,
    cardImage
  },
  physicalCardSection {
    tabTitle,
    title,
    description,
    cta {
      title,
      url
    }
  },
  virtualCardSection {
    tabTitle,
    title,
    description,
    cta {
      title,
      url
    }
  },
  globalCoverageSection {
    title,
    subtitle,
    features[] {
      icon,
      title,
      description
    },
    cta {
      title,
      url
    }
  },
  brandPartners,
  faqSection {
    title,
    questions[] {
      question,
      answer
    }
  },
  internationalSection {
    title,
    description,
    cta
  },
  ${seo}
}`;
