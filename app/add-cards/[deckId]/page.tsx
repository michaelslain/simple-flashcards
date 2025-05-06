// Server component wrapper to handle static paths
import React from 'react'
import AddCardsFrontClient from './client'

export default async function AddCardsFrontPage({
    params,
}: {
    params: { deckId: string }
}) {
    // Await params to get the actual values
    const resolvedParams = await params
    return <AddCardsFrontClient deckId={resolvedParams.deckId} />
}
