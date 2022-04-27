import React from 'react';

import Filters from '../../components/Home/Filters';
import Tasks from '../../components/Home/Tasks';
import styles from './index.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <Filters />
      <Tasks />
    </div>
  );
};

export default Home;
