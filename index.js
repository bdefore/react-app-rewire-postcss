const matchByRule = rule => rule.use && rule.use.find(l => l.options && l.options.ident === 'postcss')
const matchByLegacyLoaderConfig = rule => rules && rules.find(r => r.options && r.options.ident === 'postcss')

var index = ((config, env, options) => {
  const { getLoader } = require('react-app-rewired')
  const matcher = env === 'production' ? matchByLegacyLoaderConfig : matchByRule
  const match = getLoader(config.module.rules, matcher)
  const loaderConfig = env === 'production' ? match.loader.find(l => l.loader.includes('postcss-loader')) : match.use[1]

	// use the latest version of postcss-loader
  loaderConfig.loader = require.resolve('postcss-loader');

  // update the options with your custom configuration
  Object.assign(loaderConfig.options, options);

  return config;
});

module.exports = index;
