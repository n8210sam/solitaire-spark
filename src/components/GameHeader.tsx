import { Button } from '@/components/ui/button';
import { RotateCcw, Trophy, Target } from 'lucide-react';

interface GameHeaderProps {
  score: number;
  moves: number;
  onNewGame: () => void;
}

export const GameHeader = ({ score, moves, onNewGame }: GameHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4 md:mb-6 px-2">
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2 text-gold">
          <Trophy className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-lg md:text-xl font-bold">{score}</span>
        </div>
        <div className="flex items-center gap-2 text-gold-light">
          <Target className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">移動: {moves}</span>
        </div>
      </div>
      
      <Button 
        onClick={onNewGame}
        variant="outline"
        size="sm"
        className="text-gold border-gold hover:bg-gold hover:text-felt-green"
      >
        <RotateCcw className="w-4 h-4 mr-1 md:mr-2" />
        新遊戲
      </Button>
    </div>
  );
};