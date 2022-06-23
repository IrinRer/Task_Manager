import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import React, { useContext } from 'react';

const Title = () => {
  const notification = useContext(NotifierContext);

  if (!notification) return null;

  const title =
    notification.history_command.params.task?.title ||
    notification.history_command.relations[0].relation.title;

  return <div>{title}</div>;
};

export default Title;
