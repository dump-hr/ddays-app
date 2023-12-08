const { join } = require('node:path');

module.exports = {
  extends: [
    'custom/nest',
  ],
  parserOptions: {
    project: join(__dirname, 'tsconfig.json'),
  }
};
