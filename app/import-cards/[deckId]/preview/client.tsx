"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import ListItem from '@/components/ListItem';
import NextButton from '@/components/NextButton';
import { getDeck, saveCard } from '@/util/storage';
import { parseCSV, generateId } from '@/util/utils';
import { toast } from 'react-toastify';
import styles from './page.module.scss';

interface CardPreview {
  id: string;
  frontText: string;
  backText: string;
}

export default function ImportCardsPreviewClient({ deckId }: { deckId: string }) {
  const searchParams = useSearchParams();
  const csvParam = searchParams.get('csv');
  
  const [deckName, setDeckName] = useState('');
  const [cardPreviews, setCardPreviews] = useState<CardPreview[]>([]);
  const router = useRouter();

  useEffect(() => {
    const deck = getDeck(deckId);
    if (!deck) {
      router.push('/');
      return;
    }
    
    setDeckName(deck.name);
    
    if (!csvParam) {
      router.push(`/import-cards/${deckId}`);
      return;
    }
    
    try {
      const csvContent = decodeURIComponent(csvParam);
      const parsedCards = parseCSV(csvContent);
      
      const previewCards = parsedCards.map(card => ({
        id: generateId(),
        frontText: card.frontText,
        backText: card.backText
      }));
      
      setCardPreviews(previewCards);
    } catch (error) {
      console.error('Error parsing CSV:', error);
      toast.error('Failed to parse CSV file');
      router.push(`/import-cards/${deckId}`);
    }
  }, [deckId, csvParam, router]);

  const handleBackClick = () => {
    router.push(`/edit-deck/${deckId}`);
  };

  const handleAttachCSV = () => {
    // This will be a client-side file input operation
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const csv = event.target?.result as string;
          if (csv) {
            // Encode the CSV content to pass as URL parameter
            const encodedCsv = encodeURIComponent(csv);
            router.push(`/import-cards/${deckId}/preview?csv=${encodedCsv}`);
          }
        };
        reader.readAsText(file);
      }
    };
    
    input.click();
  };

  const handleDeleteCard = (cardId: string) => {
    const card = cardPreviews.find(c => c.id === cardId);
    setCardPreviews(cardPreviews.filter(card => card.id !== cardId));
    
    if (card) {
      toast.info(`Removed "${card.frontText}" from import list`);
    }
  };

  const handleImport = () => {
    if (cardPreviews.length === 0) {
      toast.error('No cards to import');
      return;
    }
    
    cardPreviews.forEach(preview => {
      const card = {
        id: preview.id,
        frontText: preview.frontText,
        backText: preview.backText,
        score: 0, // Explicitly as a number
        lastReviewed: Date.now()
      };
      
      saveCard(deckId, card);
    });
    
    toast.success(`Imported ${cardPreviews.length} cards`);
    router.push(`/edit-deck/${deckId}`);
  };

  return (
    <main className={styles.importCardsPreviewPage}>
      <BackButton onClick={handleBackClick} />
      <h1 className={styles.deckName}>{deckName}</h1>
      
      <div className={styles.actions}>
        <Button className={styles.attachCsvButton} onClick={handleAttachCSV}>
          attach csv
        </Button>
      </div>
      
      <div className={styles.cardPreviews}>
        {cardPreviews.length === 0 ? (
          <p className={styles.noCardsMessage}>no cards in csv</p>
        ) : (
          cardPreviews.map(card => (
            <ListItem
              key={card.id}
              onDelete={() => handleDeleteCard(card.id)}
            >
              {card.frontText} - {card.backText}
            </ListItem>
          ))
        )}
      </div>
      
      {cardPreviews.length > 0 && (
        <div className={styles.importAction}>
          <NextButton onClick={handleImport} />
        </div>
      )}
    </main>
  );
}