"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import EditCard from '@/components/EditCard';
import { getDeck, saveCard } from '@/util/storage';
import { Card } from '@/util/types';
import { toast } from 'react-toastify';
import styles from './page.module.scss';

export default function EditCardPageClient({ 
  deckId,
  cardId
}: { 
  deckId: string;
  cardId: string;
}) {
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

  // Track whether we've shown a toast for this update
  const [hasShownToast, setHasShownToast] = useState(false);
  
  useEffect(() => {
    if (card && (frontText !== card.frontText || backText !== card.backText)) {
      const updatedCard = {
        ...card,
        frontText,
        backText
      };
      saveCard(deckId, updatedCard);
      
      // Only show the toast if text has changed and we haven't shown it yet
      if (!hasShownToast && (frontText.trim() !== '' || backText.trim() !== '')) {
        toast.success('Card updated!');
        setHasShownToast(true);
        
        // Reset the toast flag after a delay so it can show again if more changes are made
        const timer = setTimeout(() => {
          setHasShownToast(false);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [frontText, backText, card, deckId, hasShownToast]);

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