import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getTaskId,
  getEditStatusLoading,
  getTaskAuthor,
} from 'store/editTask/selectors';
import Spinner from 'components/Common/Spinner';
import StatusWithPopover from 'components/Common/StatusWithPopover';

import { ROLES } from 'constants/types/common';
import styles from './index.module.scss';
import OneMember from '../Members/OneMember';
import { RightsRoleContext, useRightsRoleContextValue } from '../context';

const Info: React.FC = () => {
  const author = useAppSelector(getTaskAuthor);
  const taskId = useAppSelector(getTaskId);
  const editLoading = useAppSelector(getEditStatusLoading);

  return (
    <>
      <div className={styles.infoLine}>
        <span>Статус</span>{' '}
        <span className={styles.second}>
          {editLoading ? (
            <div className={styles.spinner}>
              <Spinner size="large" />
            </div>
          ) : taskId ? (
            <StatusWithPopover taskId={taskId} edit />
          ) : (
            ''
          )}
        </span>
      </div>
      <div className={styles.infoLine}>
        <span>{ROLES.author_short}</span>
        <RightsRoleContext.Provider
          value={useRightsRoleContextValue(ROLES.author, false)}
        >
          {author ? <OneMember /> : null}
        </RightsRoleContext.Provider>
      </div>
    </>
  );
};

export default Info;
