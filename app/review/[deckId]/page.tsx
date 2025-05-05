// Server component wrapper to handle static paths
import React from 'react';
import ReviewFrontClient from './client';

export default async function ReviewFrontPage({ params }: { params: { deckId: string } }) {
  // Await params to get the actual values
  const resolvedParams = await params;
  return <ReviewFrontClient deckId={resolvedParams.deckId} />;
}