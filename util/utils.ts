import { Card } from './types';

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

export const getNextCardToReview = (cards: Card[]): Card | null => {
  if (cards.length === 0) return null;
  
  // Sort by a combination of last reviewed time and score
  const sortedCards = [...cards].sort((a, b) => {
    // Lower scores should be reviewed more often
    const scoreWeight = (a.score - b.score) * 10000; 
    
    // Earlier last reviewed should be seen first
    const timeWeight = a.lastReviewed - b.lastReviewed;
    
    return timeWeight + scoreWeight;
  });
  
  return sortedCards[0];
};

export const updateCardScore = (card: Card, rating: number): Card => {
  // Rating is one of: -2, -1, 1, 2
  // Update the score based on the rating
  const newScore = Math.max(-10, Math.min(10, card.score + rating));
  
  return {
    ...card,
    score: newScore,
    lastReviewed: Date.now()
  };
};