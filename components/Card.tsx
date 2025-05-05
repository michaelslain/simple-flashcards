import { FC, ReactNode, MouseEvent } from 'react';
import styles from './Card.module.scss';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: FC<CardProps> = ({ 
  children, 
  className = '',
  onClick 
}) => {
  const handleClick = (e: MouseEvent) => {
    // Only trigger onClick if the click was directly on the card element
    // and not propagated from a child
    if (onClick && e.target === e.currentTarget) {
      onClick();
    }
  };

  return (
    <div 
      className={`${styles.card} ${className}`} 
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Card;