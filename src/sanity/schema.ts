import { type SchemaTypeDefinition } from "sanity";

import { authorType } from "./schemaTypes/authorType";
import { blockContentType } from "./schemaTypes/blockContentType";
import { cardType } from "./schemaTypes/card";
import { categoryType } from "./schemaTypes/categoryType";
import { boomCardType } from "./schemaTypes/components/boom-card";
import { gasMonetizationCardType } from "./schemaTypes/components/gas-monetization-card";
import { innovatorFundCardType } from "./schemaTypes/components/innovator-fund-card";
import { litepaper } from "./schemaTypes/components/litepaper";
import { navBanner } from "./schemaTypes/components/nav-banner";
import {
  newsletterCtaType,
  socialLinkType,
} from "./schemaTypes/components/newsletter-cta";
import { eventDescriptionType, eventType } from "./schemaTypes/event";
import { footerType } from "./schemaTypes/footerType";
import { investorType } from "./schemaTypes/investorType";
import { aboutPageType } from "./schemaTypes/pages/about";
import { airdropPageType, ctaType } from "./schemaTypes/pages/airdrop";
import { boomPageType } from "./schemaTypes/pages/boom";
import { cardPageType } from "./schemaTypes/pages/card";
import {
  bountyCategoryType,
  bountyType,
  developerResourcesPageType,
  quickstartCardType,
} from "./schemaTypes/pages/developer-resources";
import { getInTouchPageType } from "./schemaTypes/pages/get-in-touch";
import {
  backerLogoType,
  homePageType,
  infrastructurePartnerType,
} from "./schemaTypes/pages/home";
import { sodasPageType } from "./schemaTypes/pages/sodas";
import {
  tokenPageType,
  validatorNodeCardType,
} from "./schemaTypes/pages/token";
import { postType } from "./schemaTypes/postType";
import { projectTagType, projectType } from "./schemaTypes/projectType";

export const schema: {
  types: SchemaTypeDefinition[];
} = {
  types: [
    projectType,
    projectTagType,
    blockContentType,
    categoryType,
    postType,
    authorType,
    investorType,
    footerType,

    newsletterCtaType,
    socialLinkType,

    homePageType,
    infrastructurePartnerType,

    developerResourcesPageType,
    bountyType,
    bountyCategoryType,

    quickstartCardType,

    tokenPageType,
    validatorNodeCardType,

    boomPageType,

    aboutPageType,

    innovatorFundCardType,
    boomCardType,

    cardType,

    getInTouchPageType,
    gasMonetizationCardType,

    backerLogoType,

    eventDescriptionType,
    eventType,

    airdropPageType,
    ctaType,

    sodasPageType,

    cardPageType,

    navBanner,
    litepaper,
  ],
};
