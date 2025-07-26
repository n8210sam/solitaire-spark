import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Star, RotateCcw } from 'lucide-react';

interface WinDialogProps {
  open: boolean;
  onClose: () => void;
  score: number;
  moves: number;
  onNewGame: () => void;
}

export const WinDialog = ({ open, onClose, score, moves, onNewGame }: WinDialogProps) => {
  const handleNewGame = () => {
    onNewGame();
    onClose();
  };

  const getPerformanceRating = (moves: number) => {
    if (moves <= 150) return { stars: 3, text: '完美！' };
    if (moves <= 200) return { stars: 2, text: '很好！' };
    return { stars: 1, text: '不錯！' };
  };

  const { stars, text } = getPerformanceRating(moves);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto bg-felt-green border-gold">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-felt-green" />
            </div>
          </div>
          
          <DialogTitle className="text-2xl font-bold text-gold">
            恭喜獲勝！
          </DialogTitle>
          
          <DialogDescription className="text-foreground space-y-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gold mb-2">{text}</div>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(3)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-6 h-6 ${i < stars ? 'text-gold fill-gold' : 'text-gold/30'}`} 
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-felt-green-light p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>最終得分:</span>
                <span className="font-bold text-gold">{score}</span>
              </div>
              <div className="flex justify-between">
                <span>總移動數:</span>
                <span className="font-bold text-gold">{moves}</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-2 pt-4">
          <Button 
            onClick={onClose} 
            variant="outline"
            className="flex-1 border-gold text-gold hover:bg-gold hover:text-felt-green"
          >
            繼續觀看
          </Button>
          <Button 
            onClick={handleNewGame}
            className="flex-1 bg-gold text-felt-green hover:bg-gold-light"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            新遊戲
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};