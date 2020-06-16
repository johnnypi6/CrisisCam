module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          assets: './src/assets',
          components: './src/components',
          // _atoms: './src/components/atoms',
          // _molecules: './src/components/molecules',
          // _organisms: './src/components/organisms',
          navigations: './src/navigations',
          scenes: './src/scenes',
          // _services: './src/services',
          res: './src/res',
          utils: './src/utils',
        },
      },
    },
  },
};
