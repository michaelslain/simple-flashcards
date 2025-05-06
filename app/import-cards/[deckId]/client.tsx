'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/buttons/BackButton'
import Button from '@/components/buttons/Button'
import { getDeck } from '@/util/storage'
import { toast } from 'react-toastify'
import styles from './page.module.scss'
import Subheading from '@/components/Subheading'

export default function ImportCardsEmptyClient({ deckId }: { deckId: string }) {
    const [deckName, setDeckName] = useState('')
    const router = useRouter()

    useEffect(() => {
        const deck = getDeck(deckId)
        if (deck) {
            setDeckName(deck.name)
        } else {
            router.push('/')
        }
    }, [deckId, router])

    const handleBackClick = () => {
        router.push(`/edit-deck/${deckId}`)
    }

    const handleAttachCSV = () => {
        // This will be a client-side file input operation
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.csv'

        input.onchange = e => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                if (!file.name.toLowerCase().endsWith('.csv')) {
                    toast.error('Please select a CSV file')
                    return
                }

                toast.info(`Reading file: ${file.name}`)

                const reader = new FileReader()
                reader.onload = event => {
                    const csv = event.target?.result as string
                    if (csv) {
                        // Encode the CSV content to pass as URL parameter
                        const encodedCsv = encodeURIComponent(csv)
                        router.push(
                            `/import-cards/${deckId}/preview?csv=${encodedCsv}`
                        )
                    } else {
                        toast.error('Could not read file content')
                    }
                }

                reader.onerror = () => {
                    toast.error('Error reading file')
                }

                reader.readAsText(file)
            } else {
                toast.error('No file selected')
            }
        }

        input.click()
    }

    return (
        <main className={styles.importCardsEmptyPage}>
            <BackButton onClick={handleBackClick} />
            <Subheading className={styles.deckName}>{deckName}</Subheading>

            <div className={styles.importContainer}>
                <Button
                    className={styles.attachCsvButton}
                    onClick={handleAttachCSV}
                >
                    attach csv
                </Button>
            </div>
        </main>
    )
}
