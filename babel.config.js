module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            screens: './src/screens',
            common: './src/common',
            helpers: './src/helpers',
            navigations: './src/navigations',
            store: './src/store',
            assets: './assets',
          },
        },
      ],
      "nativewind/babel",
    ],
  };
};