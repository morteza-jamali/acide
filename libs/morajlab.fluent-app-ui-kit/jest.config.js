module.exports = {
  displayName: 'morajlab.fluent-app-ui-kit',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/morajlab.fluent-app-ui-kit',
};
