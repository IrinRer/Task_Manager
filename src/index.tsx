/* eslint-disable no-constant-condition */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import { store } from 'store';

import App from 'containers/App';

import ruRU from 'antd/lib/locale/ru_RU';
import 'styles/antd.less';
import 'styles/global.scss';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={ruRU}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
);
