import React from 'react';
import Spinner from '../Spinner';
import styles from './index.module.scss';

const Preloader: React.FC = () => {
  return (
    <div className={styles.preloader}>
      <Spinner margin="0 auto" size="large" />
    </div>
  );
};

export default Preloader;
