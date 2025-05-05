// Server component wrapper to handle static paths
import React from 'react';
import EditDeckClient from './client';

export default async function EditDeckPage({ params }: { params: { deckId: string } }) {
  // Await params to get the actual values
  const resolvedParams = await params;
  return <EditDeckClient deckId={resolvedParams.deckId} />;
}