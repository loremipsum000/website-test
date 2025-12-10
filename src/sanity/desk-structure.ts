import { StructureBuilder } from "sanity/structure";

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Settings")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.documentListItem()
                .title("Home")
                .schemaType("homePage")
                .id("homePage"),
              S.documentListItem()
                .title("About")
                .schemaType("aboutPage")
                .id("aboutPage"),
              S.documentListItem()
                .title("Developer Resources")
                .schemaType("developerResourcesPage")
                .id("developerResourcesPage"),
              S.documentListItem()
                .title("Get In Touch")
                .schemaType("getInTouchPage")
                .id("getInTouchPage"),
              S.documentListItem()
                .title("Token")
                .schemaType("tokenPage")
                .id("tokenPage"),
              S.documentListItem()
                .title("Boom")
                .schemaType("boomPage")
                .id("boomPage"),
              S.documentListItem()
                .title("Airdrop")
                .schemaType("airdropPage")
                .id("airdropPage"),
              S.documentListItem()
                .title("Sodas")
                .schemaType("sodasPage")
                .id("sodasPage"),
              S.documentListItem()
                .title("Card")
                .schemaType("cardPage")
                .id("cardPage"),
            ])
        ),
      S.listItem()
        .title("Components")
        .child(
          S.list()
            .title("Components")
            .items([
              S.documentListItem()
                .title("Footer")
                .schemaType("footer")
                .id("footer"),
              S.documentListItem()
                .title("Newsletter CTA")
                .schemaType("newsletterCta")
                .id("newsletterCta"),
              S.documentListItem()
                .title("Innovator Fund Card")
                .schemaType("innovatorFundCard")
                .id("innovatorFundCard"),
              S.documentListItem()
                .title("Boom Card")
                .schemaType("boomCard")
                .id("boomCard"),
              S.documentListItem()
                .title("Gas Monetization Card")
                .schemaType("gasMonetizationCard")
                .id("gasMonetizationCard"),
              S.documentListItem()
                .title("Nav Banner")
                .schemaType("navBanner")
                .id("navBanner"),
            ])
        ),
      S.listItem()
        .title("Documents")
        .child(
          S.list()
            .title("Documents")
            .items([
              S.documentListItem()
                .title("Litepaper")
                .schemaType("litepaper")
                .id("litepaper"),
            ])
        ),
    ]);
