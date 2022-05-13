import React from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { TOption } from '../TaskHook/useSelectOptions';

const { Option } = Select;

type ISimpleSelect = {
  list: object[] | null;
  itemKey: string;
  itemLabel: string;
  itemValue: string;
};

const SimpleSelect: React.FC<
  ISimpleSelect & SelectProps<SelectValue, TOption>
> = ({ list, itemKey, itemLabel, itemValue, ...props }) => {
  const children = list?.map((el) => {
    return (
      <Option key={el[itemKey]} value={el[itemValue]}>
        {el[itemLabel]}
      </Option>
    );
  });
  return <Select {...props}>{children}</Select>;
};

export default SimpleSelect;
