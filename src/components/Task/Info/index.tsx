import React, { useEffect } from 'react';
import { Collapse, Select } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { fetchAllStatuses } from 'store/task/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getDefaultStatusName } from 'store/task/selectors';
import styles from './index.module.scss';

const { Option } = Select;
const { Panel } = Collapse;

/* interface IProps {
   a?: string;
}
const Info: React.FC<IProps> = ( { a } ) => {
  const { a } = props; */

const Info: React.FC = () => {
  const dispatch = useDispatch();
  const defaultStatusName = useAppSelector(getDefaultStatusName);
  const idTask = '2e5f852b-a603-440a-8c4f-1f2f20ddc90f';

  useEffect(() => {
    dispatch(fetchAllStatuses());
  }, [dispatch]);

  const onChange = (value: any) => {
    console.log(`selected ${value}`);
  };

  /* const children: any[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>,
    );
  } */

  return (
    <div className={styles.taskInfo}>
      <Collapse
        defaultActiveKey={['1', '2']}
        ghost
        // eslint-disable-next-line react/no-unstable-nested-components
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        <Panel
          header="Детали"
          key="1"
          className="site-collapse-custom-panel"
          // className={styles.details}
        >
          <div className={styles.infoLine}>
            <span>Статус</span> <span>{defaultStatusName || ''}</span>
          </div>
          <div className={styles.infoLine}>
            <span>Ответственный</span>
            <span>Артем Мединский</span>
            {/* <Select<string | number, { value: string; children: string }>
              showSearch
              style={{ width: 200 }}
              placeholder="Выбрать участника"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA!.children
                  .toLowerCase()
                  .localeCompare(optionB!.children.toLowerCase())
              }
            >
              {children}
              <Option value="1">Not Identified</Option>
              <Option value="2">Closed</Option>
              <Option value="3">Communicated</Option>
              <Option value="4">Identified</Option>
              <Option value="5">Resolved</Option>
              <Option value="6">Cancelled</Option>
            </Select> */}
          </div>
        </Panel>
        <Panel
          header="Участники"
          key="2"
          className="site-collapse-custom-panel"
          // className={styles.members}
        >
          <div className={styles.infoLine}>
            <span>Автор</span> <span>Артем Мединский</span>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Info;
