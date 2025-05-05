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

export const getDeckSummaries = () => {
  const decks = getDecks();
  
  return decks.map(deck => {
    const masteredCards = deck.cards.filter(card => card.score >= 5).length;
    const masteryPercentage = deck.cards.length > 0 
      ? Math.round((masteredCards / deck.cards.length) * 100) 
      : 0;
    
    return {
      id: deck.id,
      name: deck.name,
      cardCount: deck.cards.length,
      masteryPercentage
    };
  });
};