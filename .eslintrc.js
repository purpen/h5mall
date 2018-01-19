// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': [0, {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": [0, "always"],//语句不强制分号结尾
    "semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
    "no-trailing-spaces": 0,//一行结束后面不要有空格
    "no-restricted-syntax": 0,
    "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
    "comma-dangle": [2, "never"],//对象字面量项尾不能有逗号
    "no-console": 0,
    "default-case": 0,
    "camelcase": 0,
    "no-shadow": 0,
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "object-shorthand": 0,
    "guard-for-in": 0,//for in循环要用if语句过滤
    "arrow-parens": 0, //箭头函数用小括号括起来
    "prefer-template": 0,
    "import/imports-first": 0,
    "import/newline-after-import": 0,
    "import/no-dynamic-require": 0,
    "import/no-named-as-default": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "arrow-body-style": 0, // 箭头函数中，如果函数体里只有一句代码时可以省略大括号 规定是否可以省略大括号
  }
}
