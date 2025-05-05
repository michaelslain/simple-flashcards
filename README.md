# Simple Flashcards

A simple flashcards app for learning languages, designed to be minimal, clean, and effective.

## Stack
- Bun
- Next.js
- TypeScript
- SCSS
- React Text to Speech (via react-speech-kit)
- React Toastify

## Features
- Create and manage multiple flashcard decks
- Add, edit, and delete cards in each deck
- Review cards with a simple spaced repetition system
- Score cards based on difficulty (-2, -1, +1, +2)
- Import cards from CSV files
- Text-to-speech functionality for pronunciation practice
- All data stored in localStorage (no account required)
- Responsive design for mobile and desktop
- Minimalist black and white interface with Comic Sans font

## Project Structure
- `app/` - Next.js app directory containing all pages
- `components/` - Reusable React components
- `util/` - Utility functions and type definitions

## Components
- Basic UI components (Text, Button, Input, etc.)
- Card components for different views (FrontCard, BackCard, EditCard, etc.)
- List items for displaying decks and cards

## Pages
- Main page - List of all decks
- New deck page - Create a new deck
- Edit deck page - Manage cards in a deck
- Review pages - Practice flashcards
- Add/Edit card pages - Create and modify cards
- Import cards pages - Import cards from CSV files

## Getting Started

First, install dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use the app.

## CSV Import Format

To import cards from a CSV file, use the following format:
```
front text,back text
```

For example:
```
hello,שלום
goodbye,להתראות
```

## License
This project is open source and available under the MIT license.