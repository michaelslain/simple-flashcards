// Server component wrapper to handle static paths
import React from 'react';
import ImportCardsPreviewClient from './client';

export default async function ImportCardsPreviewPage({ params }: { params: { deckId: string } }) {
  // Await params to get the actual values
  const resolvedParams = await params;
  return <ImportCardsPreviewClient deckId={resolvedParams.deckId} />;
}