'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/buttons/BackButton'
import EditCardFront from '@/components/cards/EditCardFront'
import { getDeck } from '@/util/storage'
import { toast } from 'react-toastify'
import styles from './page.module.scss'
import Subheading from '@/components/Subheading'

export default function AddCardsFrontClient({ deckId }: { deckId: string }) {
    const [frontText, setFrontText] = useState('')
    const router = useRouter()
    const [deckName, setDeckName] = useState('')

    useEffect(() => {
        const deck = getDeck(deckId)
        if (deck) setDeckName(deck.name)
        else router.push('/')
    }, [deckId, router])

    const handleBackClick = () => {
        router.push(`/edit-deck/${deckId}`)
    }

    const handleNext = () => {
        if (!frontText.trim()) {
            toast.error('Please enter some text for the front of the card')
            return
        }
        router.push(
            `/add-cards/${deckId}/back?front=${encodeURIComponent(frontText)}`
        )
    }

    return (
        <main className={styles.addCardsFrontPage}>
            <BackButton onClick={handleBackClick} />
            <Subheading className={styles.deckName}>{deckName}</Subheading>
            <EditCardFront
                frontText={frontText}
                onFrontTextChange={setFrontText}
                deckId={deckId}
                onNext={handleNext}
            />
        </main>
    )
}
