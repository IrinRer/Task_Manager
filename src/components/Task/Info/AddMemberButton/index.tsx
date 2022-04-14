import { SearchOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { getMembers } from 'store/task/selectors';
import { fetchAllMembers } from 'store/task/thunk';
import styles from './index.module.scss';

type TProps = {
  multi: boolean;
};
const { Option } = Select;

const AddMemberButton: FC<TProps> = (props: TProps) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { multi } = props;
  const members = useAppSelector(getMembers);

  useEffect(() => {
    dispatch(fetchAllMembers());
  }, [dispatch]);

  const showMemberModal = (e) => {
    setIsVisible(true);
    // dispatch(createTitle(e.target.value));
  };

  function onChange(value) {
    console.log(`selected ${value}`);
    dispatch(createTitle(e.target.value));
  }

  function onSearch(val) {
    //console.log('search:', val);
  }

  function onBlur() {
    setIsVisible(!isVisible);
  }

  const children = (
    <>
      {members.length !== 0
        ? members.map((el, index) => (
            <Option value={el.user_id}>{el.name}</Option>
          ))
        : ''}
    </>
  );

  return (
    <>
      {!isVisible ? (
        <Button className={styles.addmember} onClick={showMemberModal}>
          + добавить участника
        </Button>
      ) : (
        ''
      )}

      {isVisible ? (
        <Select<string | number, { value: string; children: string }>
          mode={multi ? 'multiple' : undefined}
          className={styles.members}
          showSearch
          autoFocus
          open
          placeholder="Искать участников"
          optionFilterProp="children"
          defaultOpen
          suffixIcon={
            <span
              role="img"
              aria-label="search"
              className="anticon anticon-search"
            >
              <SearchOutlined />
            </span>
          }
          // eslint-disable-next-line react/jsx-no-bind
          onChange={onChange}
          // eslint-disable-next-line react/jsx-no-bind
          onBlur={onBlur}
          // eslint-disable-next-line react/jsx-no-bind
          onSearch={onSearch}
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
        </Select>
      ) : (
        ''
      )}
    </>
  );
};

export default AddMemberButton;
