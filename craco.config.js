const CracoLessPlugin = require('craco-less');

module.exports = {
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
                modifyLessRule: function (lessRule, context) {
                    lessRule.test = /\.less$/;
                    lessRule.use = [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        {
                            loader: 'less-loader',
                            options: { lessOptions: { javascriptEnabled: true } },
                        },
                    ];
                    return lessRule;
                },
            },
        },
    ],
};
