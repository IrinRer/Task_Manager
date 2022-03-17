import React, { useEffect, useState } from 'react';

import Hello from 'components/Hello';

const App: React.FC = () => {
  // Токен не должен храниться в state !!!
  const [token, setToken] = useState('');
  const { REACT_APP_TASK_AUTH_BACKEND_URL } = process.env;

  const auth = () => {
    fetch(`${REACT_APP_TASK_AUTH_BACKEND_URL}/ladum/token/generate`, {
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

  return <Hello token={token} />;
};

export default App;
