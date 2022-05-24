import React, { FC } from 'react';
import { ITag } from 'store/common/tags/types';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { tagRemoved } from 'store/filters/slice';
import { fetchTasksAction } from 'store/tasks/thunk';
import CustomTag from 'components/Common/CustomTag';

interface ITagProps {
  tag: ITag;
}

const Tag: FC<ITagProps> = ({ tag }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(tagRemoved(tag));
    dispatch(fetchTasksAction());
  };

  return (
    <CustomTag
      title={tag.name}
      color={tag.color}
      noBackground
      onClose={handleClose}
    />
  );

  // return (
  //   <div className={styles.tag}>
  //     <p className={styles.text}>{tag.name}</p>
  //     <button className={styles.button} type="button" onClick={handleClose}>
  //       <CloseOutlined className={styles.icon} />
  //     </button>
  //   </div>
  // );
};

export default Tag;
