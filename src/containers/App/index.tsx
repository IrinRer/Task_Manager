import React, { useEffect, useState } from 'react';

import Hello from 'components/Hello';
import { getBackendURL } from 'helpers/common';
import Task from 'pages/Tasks/Task';

const App: React.FC = () => {
  // Токен не должен храниться в state !!!
  const [token, setToken] = useState('');

  const auth = () => {
    fetch(`${getBackendURL(true)}/ladum/token/generate`, {
      method: 'POST',
      body: JSON.stringify({ user_id: '1' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(({ token }) => setToken(token));
  };

  useEffect(() => {
    auth();
  }, []);

  return <Task />;
};

export default App;
