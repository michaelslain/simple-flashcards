"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import { getDeck } from '@/util/storage';
import styles from './page.module.scss';

export default function ImportCardsEmpty({ params }: { params: { deckId: string } }) {
  const { deckId } = React.use(params);
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

  return (
    <main className={styles.importCardsEmptyPage}>
      <BackButton onClick={handleBackClick} />
      <h1 className={styles.deckName}>{deckName}</h1>
      
      <div className={styles.importContainer}>
        <Button 
          className={styles.attachCsvButton}
          onClick={handleAttachCSV}
        >
          attach csv
        </Button>
      </div>
    </main>
  );
}