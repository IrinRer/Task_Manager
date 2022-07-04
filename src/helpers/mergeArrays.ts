import { INotification } from 'store/notifications/types';

export const mergeArrays = (
  targetArray: Array<INotification>,
  addedArray: Array<INotification>,
): Array<INotification> => {
  const newArray = [...targetArray];
  addedArray.forEach((el) => {
    const index = newArray.findIndex(
      (n) => n.subscribe_notify_id === el.subscribe_notify_id,
    );
    if (index !== -1) {
      newArray[index] = el;
    } else newArray.push(el);
  });
  return newArray;
};
