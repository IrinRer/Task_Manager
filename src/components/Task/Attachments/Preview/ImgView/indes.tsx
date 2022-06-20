import React from 'react';
import { Button, Carousel, Slider } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getImgReceived,
  getIndex,
} from 'store/editTask/attachments/preview/selectors';
import { SETTINGS } from 'constants/attachments/attachments';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { setIndex } from 'store/editTask/attachments/preview/slice';
import classNames from 'classnames';
import styles from './index.module.scss';

const ImgView = () => {
  const imgRecieved = useAppSelector(getImgReceived);
  const index = useAppSelector(getIndex);
  const dispatch = useAppDispatch();

  const handleClick = (i: number) => {
    dispatch(setIndex(i));
  };

  const prevClick = () => {
    return index !== 0
      ? dispatch(setIndex(index - 1))
      : dispatch(setIndex(imgRecieved.length - 1));
  };

  const nextClick = () => {
    return index !== imgRecieved.length - 1
      ? dispatch(setIndex(index + 1))
      : dispatch(setIndex(0));
  };

  return (
    <>
      <img alt="img" className={styles.img} src={imgRecieved[index].url} />

      <div className={styles.wrapper_icon}>
        <Button
          icon={<LeftOutlined />}
          onClick={prevClick}
          className={styles.icon_left}
        />
        <Button
          icon={<RightOutlined />}
          onClick={nextClick}
          className={styles.icon_right}
        />
      </div>

      <div className={styles.wrapper_thumnail}>
        <Carousel {...SETTINGS}>
          {imgRecieved.map((item, ind) => {
            const className = classNames(styles.thumbnail_item, {
              [styles.thumbnail_item_active]:
                imgRecieved[index].url === item.url,
            });
            return (
              <div
                onClick={() => {
                  handleClick(ind);
                }}
                key={item.name}
              >
                <img src={item.url} alt="img" className={className} />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default ImgView;
