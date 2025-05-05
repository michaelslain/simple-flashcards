"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BackButton from '@/components/BackButton';
import BackCard from '@/components/BackCard';
import { getDeck, saveCard } from '@/util/storage';
import { Card } from '@/util/types';
import { updateCardScore } from '@/util/utils';
import styles from './page.module.scss';

export default function ReviewBack({ params }: { params: { deckId: string } }) {
  const { deckId } = React.use(params);
  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [deckName, setDeckName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const deck = getDeck(deckId);
    if (deck && cardId) {
      setDeckName(deck.name);
      const card = deck.cards.find(c => c.id === cardId);
      setCurrentCard(card || null);
    } else {
      router.push('/');
    }
  }, [deckId, cardId, router]);

  const handleBackClick = () => {
    router.push(`/review/${deckId}`);
  };

  const handleRating = (rating: number) => {
    if (currentCard && deckId) {
      const updatedCard = updateCardScore(currentCard, rating);
      saveCard(deckId, updatedCard);
      router.push(`/review/${deckId}`);
    }
  };

  return (
    <main className={styles.reviewBackPage}>
      <BackButton onClick={handleBackClick} />
      
      <h1 className={styles.deckName}>{deckName}</h1>
      
      {currentCard && (
        <BackCard
          frontText={currentCard.frontText}
          backText={currentCard.backText}
          deckId={deckId}
          onRating={handleRating}
        />
      )}
    </main>
  );
}