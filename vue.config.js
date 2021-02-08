const path = require('path')
// const fs = require('fs')
const resolve = (dir) => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const IS_DEV = ['development'].includes(process.env.NODE_ENV)
const webpack = require('webpack')

const glob = require('glob')
const pagesInfo = require('./pages.config')
const pages = {}

glob.sync('./src/pages/**/main.js').forEach((entry) => {
  const chunk = entry.match(/\.\/src\/pages\/(.*)\/main\.js/)[1]
  const curr = pagesInfo[chunk]
  if (curr) {
    pages[chunk] = {
      entry,
      ...curr,
      chunk: ['chunk-vendors', 'chunk-common', chunk]
    }
  }
})

const DEVELOPMENT = (webpackConfig) => {
  webpackConfig.store.set('devtool', 'eval-source-map')
  return webpackConfig
}

/**
 * @todo 生产环境配置
 * 每个额外的 loader/plugin 都有启动时间。尽量少使用不同的工具
 */

const PRODUCTION = (webpackConfig) => {
  /**
   * @todo 不需要启用 source-map，去除 console 的情况下 source-map 根本没用，还浪费大量时间和空间
   * 详情见：https://webpack.js.org/configuration/devtool/#devtool
   */
  webpackConfig.store.set('devtool', '')
  Object.keys(pagesInfo).forEach((page) => {
    webpackConfig.plugin(`html-${page}`).tap(([options]) => [
      Object.assign(options, {
        minify: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          conservativeCollapse: false,
          collapseInlineTagWhitespace: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          removeAttributeQuotes: false,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyJS: true,
          minifyCSS: true
        },
        cache: true, // 仅在文件被更改时发出文件
        hash: true, // true则将唯一的webpack编译哈希值附加到所有包含的脚本和CSS文件中,这对于清除缓存很有用
        scriptLoading: 'defer', // 现代浏览器支持非阻塞javascript加载（'defer'）,以提高页面启动性能。
        inject: true, // true所有javascript资源都将放置在body元素的底部
        chunksSortMode: 'none'
      })
    ])
  })
  return webpackConfig
}

const mockServer = () => {
  if (process.env.NODE_ENV === 'development') {
    return require('./mock/index/mockServer.js')
  } 
    return ''
  
}

const { modifyVars } = require('./src/assets/styles/theme/themeUtil')

module.exports = {
  publicPath: './',
  outputDir: process.env.outputDir || 'dist',
  assetsDir: './static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  css: {
    // 如果你想去掉文件名的 .module
    // requireModuleExtension: false,
    extract: true,
    loaderOptions: {
      // sass: {},
      less: {
        globalVars: {},
        srouceMap: IS_DEV,
        javascriptEnabled: true,
        // antd的主题色配置
        modifyVars: modifyVars(),
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,
  parallel: require('os').cpus().length > 1,
  pages,
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  lintOnSave: IS_DEV,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  devServer: {
    // 配置自动启动浏览器
    open: true,
    host: '0.0.0.0',
    port: 3000,
    https: false,
    hotOnly: false,
    overlay: {
      // warnings: true,
      // errors: true,
    },
    after: mockServer()
    // proxy: {
    //   '/api': {
    //     target: process.env.VUE_APP_BASE_API || 'http://127.0.0.1:8080',
    //     changeOrigin: true
    //   }
    // }
  },
  pluginOptions: {
    // import global scss variables and mixins
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('./src/assets/styles/var.less')]
    }
  },
  configureWebpack: (config) => {
    config.externals = {
      // vue: 'Vue',
      // 'vue-router': 'VueRouter',
      // vuex: 'Vuex',
      // axios: 'axios',
      // echarts: 'echarts',
      // 'element-ui': 'ELEMENT',
      // i18n: 'VueI18n',
    }
    config.optimization = {
      // 优化配置
      splitChunks: {
        minSize: 3000, // （默认值：30000）块的最小大小。
        minChunks: 1, // （默认值：1）在拆分之前共享模块的最小块数
        maxAsyncRequests: 5, // （默认值为5）按需加载时并行请求的最大数量
        maxInitialRequests: 6, // （默认值为3）入口点的最大并行请求数
        automaticNameDelimiter: '-',
        name: true,
        cacheGroups: {
          lodash: {
            name: 'lodash',
            test: /[\\/]node_modules[\\/]lodash[\\/]/,
            priority: 20
          },
          // 拆分Vue
          vue: {
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            name: 'chunk-vue'
          },
          vuex: {
            name: 'vuex',
            test: /[\\/]node_modules[\\/]vuex[\\/]/
          },
          'vuex-presistedstate': {
            name: 'vuex-presistedstate',
            test: /[\\/]node_modules[\\/]vuex-presistedstate[\\/]/
          },
          'vue-router': {
            name: 'vue-router',
            test: /[\\/]node_modules[\\/]vue-router[\\/]/
          },
          'ant-design-vue': {
            name: 'ant-design-vue',
            test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/
          },
          moment: {
            name: 'moment',
            test: /[\\/]node_modules[\\/]moment[\\/]/,
            priority: 40
          }
        }
      }
    }
  },
  chainWebpack: (config) => {
    IS_DEV ? DEVELOPMENT(config) : PRODUCTION(config),
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    // 修复 HMR(热更新)失效
    config.resolve.symlinks(true)
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@pages', resolve('src/pages'))
      .set('@index', resolve('src/pages/index'))
      // .set(
      //   '@ant-design/icons/lib/dist$',
      //   resolve('src/assets/icons/antIcons.js')
      // )
    // 防止多页面打包卡顿
    config => config.plugins.delete('named-chunks')
    // 多页面cdn添加
    Object.keys(pagesInfo).forEach((page) => {
      config.plugin(`html-${page}`).tap((args) => {
        // html中添加cdn
        if (pagesInfo[page] && pagesInfo[page].cdn) {
          args[0].cdn = pagesInfo[page].cdn
        }
        if (IS_DEV) {
          // 修复 Lazy loading routes Error
          args[0].chunksSortMode = 'none'
          args[0].minify = false
        }
        return args
      })
    })

    // config.plugin('define').tap(args => {
    //   // DefinePlugin 设置值 必须 JSON 序列化 或者 使用 双引号 包起来
    //   args[0]['process.env'].NOW = JSON.stringify(now)
    //   return args
    // })

    config.module.rule('svg').exclude.add(resolve('src/assets/icons/svg')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // 删除 moment 除 zh-cn 中文包外的其它语言包，无需在代码中手动引入 zh-cn 语言包
    config
      .plugin('ignore')
      .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))
    return config
  }
}
