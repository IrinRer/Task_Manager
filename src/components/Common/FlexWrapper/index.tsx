import classnames from 'classnames';
import React, { ReactElement } from 'react';

interface IProps {
  children: ReactElement | Array<ReactElement> | null;
  wrapperClassName?: string;
}

const FlexWrapper: React.FC<IProps> = ({ children, wrapperClassName }) => {
  const classNames = classnames('wrapper', wrapperClassName);
  return <div className={classNames}>{children}</div>;
};

export default FlexWrapper;
