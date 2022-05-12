import React from 'react';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import Details from '../Details';
import Members from '../Members';

const { Panel } = Collapse;

const Info: React.FC = () => {
  const expandIcon = ({ isActive }) => {
    return <CaretRightOutlined rotate={isActive ? 90 : 0} />;
  };

  return (
    <div className={styles.taskInfo}>
      <Collapse
        defaultActiveKey={['1', '2']}
        ghost
        expandIcon={expandIcon}
        className="site-collapse-custom-collapse"
      >
        <Panel header="Детали" key="1" className="site-collapse-custom-panel">
          <Details />
        </Panel>
        <Panel
          header="Участники"
          key="2"
          className="site-collapse-custom-panel"
        >
          <Members />
        </Panel>
      </Collapse>
    </div>
  );
};

export default Info;
