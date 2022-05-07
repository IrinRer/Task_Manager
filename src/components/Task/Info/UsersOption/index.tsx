import React from 'react';
import { Select } from 'antd';
import { IPopulatedUser } from 'store/users/types';

const { Option } = Select;

interface IProps {
  users: Array<IPopulatedUser>;
}

const UsersOption: React.FC<IProps> = ({ users, ...restProps }) => {
  return (
    <>
      {users?.map((el) => (
        <Option key={el.key} value={el.user_id}>
          {el.name}
        </Option>
      ))}
    </>
  );
};

export default UsersOption;
