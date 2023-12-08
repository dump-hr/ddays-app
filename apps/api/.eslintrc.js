const { join } = require('node:path');

module.exports = {
  extends: [
    'ddays/nest',
  ],
  parserOptions: {
    project: join(__dirname, 'tsconfig.json'),
  }
};
