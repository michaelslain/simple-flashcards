"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import EditCard from '@/components/EditCard';
import { getDeck, saveCard } from '@/util/storage';
import { Card } from '@/util/types';
import styles from './page.module.scss';

export default function EditCardPage({ 
  params 
}: { 
  params: { deckId: string, cardId: string } 
}) {
  const { deckId, cardId } = React.use(params);
  const [card, setCard] = useState<Card | null>(null);
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const router = useRouter();

  useEffect(() => {
    const deck = getDeck(deckId);
    if (deck) {
      const foundCard = deck.cards.find(c => c.id === cardId);
      if (foundCard) {
        setCard(foundCard);
        setFrontText(foundCard.frontText);
        setBackText(foundCard.backText);
      } else {
        router.push(`/edit-deck/${deckId}`);
      }
    } else {
      router.push('/');
    }
  }, [deckId, cardId, router]);

  useEffect(() => {
    if (card && (frontText !== card.frontText || backText !== card.backText)) {
      const updatedCard = {
        ...card,
        frontText,
        backText
      };
      saveCard(deckId, updatedCard);
    }
  }, [frontText, backText, card, deckId]);

  const handleBackClick = () => {
    router.push(`/edit-deck/${deckId}`);
  };

  return (
    <main className={styles.editCardPage}>
      <BackButton onClick={handleBackClick} />
      
      {card && (
        <EditCard
          frontText={frontText}
          onFrontTextChange={setFrontText}
          backText={backText}
          onBackTextChange={setBackText}
          deckId={deckId}
        />
      )}
    </main>
  );
}