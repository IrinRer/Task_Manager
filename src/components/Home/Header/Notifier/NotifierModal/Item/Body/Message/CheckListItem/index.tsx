import { Checkbox } from 'antd';
import classnames from 'classnames';
import React from 'react';
import filterStyles from 'components/Home/Filters/index.module.scss';
import styles from './index.module.scss';

interface IProps {
  title: string;
  complete: boolean;
}

const CheckListItem: React.FC<IProps> = ({ title, complete }) => {
  const checkBoxTextClassName = classnames(styles.checkBoxText, {
    [styles.checkBoxTextCompleted]: complete,
  });
  const checkBoxClassName = classnames(
    filterStyles.checkboxGroup,
    styles.checkbox,
  );

  return (
    <div className={styles.wrapper}>
      <Checkbox
        checked={complete} /* disabled */
        className={checkBoxClassName}
      />
      <p className={checkBoxTextClassName}>{title}</p>
    </div>
  );
};

export default CheckListItem;
