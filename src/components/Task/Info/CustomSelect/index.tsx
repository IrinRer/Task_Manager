import React from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { AVATAR_SIZE, IUserAvatar } from 'constants/types/common';

const { Option } = Select;

interface ICustomSelect<T> {
  list: T[] | null;
  itemKey: string;
  itemLabel: string;
  itemValue: string;
  children: React.FC<IUserAvatar<T>>;
}

type TCustomOption<T> = {
  value: string;
  children: React.FC<IUserAvatar<T>>;
  label: string;
};

const withAddOption = <P,>(BaseComponent: React.FC<P>) => {
  return (props: P) => {
    return <BaseComponent {...props} />;
  };
};

const CustomSelect = <T,>(
  props: React.PropsWithChildren<
    ICustomSelect<T> & SelectProps<SelectValue, TCustomOption<T>>
  >,
): React.ReactElement => {
  const { list, itemKey, itemValue, itemLabel, children, ...rest } = props;

  const filterOption = (input: string, option: TCustomOption<T>): boolean => {
    return option!.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const filterSort = (
    optionA: TCustomOption<T>,
    optionB: TCustomOption<T>,
  ): number => {
    return optionA!.label
      .toLowerCase()
      .localeCompare(optionB!.label.toLowerCase());
  };

  const OptionElem = withAddOption<IUserAvatar<T>>(children);

  return (
    <Select
      filterOption={filterOption}
      filterSort={filterSort}
      optionLabelProp="label"
      {...rest}
    >
      {list?.map((el) => {
        return (
          <Option key={el[itemKey]} value={el[itemValue]} label={el[itemLabel]}>
            <OptionElem obj={el} size={AVATAR_SIZE.large} />
          </Option>
        );
      })}
    </Select>
  );
};

export default CustomSelect;
