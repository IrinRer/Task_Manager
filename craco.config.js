const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@font-size-base': '16px',
              '@font-family': 'Inter, sans-serif',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
