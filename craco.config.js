const CracoLessPlugin = require('craco-less');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            // Find the rule for processing Less files and adjust its configuration
            const lessRule = webpackConfig.module.rules.find((rule) =>
                rule.test && rule.test.toString().includes('less')
            );

            if (lessRule) {
                lessRule.use = lessRule.use.map((loader) => {
                    if (loader.loader.includes('style-loader')) {
                        return {
                            ...loader,
                            loader: require.resolve('style-loader'),
                        };
                    }
                    return loader;
                });
            }

            return webpackConfig;
        },
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
