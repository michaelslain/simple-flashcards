import { FC } from 'react';
import Card from './Card';
import Input from './Input';
import styles from './EditCard.module.scss';

interface EditCardProps {
  frontText: string;
  onFrontTextChange: (text: string) => void;
  backText: string;
  onBackTextChange: (text: string) => void;
  deckId: string;
}

const EditCard: FC<EditCardProps> = ({
  frontText,
  onFrontTextChange,
  backText,
  onBackTextChange,
  deckId
}) => {
  return (
    <Card className={styles.editCard}>
      <Input
        value={frontText}
        onChange={(e) => onFrontTextChange(e.target.value)}
        placeholder="front..."
        className={styles.frontInput}
      />
      <Input
        value={backText}
        onChange={(e) => onBackTextChange(e.target.value)}
        placeholder="back..."
        className={styles.backInput}
      />
    </Card>
  );
};

export default EditCard;