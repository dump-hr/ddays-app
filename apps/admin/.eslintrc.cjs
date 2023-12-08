const { join } = require('node:path');

module.exports = {
  extends: [
    'ddays/react',
  ],
  parserOptions: {
    project: join(__dirname, 'tsconfig.json'),
  }
}
