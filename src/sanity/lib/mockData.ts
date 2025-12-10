import {
  getAboutPage,
  getAirdropPage,
  getBoomCard,
  getBoomPage,
  getCardPage,
  getDeveloperResourcesPage,
  getGetInTouchPage,
  getHomePage,
  getInnovatorFundCard,
  getLitepaperPage,
  getNavBanner,
  getSodasPage,
} from "./queries";

const placeholderImage = "/logo/sonic.png";

const portableText = [
  {
    _type: "block",
    _key: "mock-block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "mock-span",
        text: "This is placeholder copy for local development.",
        marks: [],
      },
    ],
  },
];

const contactTopics = [
  {
    label: "General",
    recipients: ["local@example.com"],
  },
  {
    label: "Partnerships",
    recipients: ["partnerships@example.com"],
  },
];

const mockBrandPartners = [
  { name: "Sonic", logo: "/logo/sonic.png" },
  { name: "Open Source", logo: "/logo/logo-openzeppelin.svg" },
];

const mockMap = new Map<string, unknown>([
  [
    getHomePage,
    {
      hero: {
        title: "Build fast with Sonic (mock)",
        subtitle: "Local mock data keeps the site running without Sanity.",
        cta: { title: "Docs", url: "#" },
        secondaryCta: { title: "Get started", url: "#" },
      },
      appShowcase: {
        caption: "Featured apps (mocked)",
        apps: [
          { name: "Demo Swap", url: "https://example.com", icon: placeholderImage },
          { name: "Demo Wallet", url: "https://example.com", icon: placeholderImage },
          { name: "Demo Bridge", url: "https://example.com", icon: placeholderImage },
        ],
      },
      networkStatsSection: {
        title: "Network stats",
        subtitle: "Static values for local dev",
        stats: [
          { title: "Throughput", value: "~400k/s" },
          { title: "Finality", value: "Sub-second" },
          { title: "Fees", value: "$0.001" },
        ],
        cta: { title: "View docs", url: "#" },
      },
      sonicStackSection: {
        title: "Sonic stack (mock)",
        subtitle: "Placeholder content while Sanity is disabled.",
        cta: { title: "Learn more", url: "#" },
        url: "#",
        features: [
          {
            title: "Performance",
            icon: placeholderImage,
            url: "#",
            bulletPoints: ["~400k TPS", "Real-time confirmations"],
            showAuditPartners: false,
            auditPartners: [],
          },
          {
            title: "EVM Compatible",
            icon: placeholderImage,
            url: "#",
            bulletPoints: ["Use familiar tooling", "Deploy Solidity contracts"],
            showAuditPartners: false,
            auditPartners: [],
          },
          {
            title: "Low Fees",
            icon: placeholderImage,
            url: "#",
            bulletPoints: ["< $0.001 per tx", "No surprise costs"],
            showAuditPartners: false,
            auditPartners: [],
          },
        ],
      },
      innovatorFundSection: {
        title: "Innovator Fund",
        subtitle: "Fueling builders with grants and support.",
        cta: { title: "Apply now", url: "#" },
        secondaryCta: { title: "Learn more", url: "#" },
        innovatorFundCard: {
          prefix: "Up to",
          postfix: "for teams building on Sonic",
          dollarAmount: "1,000,000",
          cta: { title: "See details", url: "#" },
        },
      },
      dotsonicFloater: null,
      infrastructurePartners: [],
      airdropSection: { cta: { title: "Join airdrop", url: "#" } },
      backingSection: [],
      seo: {},
    },
  ],
  [
    getNavBanner,
    {
      text: "Running with mock Sanity data locally.",
      link: "#",
      isActive: false,
    },
  ],
  [
    getDeveloperResourcesPage,
    {
      title: "Developer resources (mock)",
      tagline: "Placeholder data for local development.",
      quickstartCards: [
        {
          title: "Deploy a contract",
          description: "Use Foundry/Hardhat to deploy on Sonic testnet.",
          image: placeholderImage,
          cta: { title: "View guide", url: "#" },
        },
        {
          title: "Query RPC",
          description: "Connect with the public RPC endpoints.",
          image: placeholderImage,
          cta: { title: "RPC docs", url: "#" },
        },
        {
          title: "Explore docs",
          description: "Browse the Sonic developer documentation.",
          image: placeholderImage,
          cta: { title: "Docs", url: "#" },
        },
      ],
      seo: {},
    },
  ],
  [
    getInnovatorFundCard,
    {
      prefix: "Over",
      postfix: "in grants",
      dollarAmount: "1,000,000",
      cta: { title: "Apply", url: "#" },
      partners: [
        { name: "Partner One", logo: placeholderImage },
        { name: "Partner Two", logo: placeholderImage },
      ],
    },
  ],
  [
    getBoomCard,
    {
      sonicLogo: placeholderImage,
      tagline: "Build with Sonic and earn (mock data).",
      boomIllustration: placeholderImage,
      cta: { title: "Learn more", url: "#" },
    },
  ],
  [
    getAboutPage,
    {
      title: "About Sonic (mock)",
      tagline: "Local placeholder content so the page renders.",
      team: [
        { name: "Alex Doe", role: "Protocol", image: "/team/ac.png" },
        { name: "Jamie Roe", role: "Ecosystem", image: "/team/bs.png" },
        { name: "Casey Poe", role: "Product", image: "/team/dr.png" },
      ],
      additionalHeadCount: 12,
      events: [
        {
          _id: "event-1",
          image: placeholderImage,
          title: "Community AMA",
          shortDescription: "An AMA about Sonic's roadmap.",
          time: "2024-12-01T18:00:00Z",
          location: "Online",
          link: "#",
        },
      ],
      seo: {},
    },
  ],
  [
    getGetInTouchPage,
    {
      contactSection: {
        title: "Get in touch (mock)",
        description: "Sanity is disabled, but the form still renders.",
        contactForm: {
          title: "Reach the team",
          topics: contactTopics,
        },
      },
      quickstartSection: {
        cards: [
          {
            title: "Docs",
            description: "Read the Sonic documentation.",
            image: placeholderImage,
            cta: { title: "Open docs", url: "#" },
          },
          {
            title: "Ecosystem",
            description: "Explore live apps and partners.",
            image: placeholderImage,
            cta: { title: "See apps", url: "#" },
          },
        ],
      },
      seo: {},
    },
  ],
  [
    getAirdropPage,
    {
      cta: { title: "Join airdrop (mock)", url: "#" },
      secondaryCta: { title: "Learn more", url: "#" },
      prizeCard: {
        kicker: "Up to",
        tokenAmount: 1000000,
        tokenDefillamaId: "sonic",
        tokenSymbol: "S",
      },
      stepper: {
        steps: [
          { title: "Connect wallet", description: "Use a test wallet." },
          { title: "Complete tasks", description: "Finish mock quests." },
          { title: "Claim", description: "Receive mock rewards." },
        ],
      },
      seo: {},
    },
  ],
  [
    getSodasPage,
    {
      heroSection: {
        title: "Sonic & Sodas (mock)",
        description: "Local-only placeholder event program.",
        cta: { title: "RSVP", url: "#" },
        secondaryCta: { title: "Join Discord", url: "#" },
        image: placeholderImage,
      },
      howItWorksSection: {
        title: "How it works",
        description: "Replace with real content once Sanity is configured.",
        termsAndConditionsUrl: "#",
        steps: [
          { title: "Sign up", description: "Register interest." },
          { title: "Attend", description: "Join the session." },
          { title: "Build", description: "Collaborate with builders." },
        ],
      },
      upcomingEventsSection: {
        title: "Upcoming events",
        description: "Mock events for local mode.",
        events: [
          {
            _id: "mock-event",
            image: placeholderImage,
            title: "Local Builder Meetup",
            shortDescription: "Share feedback on the developer experience.",
            time: "2024-12-05T17:00:00Z",
            location: "Paris",
            link: "#",
          },
        ],
      },
      seo: {},
    },
  ],
  [
    getBoomPage,
    {
      hero: {
        image: placeholderImage,
        description: "Mock description for Sonic Boom.",
      },
      prizeCard: { fantomAmount: 500000 },
      cards: [
        {
          title: "Build",
          description: "Ship features to earn mock points.",
          image: placeholderImage,
          cta: { title: "Start", url: "#" },
        },
        {
          title: "Grow",
          description: "Expand the ecosystem with friends.",
          image: placeholderImage,
          cta: { title: "Invite", url: "#" },
        },
      ],
      rankingCards: [
        {
          title: "Top Builders",
          description: "Recognizing contributors.",
          image: placeholderImage,
          indicator: "Live",
        },
      ],
      bountySection: {
        title: "Bounties",
        description: "Sample bounties for mock mode.",
        cta: { title: "View bounties", url: "#" },
        bounties: [
          {
            _id: "bounty-1",
            title: "Improve docs",
            description: "Write a guide for onboarding.",
            link: "#",
            categories: [{ name: "Docs" }],
          },
        ],
      },
      bonusCards: [
        {
          title: "Bonus XP",
          description: "Complete extra quests for points.",
          image: placeholderImage,
        },
      ],
      faq: [
        { question: "What is Sonic Boom?", answer: portableText },
        { question: "How do I join?", answer: portableText },
      ],
      seo: {},
    },
  ],
  [
    getLitepaperPage,
    {
      fileUrl: "/sonic-litepaper.pdf",
      seo: {},
    },
  ],
  [
    getCardPage,
    {
      heroSection: {
        title: "Sonic Pay (mock)",
        subtitle: "Spend crypto anywhere with mock data.",
        cardImage: placeholderImage,
      },
      physicalCardSection: {
        tabTitle: "Physical",
        title: "Physical card",
        description: "Mock description for the physical card.",
        cta: { title: "Order", url: "#" },
      },
      virtualCardSection: {
        tabTitle: "Virtual",
        title: "Virtual card",
        description: "Mock description for the virtual card.",
        cta: { title: "Create", url: "#" },
      },
      globalCoverageSection: {
        title: "Global coverage (mock)",
        subtitle: "Supported in demo regions.",
        features: [
          {
            icon: placeholderImage,
            title: "Instant issuance",
            description: "Create a card in seconds.",
          },
          {
            icon: placeholderImage,
            title: "Low fees",
            description: "Keep transaction fees tiny.",
          },
          {
            icon: placeholderImage,
            title: "Everywhere",
            description: "Works online and in-store.",
          },
        ],
        cta: { title: "Learn more", url: "#" },
      },
      brandPartners: mockBrandPartners,
      faqSection: {
        title: "FAQ",
        questions: [
          { question: "Is this real data?", answer: portableText },
          { question: "How do I test locally?", answer: portableText },
        ],
      },
      internationalSection: {
        title: "International availability",
        description: "Mock availability details.",
        cta: { title: "Check regions", url: "#" },
      },
      seo: {},
    },
  ],
]);

const inlineMatchers = [
  {
    matcher: (query: string) => query.includes('"getInTouchPage"'),
    data: mockMap.get(getGetInTouchPage),
  },
];

export function getMockResponse(query: string) {
  const direct = mockMap.get(query);
  if (direct !== undefined) return direct;

  const inline = inlineMatchers.find(({ matcher }) => matcher(query));
  if (inline) return inline.data ?? null;

  return null;
}

