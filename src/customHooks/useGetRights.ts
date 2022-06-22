import { RIGHTS, RIGHTS_NAMES } from 'constants/rights';
import { TTask } from 'constants/types/common';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';

export const useGetRights = (
  element: RIGHTS_NAMES,
  task?: TTask | null,
): boolean => {
  const myMaxRole = useAppSelector(
    task ? (state) => getMyMaxRoleForTask(state, task) : getMyMaxRoleForTask,
  );
  return RIGHTS[element].includes(myMaxRole);
};
