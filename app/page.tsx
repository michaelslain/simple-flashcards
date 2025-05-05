"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Heading from '@/components/Heading';
import ListItem from '@/components/ListItem';
import Button from '@/components/Button';
import { getDeckSummaries, deleteDeck } from '@/util/storage';
import { DeckSummary } from '@/util/types';
import styles from './page.module.scss';

export default function Home() {
  const [decks, setDecks] = useState<DeckSummary[]>([]);
  const router = useRouter();

  useEffect(() => {
    setDecks(getDeckSummaries());
  }, []);

  const handleAddDeck = () => {
    router.push('/new-deck');
  };

  const handleEditDeck = (deckId: string) => {
    router.push(`/edit-deck/${deckId}`);
  };

  const handleDeleteDeck = (deckId: string) => {
    deleteDeck(deckId);
    setDecks(getDeckSummaries());
  };

  const handleReviewDeck = (deckId: string) => {
    router.push(`/review/${deckId}`);
  };

  return (
    <main className={styles.homePage}>
      <Heading>flashcards</Heading>
      
      <div className={styles.deckListHeader}>
        <Button className="add-deck-button" onClick={handleAddDeck}>
          + deck
        </Button>
      </div>
      
      <div className={styles.deckList}>
        {decks.length === 0 ? (
          <p className={styles.noDecksMessage}>no decks yet. create one!</p>
        ) : (
          decks.map(deck => (
            <ListItem
              key={deck.id}
              onEdit={() => handleEditDeck(deck.id)}
              onDelete={() => handleDeleteDeck(deck.id)}
              percentText={deck.masteryPercentage.toString()}
            >
              <span 
                className={styles.deckName}
                onClick={() => handleReviewDeck(deck.id)}
              >
                {deck.name}
              </span>
            </ListItem>
          ))
        )}
      </div>
    </main>
  );
}