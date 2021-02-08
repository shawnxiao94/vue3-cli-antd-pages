/*
 * @Author: shawnxiao
 * @Date: 2021-02-01 16:13:43
 * @LastEditTime: 2021-02-07 18:17:02
 * @FilePath: /vue3-cli-antd-pages/babel.config.js
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'lodash'
    ],
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true // `style: true` 会加载 less 文件
      },
      'ant-design-vue'
    ]
  ]
}
