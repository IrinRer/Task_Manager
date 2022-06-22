import React from 'react';
import styles from './index.module.scss';

const ReadIcon = () => {
  return (
    <div className={styles.wrapper}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <rect width="32" height="32" rx="8" fill="white" />
          <path
            d="M12 16L17 21"
            stroke="#3DD598"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 11L16.5 15.5"
            stroke="#3DD598"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 21L7 16"
            stroke="#3DD598"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 13L17 21L11 15"
            stroke="#3DD598"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <rect
          id="rect-id"
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="7.5"
          stroke="#3DD598"
          strokeOpacity="0.3"
        />
      </svg>
    </div>
  );
};

export default ReadIcon;
