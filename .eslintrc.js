module.exports = {
    'env': {
        'browser': false,
        'node': true,
        'es2021': true
    },
    'extends': 'eslint:recommended',
    'parser': '@babel/eslint-parser',
    'requireConfigFile': 'false',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
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
