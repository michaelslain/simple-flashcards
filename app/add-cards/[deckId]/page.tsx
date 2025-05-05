"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import EditCardFront from '@/components/EditCardFront';
import { getDeck } from '@/util/storage';
import { toast } from 'react-toastify';
import styles from './page.module.scss';

export default function AddCardsFront({ params }: { params: { deckId: string } }) {
  const { deckId } = React.use(params);
  const [frontText, setFrontText] = useState('');
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
    router.push(`/edit-deck/${deckId}`);
  };

  const handleNext = () => {
    if (!frontText.trim()) {
      toast.error('Please enter some text for the front of the card');
      return;
    }
    router.push(`/add-cards/${deckId}/back?front=${encodeURIComponent(frontText)}`);
  };

  return (
    <main className={styles.addCardsFrontPage}>
      <BackButton onClick={handleBackClick} />
      <h1 className={styles.deckName}>{deckName}</h1>
      
      <EditCardFront
        frontText={frontText}
        onFrontTextChange={setFrontText}
        deckId={deckId}
        onNext={handleNext}
      />
    </main>
  );
}