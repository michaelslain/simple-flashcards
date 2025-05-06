// Server component wrapper to handle static paths
import React from 'react'
import ImportCardsEmptyClient from './client'

export default async function ImportCardsEmptyPage({
    params,
}: {
    params: { deckId: string }
}) {
    // Await params to get the actual values
    const resolvedParams = await params
    return <ImportCardsEmptyClient deckId={resolvedParams.deckId} />
}
