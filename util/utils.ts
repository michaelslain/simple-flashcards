import { Card } from './types';

// Small utility to help with navigation
export const routeTracker = {
  // Keep track of navigation history
  lastRoute: typeof window !== 'undefined' ? window.sessionStorage.getItem('lastRoute') || '/' : '/',
  
  // Update the last route 
  updateRoute: (route: string) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('lastRoute', route);
      routeTracker.lastRoute = route;
    }
  },
  
  // Get home route safely
  getHomeRoute: () => {
    return '/';
  }
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const parseCSV = (csv: string): { frontText: string, backText: string }[] => {
  // Remove any BOM and split by newlines
  const lines = csv.replace(/^\uFEFF/, '').split(/\r?\n/);
  const results: { frontText: string, backText: string }[] = [];
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    // Split by comma, taking care of possible quoted values
    // This is a simple implementation and might not handle all CSV edge cases
    const match = line.match(/(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^,]*))/g);
    
    if (match && match.length >= 2) {
      const frontText = match[0].replace(/^,|^"|"$|""$/g, '').replace(/""/g, '"').trim();
      const backText = match[1].replace(/^,|^"|"$|""$/g, '').replace(/""/g, '"').trim();
      
      if (frontText && backText) {
        results.push({ frontText, backText });
      }
    }
  }
  
  return results;
};

// Constants for spaced repetition algorithm
const MAX_SCORE = 10;
const MIN_SCORE = -10;
const MASTERY_THRESHOLD = 5; // Score at which a card is considered "mastered"
const WEIGHT_SCORE = 0.7; // How much weight to give to score vs randomness
const WEIGHT_TIME = 0.2; // How much weight to give to time since last review
const WEIGHT_RANDOM = 0.1; // Small random factor to prevent same sequence

/**
 * Enhanced spaced repetition algorithm to pick the next card to review
 * Prioritizes low-scoring cards but adds some randomness
 */
export const getNextCardToReview = (cards: Card[]): Card | null => {
  if (!cards || cards.length === 0) return null;
  
  // For a single card, just return it
  if (cards.length === 1) return cards[0];
  
  // Create a weighted list based on score, time since review, and randomness
  const now = Date.now();
  const weightedCards = cards.map(card => {
    // Low scores should have higher weight (inverting the scale)
    const scoreValue = ((MAX_SCORE - card.score) / (MAX_SCORE - MIN_SCORE));
    const scoreWeight = scoreValue * WEIGHT_SCORE;
    
    // Older reviews should have higher weight
    // Use log scale to prevent very old cards from dominating
    const daysSinceReview = Math.log(1 + ((now - card.lastReviewed) / (1000 * 60 * 60 * 24)));
    const timeWeight = Math.min(daysSinceReview / 30, 1) * WEIGHT_TIME; // Cap at 30 days
    
    // Add small random component to shuffle things a bit
    const randomWeight = Math.random() * WEIGHT_RANDOM;
    
    // Total weight determines review priority
    return {
      card,
      weight: scoreWeight + timeWeight + randomWeight
    };
  });
  
  // Sort by combined weight (higher weight = higher priority)
  weightedCards.sort((a, b) => b.weight - a.weight);
  
  // Choose from the top 30% of cards with some randomness
  // This ensures some variety while still prioritizing cards that need review
  const topCount = Math.max(1, Math.ceil(weightedCards.length * 0.3));
  const topCards = weightedCards.slice(0, topCount);
  
  // Randomly select from top cards with slight bias toward higher weights
  const randomIndex = Math.floor(Math.random() * Math.sqrt(topCount));
  return topCards[randomIndex].card;
};

/**
 * Updates a card's score based on user rating
 * Ensures scores are properly stored as numbers
 */
export const updateCardScore = (card: Card, rating: number): Card => {
  // Ensure current score is a number (in case it was stored as string)
  const currentScore = typeof card.score === 'number' ? card.score : Number(card.score) || 0;
  
  // Rating is one of: -2, -1, 1, 2
  // Update the score based on the rating
  const newScore = Math.max(-10, Math.min(10, currentScore + rating));
  
  console.log(`Card "${card.frontText}": Score changing from ${currentScore} to ${newScore}`);
  
  return {
    ...card,
    score: newScore,
    lastReviewed: Date.now()
  };
};