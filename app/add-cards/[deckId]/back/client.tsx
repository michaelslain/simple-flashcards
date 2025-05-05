"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BackButton from '@/components/BackButton';
import EditCardBack from '@/components/EditCardBack';
import { getDeck, saveCard } from '@/util/storage';
import { generateId } from '@/util/utils';
import { toast } from 'react-toastify';
import styles from './page.module.scss';

export default function AddCardsBackClient({ deckId }: { deckId: string }) {
  const searchParams = useSearchParams();
  const frontText = searchParams.get('front') || '';
  const [backText, setBackText] = useState('');
  const [deckName, setDeckName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const deck = getDeck(deckId);
    if (deck) {
      setDeckName(deck.name);
    } else {
      router.push('/');
    }
  }, [deckId, router]);

  const handleBackClick = () => {
    router.push(`/add-cards/${deckId}`);
  };

  const handleNext = () => {
    if (!frontText.trim()) {
      toast.error('Front text is missing');
      router.push(`/add-cards/${deckId}`);
      return;
    }
    
    if (!backText.trim()) {
      toast.error('Please enter some text for the back of the card');
      return;
    }
    
    const newCard = {
      id: generateId(),
      frontText,
      backText,
      score: 0, // Explicitly initialize as a number
      lastReviewed: Date.now()
    };
    
    saveCard(deckId, newCard);
    toast.success(`New card "${frontText}" added!`);
    router.push(`/add-cards/${deckId}`);
  };

  return (
    <main className={styles.addCardsBackPage}>
      <BackButton onClick={handleBackClick} />
      <h1 className={styles.deckName}>{deckName}</h1>
      
      <EditCardBack
        backText={backText}
        onBackTextChange={setBackText}
        deckId={deckId}
        onNext={handleNext}
      />
    </main>
  );
}