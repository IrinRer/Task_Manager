import React, { useEffect, useState } from 'react';

import { getBackendURL } from 'helpers/common';
import CreateRoutes from 'containers/Routes';

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
  
  return <CreateRoutes/>;
};

export default App;
