import { useState, useEffect } from 'react';
import { Card as CardComponent } from './Card';
import { GameHeader } from './GameHeader';
import { WinDialog } from './WinDialog';
import { GameState, Card } from '@/types/game';
import { 
  initializeGame, 
  canMoveToFoundation, 
  canMoveToTableau, 
  checkWinCondition,
  getScore 
} from '@/utils/gameLogic';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const GameBoard = () => {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [selectedCards, setSelectedCards] = useState<{cards: Card[], sourceType: string, sourceIndex: number} | null>(null);
  const [showWin, setShowWin] = useState(false);

  useEffect(() => {
    if (checkWinCondition(gameState.foundations) && !gameState.gameWon) {
      setGameState(prev => ({ ...prev, gameWon: true }));
      setShowWin(true);
      toast.success('恭喜！你贏了！', {
        description: `得分: ${getScore(gameState.moves, gameState.foundations)}`
      });
    }
  }, [gameState.foundations, gameState.gameWon, gameState.moves]);

  const drawFromStock = () => {
    if (gameState.stock.length === 0) {
      if (gameState.waste.length === 0) return;
      
      // Flip waste back to stock
      const newStock = [...gameState.waste].reverse().map(card => ({ ...card, faceUp: false }));
      setGameState(prev => ({
        ...prev,
        stock: newStock,
        waste: [],
        moves: prev.moves + 1
      }));
    } else {
      // Draw 3 cards
      const cardsToDraw = Math.min(3, gameState.stock.length);
      const drawnCards = gameState.stock.slice(0, cardsToDraw).map(card => ({ ...card, faceUp: true }));
      const remainingStock = gameState.stock.slice(cardsToDraw);
      
      setGameState(prev => ({
        ...prev,
        stock: remainingStock,
        waste: [...drawnCards, ...prev.waste],
        moves: prev.moves + 1
      }));
    }
  };

  const selectCard = (card: Card, sourceType: string, sourceIndex: number) => {
    if (sourceType === 'tableau') {
      const tableau = gameState.tableau[sourceIndex];
      const cardIndex = tableau.findIndex(c => c.id === card.id);
      
      if (cardIndex === -1 || !tableau[cardIndex].faceUp) return;
      
      // Select this card and all cards on top of it
      const cardsToMove = tableau.slice(cardIndex);
      
      // Check if sequence is valid (alternating colors, descending rank)
      for (let i = 0; i < cardsToMove.length - 1; i++) {
        if (!canMoveToTableau(cardsToMove[i + 1], [cardsToMove[i]])) {
          toast.error('無效的牌序列');
          return;
        }
      }
      
      setSelectedCards({ cards: cardsToMove, sourceType, sourceIndex });
    } else if (sourceType === 'waste') {
      // 允許選擇廢牌堆中任何可見的牌
      const cardIndex = gameState.waste.findIndex(c => c.id === card.id);
      if (cardIndex !== -1) {
        setSelectedCards({ cards: [card], sourceType, sourceIndex: cardIndex });
      }
    } else if (sourceType === 'foundation') {
      const foundation = gameState.foundations[sourceIndex];
      if (foundation.length > 0) {
        setSelectedCards({ cards: [foundation[foundation.length - 1]], sourceType, sourceIndex });
      }
    }
  };

  const moveCards = (targetType: string, targetIndex: number) => {
    if (!selectedCards) return;

    const { cards, sourceType, sourceIndex } = selectedCards;
    
    if (targetType === 'foundation' && cards.length === 1) {
      const foundation = gameState.foundations[targetIndex];
      if (canMoveToFoundation(cards[0], foundation)) {
        executeMove(targetType, targetIndex);
      } else {
        toast.error('無法移動到基礎堆');
      }
    } else if (targetType === 'tableau') {
      const targetTableau = gameState.tableau[targetIndex];
      if (canMoveToTableau(cards[0], targetTableau)) {
        executeMove(targetType, targetIndex);
      } else {
        toast.error('無法移動到此列');
      }
    }
    
    setSelectedCards(null);
  };

  const executeMove = (targetType: string, targetIndex: number) => {
    if (!selectedCards) return;

    const { cards, sourceType, sourceIndex } = selectedCards;
    const newGameState = { ...gameState };

    // Remove cards from source
    if (sourceType === 'tableau') {
      newGameState.tableau[sourceIndex] = newGameState.tableau[sourceIndex].slice(0, -cards.length);
      // Flip top card if available
      const remainingCards = newGameState.tableau[sourceIndex];
      if (remainingCards.length > 0 && !remainingCards[remainingCards.length - 1].faceUp) {
        remainingCards[remainingCards.length - 1].faceUp = true;
      }
    } else if (sourceType === 'waste') {
      // 從廢牌堆中移除選中的牌
      newGameState.waste = newGameState.waste.filter(c => c.id !== cards[0].id);
    } else if (sourceType === 'foundation') {
      newGameState.foundations[sourceIndex] = newGameState.foundations[sourceIndex].slice(0, -1);
    }

    // Add cards to target
    if (targetType === 'foundation') {
      newGameState.foundations[targetIndex].push(...cards);
    } else if (targetType === 'tableau') {
      newGameState.tableau[targetIndex].push(...cards);
    }

    newGameState.moves += 1;
    newGameState.score = getScore(newGameState.moves, newGameState.foundations);

    setGameState(newGameState);
    toast.success('移動成功！');
  };

  const newGame = () => {
    setGameState(initializeGame());
    setSelectedCards(null);
    setShowWin(false);
    toast.success('開始新遊戲！');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-felt-green to-felt-green-light p-2 md:p-4">
      <GameHeader 
        score={gameState.score}
        moves={gameState.moves}
        onNewGame={newGame}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Top row: Stock, Waste, Foundations */}
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <div className="flex gap-2 md:gap-4">
            {/* Stock */}
            <div 
              className="w-16 h-24 md:w-20 md:h-28 rounded-lg border-2 border-dashed border-gold/50 flex items-center justify-center cursor-pointer hover:border-gold transition-colors"
              onClick={drawFromStock}
            >
              {gameState.stock.length > 0 ? (
                <CardComponent card={gameState.stock[0]} />
              ) : (
                <div className="text-gold/60 text-xs md:text-sm text-center">
                  重置<br />牌堆
                </div>
              )}
            </div>

            {/* Waste */}
            <div className="relative">
              {gameState.waste.slice(0, 3).map((card, index) => {
                const isSelected = selectedCards?.cards[0]?.id === card.id;
                return (
                  <div 
                    key={card.id}
                    className="absolute cursor-pointer"
                    style={{ 
                      left: index * 50, 
                      zIndex: isSelected ? 100 : index 
                    }}
                  >
                    <CardComponent 
                      card={card}
                      onClick={() => selectCard(card, 'waste', index)}
                      className={isSelected ? 'ring-2 ring-gold shadow-lg' : 'hover:shadow-md transition-shadow'}
                    />
                  </div>
                );
              })}
              {gameState.waste.length === 0 && (
                <div className="w-16 h-24 md:w-20 md:h-28 rounded-lg border-2 border-dashed border-gold/30" />
              )}
            </div>
          </div>

          {/* Foundations */}
          <div className="flex gap-1 md:gap-2">
            {gameState.foundations.map((foundation, index) => (
              <div 
                key={index}
                className="w-16 h-24 md:w-20 md:h-28 rounded-lg border-2 border-dashed border-gold/50 flex items-center justify-center cursor-pointer hover:border-gold transition-colors"
                onClick={() => moveCards('foundation', index)}
              >
                {foundation.length > 0 ? (
                  <CardComponent 
                    card={foundation[foundation.length - 1]}
                    onClick={() => selectCard(foundation[foundation.length - 1], 'foundation', index)}
                    className={selectedCards?.cards[0]?.id === foundation[foundation.length - 1]?.id ? 'ring-2 ring-gold' : ''}
                  />
                ) : (
                  <div className="text-gold/40 text-2xl">♠</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tableau */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {gameState.tableau.map((column, columnIndex) => (
            <div 
              key={columnIndex}
              className="relative min-h-32 md:min-h-40"
              onClick={() => moveCards('tableau', columnIndex)}
            >
              {column.length === 0 ? (
                <div className="w-16 h-24 md:w-20 md:h-28 rounded-lg border-2 border-dashed border-gold/30 flex items-center justify-center">
                  <div className="text-gold/40 text-lg">K</div>
                </div>
              ) : (
                column.map((card, cardIndex) => (
                  <div 
                    key={card.id}
                    className="absolute"
                    style={{ 
                      top: cardIndex * 16,
                      zIndex: cardIndex 
                    }}
                  >
                    <CardComponent 
                      card={card}
                      onClick={() => selectCard(card, 'tableau', columnIndex)}
                      className={cn(
                        selectedCards?.cards.some(c => c.id === card.id) ? 'ring-2 ring-gold' : '',
                        card.faceUp ? 'cursor-pointer' : ''
                      )}
                    />
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>

      <WinDialog 
        open={showWin}
        onClose={() => setShowWin(false)}
        score={gameState.score}
        moves={gameState.moves}
        onNewGame={newGame}
      />
    </div>
  );
};