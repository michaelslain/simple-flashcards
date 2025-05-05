import { Card, Deck } from './types';

const DECKS_KEY = 'flashcards_decks';

export const getDecks = (): Deck[] => {
  if (typeof window === 'undefined') return [];
  
  const storedDecks = localStorage.getItem(DECKS_KEY);
  if (!storedDecks) return [];
  
  try {
    return JSON.parse(storedDecks);
  } catch (error) {
    console.error('Failed to parse decks from localStorage:', error);
    return [];
  }
};

export const saveDeck = (deck: Deck): void => {
  if (typeof window === 'undefined') return;
  
  const decks = getDecks();
  const existingIndex = decks.findIndex(d => d.id === deck.id);
  
  if (existingIndex >= 0) {
    decks[existingIndex] = deck;
  } else {
    decks.push(deck);
  }
  
  localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
};

export const getDeck = (id: string): Deck | null => {
  const decks = getDecks();
  const deck = decks.find(d => d.id === id);
  return deck || null;
};

export const deleteDeck = (id: string): void => {
  if (typeof window === 'undefined') return;
  
  const decks = getDecks();
  const updatedDecks = decks.filter(d => d.id !== id);
  
  localStorage.setItem(DECKS_KEY, JSON.stringify(updatedDecks));
};

export const saveCard = (deckId: string, card: Card): void => {
  const deck = getDeck(deckId);
  if (!deck) return;
  
  const cardIndex = deck.cards.findIndex(c => c.id === card.id);
  
  if (cardIndex >= 0) {
    deck.cards[cardIndex] = card;
  } else {
    deck.cards.push(card);
  }
  
  saveDeck(deck);
};

export const deleteCard = (deckId: string, cardId: string): void => {
  const deck = getDeck(deckId);
  if (!deck) return;
  
  deck.cards = deck.cards.filter(c => c.id !== cardId);
  saveDeck(deck);
};

/**
 * Calculates deck summaries with improved mastery percentages
 * 
 * The mastery calculation now:
 * - Considers a gradient of mastery (-10 to +10 scale)
 * - Weights cards with positive scores as partially mastered
 * - Fully mastered cards (score >= 5) count as 100%
 * - Cards with scores between 1-4 count proportionally (e.g., +3 = 60% of mastery)
 * - Cards with negative scores count as 0% mastered
 */
export const getDeckSummaries = () => {
  const decks = getDecks();
  
  return decks.map(deck => {
    if (deck.cards.length === 0) {
      return {
        id: deck.id,
        name: deck.name,
        cardCount: 0,
        masteryPercentage: 0
      };
    }
    
    // For debugging: log score for first few cards
    console.log(`Deck ${deck.name} card scores:`, deck.cards.slice(0, 5).map(c => c.score));
    
    // Calculate weighted mastery - each card contributes to the overall percentage
    let totalMastery = 0;
    
    // Process each card's contribution to mastery
    deck.cards.forEach(card => {
      if (card.score >= 5) {
        // Fully mastered
        totalMastery += 1.0;
      } else if (card.score > 0) {
        // Partially mastered (1=20%, 2=40%, 3=60%, 4=80%)
        totalMastery += (card.score / 5); 
      }
      // Cards with 0 or negative scores contribute nothing
    });
    
    // Calculate final percentage (each card worth 100% when fully mastered)
    const masteryPercentage = Math.round((totalMastery / deck.cards.length) * 100);
    
    console.log(`Deck ${deck.name}: Total mastery ${totalMastery}, Percentage ${masteryPercentage}%`);
    
    return {
      id: deck.id,
      name: deck.name,
      cardCount: deck.cards.length,
      masteryPercentage
    };
  });
};