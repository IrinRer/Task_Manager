import React, { useRef } from 'react';
import { Button, Carousel } from 'antd';
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

  const carousel = useRef<any>();

  const handleClick = (i: number) => {
    dispatch(setIndex(i));
  };

  const prevClick = () => {
    if (index === 0) {
      dispatch(setIndex(imgRecieved.length - 1));
      carousel.current?.goTo(imgRecieved.length - 1);
    } else {
      dispatch(setIndex(index - 1));
      carousel.current?.goTo(index - 1);
    }
  };

  const nextClick = () => {
    if (index === imgRecieved.length - 1) {
      dispatch(setIndex(0));
      carousel.current?.goTo(0);
    } else {
      dispatch(setIndex(index + 1));
      carousel.current?.goTo(index + 1);
    }
  };

  const classNameWrapper = classNames(styles.wrapper_thumnail, {
    [styles.thumbnail_item_one]: imgRecieved.length === 1,
    [styles.thumbnail_item_two]: imgRecieved.length === 2,
  });

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

      <div className={classNameWrapper}>
        <Carousel {...SETTINGS} ref={carousel}>
          {imgRecieved.map((item, ind) => {
            const className = classNames(styles.thumbnail_item_active, {
              [styles.thumbnail_item]: imgRecieved[index].url !== item.url,
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
