const { join } = require('node:path');

module.exports = {
  extends: [
    'custom/react',
  ],
  parserOptions: {
    project: join(__dirname, 'tsconfig.json'),
  }
}
