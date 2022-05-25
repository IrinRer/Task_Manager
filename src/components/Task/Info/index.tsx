import React from 'react';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import AdditionalFunctions from 'components/Task/Info/AdditionalFunctions';
import styles from './index.module.scss';
import Details from '../Details';
import Members from '../Members';

const { Panel } = Collapse;

const Info: React.FC = () => {
  const expandIcon = ({ isActive }) => {
    return <CaretRightOutlined rotate={isActive ? 90 : 0} />;
  };

  return (
    <>
      <div className={styles.taskInfo}>
        <Collapse
          defaultActiveKey={['1', '2']}
          ghost
          expandIcon={expandIcon}
          className="site-collapse-custom-collapse"
        >
          <Panel header="Детали" key="1" className="site-collapse-custom-panel">
            <Details />
            <AdditionalFunctions />
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
      <div className={styles.taskInfoWrapper} />
    </>
  );
};

export default Info;
