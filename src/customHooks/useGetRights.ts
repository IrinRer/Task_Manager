import { RIGHTS, RIGHTS_NAMES } from 'constants/rights';
import { ROLES } from 'constants/types/common';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { IResponseTask } from 'store/common/task/types';

export const useGetRights = (
  element: RIGHTS_NAMES,
  task?: IResponseTask | null,
): boolean => {
  const myMaxRole = useAppSelector(
    task ? (state) => getMyMaxRoleForTask(state, task) : getMyMaxRoleForTask,
  );

  return (
    RIGHTS[element].includes(myMaxRole) || RIGHTS[element].includes(ROLES.any)
  );
};
