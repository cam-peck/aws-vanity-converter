module.exports = {
    'env': {
        'browser': false,
        'node': true,
    },
    'parser': '@babel/eslint-parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'requireConfigFile': false,
        'babelOptions': {
            'plugins': [
                '@babel/plugin-syntax-import-assertions'
            ],
        },
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
