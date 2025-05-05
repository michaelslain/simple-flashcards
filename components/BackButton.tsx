'use client';

import { FC, ButtonHTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import styles from './BackButton.module.scss';

type BackButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

const BackButton: FC<BackButtonProps> = ({ className = '', onClick, ...props }) => {
  const router = useRouter();
  
  // Enhanced click handler to ensure we can always go back
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      // First try the provided onClick handler
      if (onClick) {
        onClick(e);
      } else {
        // If no handler provided, go to home
        router.push('/');
      }
    } catch (err) {
      console.error('Navigation error:', err);
      // Ultimate fallback - reload to home page
      window.location.href = '/';
    }
  };

  return (
    <Button 
      className={`${styles.backButton} ${className}`} 
      onClick={handleClick}
      {...props}
    >
      ←
    </Button>
  );
};

export default BackButton;