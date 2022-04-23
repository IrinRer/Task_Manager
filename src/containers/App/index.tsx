import React, { useEffect } from 'react';

import CreateRoutes from '../Routes';
import { fetchUsersAction } from '../../store/users/thunk';
import { fetchTagsAction } from '../../store/common/tags/thunk';
import { fetchTasksAction } from '../../store/tasks/thunk';
import { fetchPrioritiesAction } from '../../store/common/priorities/thunk';
import { fetchStatusesAction } from '../../store/common/statuses/thunk';
import { useAppDispatch } from '../../customHooks/redux/useAppDispatch';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersAction());
    dispatch(fetchTagsAction());
    dispatch(fetchTasksAction());
    dispatch(fetchPrioritiesAction());
    dispatch(fetchStatusesAction());
  }, [dispatch]);

  return <CreateRoutes />;
};

export default App;
