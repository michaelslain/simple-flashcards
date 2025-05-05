// Server component wrapper to handle static paths
import React from 'react';
import ReviewBackClient from './client';

export default async function ReviewBackPage({ params }: { params: { deckId: string } }) {
  // Await params to get the actual values
  const resolvedParams = await params;
  return <ReviewBackClient deckId={resolvedParams.deckId} />;
}