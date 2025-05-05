// Server component wrapper to handle static paths
import React from 'react';
import EditCardPageClient from './client';

export default async function EditCardPageServer({ 
  params 
}: { 
  params: { deckId: string, cardId: string } 
}) {
  // Await params to get the actual values
  const resolvedParams = await params;
  return <EditCardPageClient deckId={resolvedParams.deckId} cardId={resolvedParams.cardId} />;
}