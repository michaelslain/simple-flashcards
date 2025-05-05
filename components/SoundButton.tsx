import { FC } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import Button from './Button';
import styles from './SoundButton.module.scss';

interface SoundButtonProps {
  text: string;
  className?: string;
}

const SoundButton: FC<SoundButtonProps> = ({ text, className = '' }) => {
  const { speak, voices } = useSpeechSynthesis();
  
  const handleClick = () => {
    if (text) {
      speak({ text });
    }
  };
  
  return (
    <Button 
      className={`${styles.soundButton} ${className}`} 
      onClick={handleClick}
      aria-label="Speak text"
    >
      🔊
    </Button>
  );
};

export default SoundButton;