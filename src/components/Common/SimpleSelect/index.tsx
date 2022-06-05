import React from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { TOption } from '../../Task/Info/TaskHook/useSelectOptions';

const { Option } = Select;

interface ISimpleSelect<T, U> {
  list: T[] | null;
  itemKey: string;
  itemLabel: U;
  itemValue: string;
}

const SimpleSelect = <T, U>(
  props: React.PropsWithChildren<
    ISimpleSelect<T, U> & SelectProps<SelectValue, TOption>
  >,
): React.ReactElement => {
  const { list, itemKey, itemLabel, itemValue, ...rest } = props;
  const children = list?.map((el) => {
    return (
      <Option key={el[itemKey]} value={el[itemValue]}>
        {/* itemLabel */}
      </Option>
    );
  });
  return <Select {...rest}>{children}</Select>;
};

export default SimpleSelect;
