<!--
 * @Author: shawnxiao
 * @Date: 2021-02-01 16:13:50
 * @LastEditTime: 2021-02-08 16:52:31
 * @FilePath: /vue3-cli-antd-pages/README.md
-->
# vue3-cli-antd-pages
> 基于vue3、vue-cli4、antdv的多页面开发主体框架
> 过滤重复请求
> mock模拟真实接口数据
> 自动注册全局组件
> 自动引入vuex状态
#### 包管理工具
- 建议使用 yarn,也是 vue-cli4.0+ 默认工具

#### 主要用到的库

- vue 全家桶 vue3 + vue-router + vuex 
- http 请求:axios
- ui 库:ant-design-vue.
- 代码检查:eslint+eslint-vue,.提交之前检查与修复：lint-staged"

#### 代码基础架构说明

```
|-- 根目录
    |-- dist 项目 build 之后的文件夹
    |-- docs 文档生成的根目录位置
    |-- public 项目静态资源，不经过 webpack，以及默认的模版，适合存放第三方压缩好的资源
    |-- mock mock数据文件夹
    | |-- index index页面下的mock数据文件
    | |-- mobile mobile页面下的mock数据文件
    |-- src 主要的开发目录
    | |-- assets 公共静态资源文件夹
    | |-- common 公共工具库文件夹
    | |-- components 公共组件文件夹
    | |-- pages 页面文件夹
    | | |-- index index页面文件夹
    | | |-- App.vue 页面渲染根节点
    | | |-- main.js 入口文件
    | | |-- apis http 请求相关
    | | | |-- apiList.ts api 接口列表
    | | | |-- axios.ts 业务请求封装
    | | | |-- editor.ts 其他业务封装
    | | | |-- user.ts api 请求模块
    | | |-- assets 存放静态资源，这个文件夹下的文件会走 webpack 压缩流程
    | | |-- components
    | | | |-- index.ts 自动注册脚本
    | | | |-- global 自动注册的全局组件
    | | | |-- ...其他非全局注册的模块
    | | |-- config 全局静态配置，不可更改项
    | | |-- layout 页面页面骨架
    | | |-- plugins 存放第三方插件
    | | | |-- index.ts 插件挂载入口
    | | |-- router 路由
    | | | |-- index.ts 路由入口
    | | |-- store vuex
    | | | |-- modules 多个模块
    | | | |-- index.ts 自动装载模块
    | | | |-- app app 模块
    | | |-- styles 全局样式，一句 ui 库主题样式
    | | | |-- \_variables.less
    | | | |-- test.less
    | | |-- utils 常用函数以及其他有用工具
    | | | |-- common.ts
    | | |-- views 页面级组件
    | | |-- Home.vue 正常页面
    | | |-- test 组件测试页面
    | | |-- Test.vue
    | |-- api api 模块    
    | | |-- mobile index页面文件夹
    |-- .editorconfig vscode 编辑器 设置
    |-- .env.development 开发环境配置
    |-- .env.preview 测试环境配置
    |-- .env.production 生产环境配置
    |-- .eslintignore eslint 要忽略的文件夹
    |-- .eslintrc.js eslint 规则配置
    |-- .gitignore git 忽略的文件
    |-- README.md 项目说明
    |-- package.json npm 配置
    |-- vue.config.js vue-cli 脚手架配置文件
```
#### 样式配置

> 均通过在 vue-cli 中配置 webpack 实现.

- [x] 自动注入全局样式
- [x] 配置全局 less 变量
- [x] 支持自定义 UI 库的主题颜色
#### 网络请求

- [x] 基于 axios 封装脱离具体业务逻辑的网络请求,支持编写脱离浏览器环境的测试用例.(跟业务无关)
- [ ] 基于具体业务逻辑再次封装网络请求 (跟业务相关,此项需要依据具体后台应用接口编写)
- [ ] 请求封装过滤重复请求

#### 数据状态管理

- [x] 建立应用数据状态管理
- [x] 编写更加简易读取的mutation方法,并完善 type 【新增】
- [x] 支持多个模块,以及自动装载模块
- [x] 支持持久化
#### UI 库

- [x] 添加 ant-design-vue,支持组件按需加载
- [x] 将 UI 库部分功能如 message 添加到每个组件实例

#### 插件与常用工具函数

- [x] 引用常用工具函数
- [x] 常用 hook 

#### 配置

- [x] 配置 webpack,分离开发/测试/生产环境配置.
- [x] 添加 webpack 常用插件,优化打包配置.
- [x] 根据环境配置 vue-cli 环境变量(环境相关)
- [x] 配置应用全局静态常量(业务相关)
- [x] 完成 tsconfig 相关配置
- [x] 增加编辑器配置

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
