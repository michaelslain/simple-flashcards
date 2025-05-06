import './globals.scss'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
    title: 'Simple Flashcards',
    description: 'A simple flashcards app for learning languages',
}

// Setup viewport properly
export const viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Fredoka:wght@300..700&family=Klee+One&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                {children}
                <ToastContainer position="bottom-center" autoClose={3000} />
            </body>
        </html>
    )
}
