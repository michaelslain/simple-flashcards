// Server component wrapper to handle static paths
import React from 'react'
import AddCardsBackClient from './client'

export default async function AddCardsBackPage({
    params,
}: {
    params: { deckId: string }
}) {
    // Await params to get the actual values
    const resolvedParams = await params
    return <AddCardsBackClient deckId={resolvedParams.deckId} />
}
