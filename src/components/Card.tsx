import { Card as CardType } from '@/types/game';
import { cn } from '@/lib/utils';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  draggable?: boolean;
}

const getSuitSymbol = (suit: CardType['suit']): string => {
  switch (suit) {
    case 'hearts': return '♥';
    case 'diamonds': return '♦';
    case 'clubs': return '♣';
    case 'spades': return '♠';
  }
};

const getSuitColor = (suit: CardType['suit']): string => {
  return suit === 'hearts' || suit === 'diamonds' ? 'text-card-red' : 'text-card-black';
};

export const Card = ({ 
  card, 
  onClick, 
  onDragStart, 
  onDragEnd, 
  className, 
  style,
  draggable = false 
}: CardProps) => {
  if (!card.faceUp) {
    return (
      <div 
        className={cn(
          "w-16 h-24 md:w-20 md:h-28 rounded-lg border-2",
          "bg-gradient-to-br from-blue-800 to-blue-900",
          "border-blue-600 cursor-pointer",
          "flex items-center justify-center",
          "shadow-lg transition-all duration-200",
          "hover:scale-105 active:scale-95",
          className
        )}
        onClick={onClick}
        style={style}
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-blue-400" />
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "w-16 h-24 md:w-20 md:h-28 rounded-lg border-2",
        "bg-gradient-to-br from-card to-card-foreground/5",
        "border-border cursor-pointer",
        "flex flex-col p-1 md:p-2",
        "shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-200",
        "hover:scale-105 active:scale-95 hover:shadow-[0_6px_16px_rgba(0,0,0,0.4)]",
        "select-none",
        className
      )}
      onClick={onClick}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable={draggable}
      style={style}
    >
      {/* Top corner */}
      <div className={cn("flex flex-col items-center text-xs md:text-sm font-bold leading-none", getSuitColor(card.suit))}>
        <span>{card.rank}</span>
        <span className="text-lg md:text-xl leading-none">{getSuitSymbol(card.suit)}</span>
      </div>
      
      {/* Center symbol */}
      <div className="flex-1 flex items-center justify-center">
        <span className={cn("text-2xl md:text-3xl", getSuitColor(card.suit))}>
          {getSuitSymbol(card.suit)}
        </span>
      </div>
      
      {/* Bottom corner (rotated) */}
      <div className={cn("flex flex-col-reverse items-center text-xs md:text-sm font-bold leading-none rotate-180", getSuitColor(card.suit))}>
        <span>{card.rank}</span>
        <span className="text-lg md:text-xl leading-none">{getSuitSymbol(card.suit)}</span>
      </div>
    </div>
  );
};