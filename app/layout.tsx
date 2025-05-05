import './globals.scss'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: 'Simple Flashcards',
  description: 'A simple flashcards app for learning languages',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer position="bottom-center" autoClose={3000} />
      </body>
    </html>
  )
}