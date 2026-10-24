jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const Icon = ({ name, size, color, ...props }) => React.createElement(Text, props, name);

  return { Ionicons: Icon, MaterialIcons: Icon, Feather: Icon };
});
