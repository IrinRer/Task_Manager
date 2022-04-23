import React, { ReactElement } from 'react';
import classnames from 'classnames';
import filterStyles from '../../Home/Filters/index.module.scss';

type TFilterWrapperProps = {
  header: string;
  children: ReactElement | Array<ReactElement>;
  className?: string;
};

const FilterWrapper: React.FC<TFilterWrapperProps> = ({
  className,
  header,
  children,
}) => {
  const classNames = classnames(filterStyles.inputContainer, className);

  return (
    <div className={classNames}>
      <p className={filterStyles.inputHeading}>{header}</p>
      {children}
    </div>
  );
};

export default FilterWrapper;
