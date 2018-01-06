# h5mall

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```



## 资料参考
* CSS命名规范——BEM思想 [https://www.cnblogs.com/dujishi/p/5862911.html]

BEM的意思就是块（block）、元素（element）、修饰符（modifier）
  .block{}
  .block__element {}
  .block--modifier {}

.block 代表了更高级别的抽象或组件。
.block__element 代表.block的后代，用于形成一个完整的.block的整体。
.block--modifier代表.block的不同状态或不同版本。

按钮
.mix-button
.mix-button--default
.mix-button--primary
.is-round
.is-plain
.is-disabled
.mix-button--text
.mix-button-group

.mix-icon
.mix-icon-upload
.mix-icon--right


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
