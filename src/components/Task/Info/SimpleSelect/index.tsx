import React from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { TOption } from '../TaskHook/useSelectOptions';

const { Option } = Select;

interface ISimpleSelect<T> {
  list: T[] | null;
  itemKey: string;
  itemLabel: string;
  itemValue: string;
}

const SimpleSelect = <T,>(
  props: React.PropsWithChildren<
    ISimpleSelect<T> & SelectProps<SelectValue, TOption>
  >,
): React.ReactElement => {
  const { list, itemKey, itemLabel, itemValue, ...rest } = props;
  const children = list?.map((el) => {
    return (
      <Option key={el[itemKey]} value={el[itemValue]}>
        {el[itemLabel]}
      </Option>
    );
  });
  return <Select {...rest}>{children}</Select>;
};

export default SimpleSelect;
