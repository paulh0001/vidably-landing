export interface EvidenceCardData {
  videoSrc: string;
  posterSrc: string;
  nameLine: string;
  subLine: string;
}

/**
 * Single source of truth for all evidence card video data.
 * Each section picks the cards it needs by key.
 * Video URLs point to the transcoded .mp4 files.
 */
export const EVIDENCE_CARDS = {
  dogtreats: {
    videoSrc: "/images/evidence-cards/evidence-card-dogtreats.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-dogtreats-poster.jpg",
    nameLine: "Marcus T. - Verified",
    subLine: "Natural Dog Treats - 12oz",
  },
  inkblotMug: {
    videoSrc: "/images/evidence-cards/evidence-card-inkblot-mug.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-inkblot-mug-poster.jpg",
    nameLine: "Jamie L. - Verified",
    subLine: "Inkblot Mug",
  },
  card5: {
    videoSrc: "/images/evidence-cards/evidence-card-5.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-5-poster.jpg",
    nameLine: "Alexa P. - 5.7ft.",
    subLine: "White Hoodie - Small",
  },
  candles: {
    videoSrc: "/images/evidence-cards/evidence-card-candles.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-candles-poster.jpg",
    nameLine: "Sam K. - Verified",
    subLine: "Soy Candles - Set of 3",
  },
  golfshirt1: {
    videoSrc: "/images/evidence-cards/evidence-card-golfshirt-1.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-golfshirt-1-poster.jpg",
    nameLine: "Jordan M. - 6.0ft.",
    subLine: "Polo Golf Shirt - Medium",
  },
  card1: {
    videoSrc: "/images/evidence-cards/evidence-card-1.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-1-poster.jpg",
    nameLine: "Riley C. - 5.5ft.",
    subLine: "Green Hoodie - Medium",
  },
  card2: {
    videoSrc: "/images/evidence-cards/evidence-card-2.mp4",
    posterSrc: "/images/evidence-cards/evidence-card-2-poster.jpg",
    nameLine: "Morgan D. - 5.9ft.",
    subLine: "White Hoodie - Medium",
  },
} as const satisfies Record<string, EvidenceCardData>;

/** Hero carousel uses these 5 cards. */
export const HERO_CARDS: EvidenceCardData[] = [
  EVIDENCE_CARDS.dogtreats,
  EVIDENCE_CARDS.inkblotMug,
  EVIDENCE_CARDS.card5,
  EVIDENCE_CARDS.candles,
  EVIDENCE_CARDS.golfshirt1,
];

/** EvidenceSection carousel uses these 3 cards. */
export const EVIDENCE_SECTION_CARDS: EvidenceCardData[] = [
  EVIDENCE_CARDS.card1,
  EVIDENCE_CARDS.card5,
  EVIDENCE_CARDS.card2,
];
