import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getTaskResponsible,
  getTaskId,
  getEditStatusLoading,
} from 'store/editTask/selectors';
import Spinner from 'components/Common/Spinner';
import StatusWithPopover from 'components/Common/StatusWithPopover';

import { ROLES } from 'constants/types/common';
import { EditableContext, RoleContext } from 'constants/common';
import styles from './index.module.scss';
import OneMember from '../Members/OneMember';

const Info: React.FC = () => {
  const responsible = useAppSelector(getTaskResponsible);
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
        <span>{ROLES.responsible}</span>
        {responsible && (
          <RoleContext.Provider value={ROLES.responsible}>
            <EditableContext.Provider value={false}>
              <OneMember />
            </EditableContext.Provider>
          </RoleContext.Provider>
        )}
      </div>
    </>
  );
};

export default Info;
