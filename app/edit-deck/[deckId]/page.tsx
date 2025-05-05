"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import ListItem from '@/components/ListItem';
import { getDeck, deleteCard } from '@/util/storage';
import { Card } from '@/util/types';
import styles from './page.module.scss';

export default function EditDeck({ params }: { params: { deckId: string } }) {
  const { deckId } = React.use(params);
  const [cards, setCards] = useState<Card[]>([]);
  const [deckName, setDeckName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const deck = getDeck(deckId);
    if (deck) {
      setCards(deck.cards);
      setDeckName(deck.name);
    } else {
      router.push('/');
    }
  }, [deckId, router]);

  const handleBackClick = () => {
    router.push('/');
  };

  const handleAddCards = () => {
    router.push(`/add-cards/${deckId}`);
  };

  const handleImportCards = () => {
    router.push(`/import-cards/${deckId}`);
  };

  const handleEditCard = (cardId: string) => {
    router.push(`/edit-card/${deckId}/${cardId}`);
  };

  const handleDeleteCard = (cardId: string) => {
    deleteCard(deckId, cardId);
    const deck = getDeck(deckId);
    if (deck) {
      setCards(deck.cards);
    }
  };

  return (
    <main className={styles.editDeckPage}>
      <BackButton onClick={handleBackClick} />
      
      <h1 className={styles.deckName}>{deckName}</h1>
      
      <div className={styles.actions}>
        <Button className="add-cards-button" onClick={handleAddCards}>
          + new cards
        </Button>
        <Button className="import-cards-button" onClick={handleImportCards}>
          + import
        </Button>
      </div>
      
      <div className={styles.cardList}>
        {cards.length === 0 ? (
          <p className={styles.noCardsMessage}>no cards yet. add some!</p>
        ) : (
          cards.map(card => (
            <ListItem
              key={card.id}
              onEdit={() => handleEditCard(card.id)}
              onDelete={() => handleDeleteCard(card.id)}
            >
              {card.frontText} - {card.backText}
            </ListItem>
          ))
        )}
      </div>
    </main>
  );
}