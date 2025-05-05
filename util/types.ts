export type Card = {
  id: string;
  frontText: string;
  backText: string;
  score: number; // Range from -10 to 10, starts at 0
  lastReviewed: number; // Timestamp
}

export type Deck = {
  id: string;
  name: string;
  cards: Card[];
  createdAt: number; // Timestamp
}

export type DeckSummary = {
  id: string;
  name: string;
  cardCount: number;
  masteryPercentage: number;
}