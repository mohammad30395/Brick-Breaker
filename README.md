# Brick Breaker

A polished browser-based Brick Breaker game built with Next.js, React, Phaser, and Tailwind CSS. Players can customize their profile, choose the game board, select a difficulty level, play a responsive arcade round, and save scores to a local leaderboard.

## Overview

Brick Breaker is a single-player arcade game where the player controls a paddle, keeps the ball in play, and clears every destroyable brick from the board. The app includes a full game flow from setup to leaderboard, making it easy to play multiple rounds with different layouts and difficulty settings.

The project runs fully in the browser. Player setup, selected options, and leaderboard records are stored in `localStorage`, so no backend or database is required.

## Features

- Player setup with name, username, ball color, paddle color, brick color, and ball speed.
- Five board layouts: Rectangle, Pyramid, Diamond, Heart-like, and Random mixed.
- Three difficulty levels:
  - Easy: all destroyable bricks break in one hit.
  - Medium: adds stronger two-hit bricks.
  - Hard: adds two-hit and three-hit bricks.
- Phaser-powered gameplay with paddle movement, ball physics, collision handling, scoring, lives, pause, and restart.
- Responsive controls for keyboard, mouse, and touch-style pointer movement.
- Round summary modal after a win or game over.
- Local leaderboard sorted by highest score, with difficulty filtering and clear action.
- Rules page explaining controls, brick types, winning conditions, and local storage behavior.

## Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [React 18](https://react.dev/)
- [Phaser 3](https://phaser.io/) for the game engine
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- Browser `localStorage` for saved setup and leaderboard records

## Getting Started

### Prerequisites

Install Node.js and npm on your machine. Node.js 18.17 or newer is recommended for Next.js 14.

### Installation

Clone the repository, then install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Runs the app in development mode.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after a successful build.

```bash
npm run lint
```

Runs the Next.js lint command.

## App Flow

1. Visit the home page and choose **Start Game**.
2. Complete the player setup form.
3. Pick a ground layout.
4. Select a difficulty level.
5. Play the game and clear all destroyable bricks.
6. Review the round summary.
7. Check saved results on the leaderboard.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page with primary navigation |
| `/setup` | Player setup and customization |
| `/grounds` | Brick layout selection |
| `/difficulty` | Difficulty selection |
| `/game` | Main Phaser-powered game screen |
| `/rules` | Gameplay rules and controls |
| `/leaderboard` | Local leaderboard records |

## Project Structure

```text
.
├── app/                    # Next.js app routes and pages
│   ├── game/               # Main gameplay page
│   ├── setup/              # Player setup page
│   ├── grounds/            # Ground layout selection page
│   ├── difficulty/         # Difficulty selection page
│   ├── leaderboard/        # Leaderboard page
│   ├── rules/              # Rules page
│   ├── layout.jsx          # Root layout
│   └── page.jsx            # Home page
├── components/             # Reusable React components
│   ├── PhaserGame.jsx      # Phaser game initialization and game logic
│   ├── SetupForm.jsx       # Player setup form
│   ├── GameResultModal.jsx # Round result summary modal
│   └── ...                 # Cards, buttons, navbar, tables, rules content
├── lib/                    # Game data and browser storage helpers
│   ├── brickLayouts.js     # Board layouts and difficulty brick mapping
│   ├── gameConfig.js       # Speeds, difficulty config, colors, formatting
│   ├── leaderboard.js      # Leaderboard read/write helpers
│   └── storage.js          # localStorage utilities
├── styles/
│   └── globals.css         # Tailwind layers and shared global styles
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.mjs
```

## Gameplay Details

- The player starts each round with 3 lives.
- A life is lost when the ball drops below the paddle.
- The round is won when every destroyable brick is cleared.
- Gray unbreakable bricks stay on the board and do not count toward the win condition.
- Destroyed bricks increase the score based on brick strength.
- Damaged multi-hit bricks give partial score before they are destroyed.
- The leaderboard records player name, username, score, difficulty, result, speed, layout, time played, and date/time.

## Customization Guide

Most gameplay options are centralized in the `lib` folder:

- Add or update ball speeds in `lib/gameConfig.js`.
- Add or update difficulty levels in `lib/gameConfig.js`.
- Add new brick layouts in `lib/brickLayouts.js`.
- Adjust scoring, lives, canvas size, and physics behavior in `components/PhaserGame.jsx`.
- Update shared visual styling in `styles/globals.css` and Tailwind classes across components.

## Data Storage

This project uses browser `localStorage` only. The saved keys are defined in `lib/storage.js`:

- `brickBreakerPlayerSetup`
- `brickBreakerSelectedGround`
- `brickBreakerDifficulty`
- `brickBreakerLeaderboard`

Because the data is local to the browser, leaderboard entries are not shared between users, browsers, or devices.

## Deployment

The app can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or a Node.js server.

For a production build:

```bash
npm run build
npm run start
```

## License

No license file is currently included. Add a license if you plan to publish, distribute, or accept contributions to this project.
