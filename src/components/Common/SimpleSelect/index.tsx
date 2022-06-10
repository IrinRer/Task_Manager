import React from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import useSelectOptions, {
  TOption,
} from '../../Task/Info/TaskHook/useSelectOptions';

const { Option } = Select;

export interface ISimpleSelect<T> {
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
  const options = useSelectOptions();

  return (
    <Select
      filterOption={options.particular.filterOption}
      filterSort={options.particular.filterSort}
      {...rest}
    >
      {list?.map((el) => {
        return (
          <Option key={el[itemKey]} value={el[itemValue]}>
            {el[itemLabel]}
          </Option>
        );
      })}
    </Select>
  );
};

export default SimpleSelect;
