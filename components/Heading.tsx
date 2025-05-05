import { FC, HTMLAttributes } from 'react';
import styles from './Heading.module.scss';

const Heading: FC<HTMLAttributes<HTMLHeadingElement>> = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <h1 className={`${styles.heading} ${className}`} {...props}>
      {children}
    </h1>
  );
};

export default Heading;