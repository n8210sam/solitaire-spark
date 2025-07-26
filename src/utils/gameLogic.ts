import { Card, Suit, Rank, GameState } from '@/types/game';

const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      deck.push({
        id: `${suit}-${rank}`,
        suit,
        rank,
        faceUp: false,
        color: suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black'
      });
    });
  });
  
  return shuffleDeck(deck);
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const initializeGame = (): GameState => {
  const deck = createDeck();
  const tableau: Card[][] = [[], [], [], [], [], [], []];
  
  let cardIndex = 0;
  
  // Deal cards to tableau
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= col; row++) {
      const card = deck[cardIndex++];
      card.faceUp = row === col; // Only top card face up
      tableau[col].push(card);
    }
  }
  
  const stock = deck.slice(cardIndex);
  
  return {
    stock,
    waste: [],
    foundations: [[], [], [], []],
    tableau,
    score: 0,
    moves: 0,
    gameWon: false
  };
};

export const canMoveToFoundation = (card: Card, foundation: Card[]): boolean => {
  if (foundation.length === 0) {
    return card.rank === 'A';
  }
  
  const topCard = foundation[foundation.length - 1];
  if (card.suit !== topCard.suit) return false;
  
  const cardValue = getRankValue(card.rank);
  const topValue = getRankValue(topCard.rank);
  
  return cardValue === topValue + 1;
};

export const canMoveToTableau = (card: Card, tableau: Card[]): boolean => {
  if (tableau.length === 0) {
    return card.rank === 'K';
  }
  
  const topCard = tableau[tableau.length - 1];
  if (card.color === topCard.color) return false;
  
  const cardValue = getRankValue(card.rank);
  const topValue = getRankValue(topCard.rank);
  
  return cardValue === topValue - 1;
};

const getRankValue = (rank: Rank): number => {
  switch (rank) {
    case 'A': return 1;
    case 'J': return 11;
    case 'Q': return 12;
    case 'K': return 13;
    default: return parseInt(rank);
  }
};

export const checkWinCondition = (foundations: Card[][]): boolean => {
  return foundations.every(foundation => foundation.length === 13);
};

export const getScore = (moves: number, foundations: Card[][]): number => {
  const foundationScore = foundations.reduce((sum, pile) => sum + pile.length * 10, 0);
  const movesPenalty = Math.max(0, moves - 100) * 2;
  return Math.max(0, foundationScore - movesPenalty);
};