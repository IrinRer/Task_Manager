import React from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { IPopulatedUser } from 'store/users/types';
import useSelectOptions, { TOption } from '../TaskHook/useSelectOptions';

const { Option } = Select;

type ISimpleSelect = {
  users: IPopulatedUser[] | null;
  itemKey: string;
  itemLabel: string;
  itemValue: string;
};

const SimpleSelect: React.FC<
  ISimpleSelect & SelectProps<SelectValue, TOption>
> = ({ users, itemKey, itemLabel, itemValue, ...props }) => {
  const options = useSelectOptions();
  const children = users?.map((el) => {
    return (
      <Option key={el[itemKey]} value={el[itemValue]}>
        {el[itemLabel]}
      </Option>
    );
  });
  return (
    <Select {...options} {...props}>
      {children}
    </Select>
  );
};

export default SimpleSelect;
