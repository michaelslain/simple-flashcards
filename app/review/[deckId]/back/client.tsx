"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BackButton from '@/components/BackButton';
import BackCard from '@/components/BackCard';
import ErrorHandler from '@/components/ErrorHandler';
import { getDeck, saveCard } from '@/util/storage';
import { Card } from '@/util/types';
import { updateCardScore } from '@/util/utils';
import { toast } from 'react-toastify';
import styles from './page.module.scss';

export default function ReviewBackClient({ deckId }: { deckId: string }) {
  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [deckName, setDeckName] = useState('');
  const router = useRouter();

  useEffect(() => {
    try {
      const deck = getDeck(deckId);
      if (!deck) {
        // Deck not found, redirect to home
        toast.error('Deck not found');
        router.push('/');
        return;
      }
      
      setDeckName(deck.name);
      
      if (!cardId) {
        // No card ID provided, redirect back to review front page
        toast.error('No card selected for review');
        router.push(`/review/${deckId}`);
        return;
      }
      
      const card = deck.cards.find(c => c.id === cardId);
      if (!card) {
        // Card not found in deck, redirect back to review front page
        toast.error('Card not found');
        router.push(`/review/${deckId}`);
        return;
      }
      
      setCurrentCard(card);
    } catch (error) {
      console.error('Error loading card:', error);
      toast.error('Error loading card');
      router.push(`/review/${deckId}`);
    }
  }, [deckId, cardId, router]);

  const handleBackClick = () => {
    router.push(`/review/${deckId}`);
  };

  const handleRating = (rating: number) => {
    if (currentCard && deckId) {
      const updatedCard = updateCardScore(currentCard, rating);
      saveCard(deckId, updatedCard);
      
      // Show appropriate toast based on rating
      if (rating >= 1) {
        toast.success(`Card score increased! ${rating > 1 ? 'Well done!' : ''}`);
      } else {
        toast.info(`Card score decreased. You'll see this card again soon.`);
      }
      
      router.push(`/review/${deckId}`);
    }
  };

  return (
    <ErrorHandler>
      <main className={styles.reviewBackPage}>
        <BackButton onClick={handleBackClick} />
        
        <h1 className={styles.deckName}>{deckName}</h1>
        
        {currentCard ? (
          <BackCard
            frontText={currentCard.frontText}
            backText={currentCard.backText}
            deckId={deckId}
            onRating={handleRating}
          />
        ) : (
          <div className={styles.loadingMessage}>
            Loading card...
          </div>
        )}
      </main>
    </ErrorHandler>
  );
}