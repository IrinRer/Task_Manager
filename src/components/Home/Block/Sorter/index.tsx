import React from 'react';
import { Select } from 'antd';
import { BlockType, SortField } from 'constants/types/common';
import styles from './index.module.scss';

const { Option } = Select;

interface IProps {
  onSelect(sortField: SortField): void;
  selectValue: SortField;
  blockType: BlockType;
}

const Sorter: React.FC<IProps> = ({ onSelect, selectValue, blockType }) => {
  return (
    <div className={styles.wrapper}>
      <span>Упорядочить по:</span>
      <Select
        className={styles.selector}
        value={selectValue}
        bordered={false}
        onChange={onSelect}
      >
        <Option value={SortField.created}>дате создания</Option>
        <Option value={SortField.title}>названию</Option>
        {blockType === BlockType.done ? null : (
          <Option value={SortField.priority}>приоритету</Option>
        )}
      </Select>
    </div>
  );
};

export default Sorter;
