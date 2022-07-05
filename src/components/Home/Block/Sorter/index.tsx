import React from 'react';
import { Select } from 'antd';
import { BlockType, SortField } from 'constants/types/common';
import { ReactComponent as SortIcon } from 'assets/icons/sort.svg';
import { useWindowSize } from 'customHooks/useWindowSize';
import {
  MIN_DESKTOP_WIDTH,
  MIN_SORT_WIDTH,
  SHORT_SORT_WIDTH,
} from 'constants/common';
import { CaretDownOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const { Option } = Select;

interface IProps {
  onSelect(sortField: SortField): void;
  selectValue: SortField;
  blockType: BlockType;
}

const Sorter: React.FC<IProps> = ({ onSelect, selectValue, blockType }) => {
  const size = useWindowSize();

  return (
    <div className={styles.wrapper}>
      {(size.width || 0) >= MIN_SORT_WIDTH && <span>Упорядочить по:</span>}
      {(size.width || 0) > SHORT_SORT_WIDTH &&
        (size.width || 0) < MIN_SORT_WIDTH && <span>По:</span>}

      <Select
        className={styles.selector}
        dropdownMatchSelectWidth={false}
        dropdownClassName={styles.dropdown}
        value={selectValue}
        bordered={false}
        onChange={onSelect}
      >
        <Option className="sorter-option" value={SortField.created}>
          дате создания
        </Option>
        <Option value={SortField.title}>названию</Option>
        {blockType === BlockType.done ? (
          <Option value={SortField.endDate}>дате завершения</Option>
        ) : (
          <Option value={SortField.priority}>приоритету</Option>
        )}
      </Select>

      {(size.width || 0) >= MIN_DESKTOP_WIDTH && (
        <CaretDownOutlined className={styles.menuicon} />
      )}
      {(size.width || 0) < MIN_DESKTOP_WIDTH && (
        <SortIcon className={styles.menuiconSort} />
      )}
    </div>
  );
};

export default Sorter;
