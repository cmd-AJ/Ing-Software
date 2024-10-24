import React from 'react';
import styles from './TopBar.module.css';

interface Button {
  label: string;
  onClick: () => void;
}

interface TopBarProps {
  buttons: Button[];
}

const TopBar: React.FC<TopBarProps> = ({ buttons }) => {
  return (
    <div className={styles.topBar}>
      {buttons.map((button, index) => (
        <button
          key={index}
          className={styles.topBarButton}
          onClick={button.onClick}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default TopBar;
