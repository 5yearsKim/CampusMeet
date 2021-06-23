module.exports = function(api) {
  api.cache(true);
  const plugins = ['react-native-reanimated/plugin'];
  if (process.env['ENV'] === 'prod') {
    plugins.push('react-native-paper/babel');
  }
  return {
    presets: ['babel-preset-expo'],
    plugins: plugins,
  };
};
