# StarkFantasy League 🏆⚽

![image](https://github.com/user-attachments/assets/9c3bfd85-71c5-4f7e-ae09-07f35f5da6af)


## Overview 💫

StarkFantasy is the next generation of fantasy sports built on Starknet, bringing cricket excitement to the blockchain world! Our platform combines the thrill of fantasy cricket with blockchain technology, creating a seamless, transparent, and rewarding experience.

## MVP Features ✨

- **Create Dream Teams** 🌟 - Build your ideal squad with Indian Premier League
- **Pools Competition** 💰 - Enter pools to compete against other players
- **Web3 Integration** 🔗 - True ownership of your teams and rewards

## Tech Stack 🛠️

- **Frontend**: React, TypeScript, Vite
- **Smart Contracts**: Cairo (Starknet's native language)
- **Backend Framework**: Dojo (Game development framework for Starknet)
- **Testing**: Cairo Testing
- **Infrastructure**: Deployed on Starknet

## Roadmap 🗺️

### Q2 2025 - MVP Launch
- ⚽ Indian Premier League API integration and data consumption
- 👥 Team creation system with 11-player selection
- 🧮 Core game mechanics logic implementation
- 🏆 Pools creation and participation features
- 🔌 Cartridge Controller integration
- 🧪 Comprehensive testing and MVP launch on slot (testnet from Cartridge).

## Getting Started 🚀

The branch need to follows the next format: 
(if a feature)
feat/name-branch

And commits need to have the next messages: 
(If feature)
feat: change-description
(if update)
update: change-description
(if remove)
remove: change-description

## 🚀 Installation

Clone the repository** to your local machine:

```sh
git clone https://github.com/StarkFantasy-League/starkfantasy-mvp.git
```

## 📌 Client Requirements

- Node.js `>= 18.x`
- pnpm `>= 8.x` (optional) or npm `>= 9.x`

Install dependencies using your preferred package manager:

### Enter frontend:
```sh
cd client
```

### Using pnpm:
```sh
pnpm install
```

### Using npm:
```sh
npm install
```

## 🔥 Running the Project

To start the development server on port `5173`:

### With pnpm:
```sh
pnpm dev
```

### With npm:
```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📌 Contract/Dojo Requirements

- Scarb `>= 2.9.2`
- Dojo `>= 1.2.2`

### Enter contract:
```sh
cd contract
```
### Run these commands to verify everything is working as expected:
```sh
sozo build / sozo test
```
