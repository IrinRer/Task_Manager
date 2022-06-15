import React from 'react';
import { Layout } from 'antd';
import Display from 'components/Home';
import Filters from 'components/Home/Filters';
import styles from './index.module.scss';

const { Sider, Content } = Layout;

const Home = () => {
  return (
    <Layout className={styles.tasks}>
      <Sider className={styles.sider} width={250}>
        <Filters />
      </Sider>
      <Content>
        <Display />
      </Content>
    </Layout>
  );
};

export default Home;
