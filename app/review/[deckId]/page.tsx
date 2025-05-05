"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import FrontCard from '@/components/FrontCard';
import { getDeck } from '@/util/storage';
import { Card } from '@/util/types';
import { getNextCardToReview } from '@/util/utils';
import styles from './page.module.scss';

export default function ReviewFront({ params }: { params: { deckId: string } }) {
  const { deckId } = React.use(params);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [deckName, setDeckName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const deck = getDeck(deckId);
    if (deck) {
      setDeckName(deck.name);
      const nextCard = getNextCardToReview(deck.cards);
      setCurrentCard(nextCard);
    } else {
      router.push('/');
    }
  }, [deckId, router]);

  const handleBackClick = () => {
    router.push('/');
  };

  const handleCardClick = () => {
    if (currentCard) {
      router.push(`/review/${deckId}/back?cardId=${currentCard.id}`);
    }
  };

  return (
    <main className={styles.reviewFrontPage}>
      <BackButton onClick={handleBackClick} />
      
      <h1 className={styles.deckName}>{deckName}</h1>
      
      {currentCard ? (
        <FrontCard
          frontText={currentCard.frontText}
          deckId={deckId}
          onClick={handleCardClick}
        />
      ) : (
        <p className={styles.noCardsMessage}>no cards to review</p>
      )}
    </main>
  );
}