import React from 'react';

interface IProps {
  text: string;
  item: string;
}

const SimpleMessage: React.FC<IProps> = ({ text, item }) => {
  return (
    <span>
      {text}
      <b>item</b>
    </span>
  );
};

export default SimpleMessage;
