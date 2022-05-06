import React from 'react';
import { Select } from 'antd';
import { SortField } from 'constants/types/common';
import styles from './index.module.scss';

const { Option } = Select;

interface IProps {
  onSelect(sortField: SortField): void;
  selectValue: SortField;
}

const Sorter: React.FC<IProps> = ({ onSelect, selectValue }) => {
  return (
    <div>
      <span>Упорядочить по:</span>
      <Select
        className={styles.selector}
        value={selectValue}
        bordered={false}
        onChange={onSelect}
      >
        <Option value={SortField.created}>дате создания</Option>
        <Option value={SortField.title}>названию</Option>
        <Option value={SortField.priority}>приоритету</Option>
      </Select>
    </div>
  );
};

export default Sorter;
