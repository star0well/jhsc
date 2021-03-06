// vue.config.js
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,

  // 选项...
  css: {
    loaderOptions: {
      // /*no*/ /*px*/生效
      sass: {
        sassOptions: {
          outputStyle: "expanded",
        },
      },
      postcss: {
        plugins: [
          require("postcss-px2rem-exclude")({
            // 以设计稿750为例， 750 / 10 = 75
            remUnit: 192,
            exclude: /node_modules/i,
          }),
        ],
      },
      less: {
        lessOptions: {
          modifyVars: {
            // 'primary-color': '#61CAD7',
            // 'btn-primary-bg': '#55a78d',
            // 'radio-button-color': '#55a78d',
            // 'disabled-color': 'rgba(0,0,0,0.65)'
          },
          javascriptEnabled: true,
        },
      },
    },
  },

  runtimeCompiler: true,
  lintOnSave: false,

  // 开发服务配置
  devServer: {
    host: "0.0.0.0",
    overlay: {
      warnings: false,
      errors: false,
    },
    proxy: {
      // "/api/qrcodeimg": {
      //     target: "http://124.70.177.246:8900/yinhuanpaicha/date/",
      //     changeOrigin: true,
      //     ws: true,
      //     pathRewrite: {
      //         "^/api/qrcodeimg": ''
      //     }
      // }
      [process.env.VUE_APP_BASE_API]: {
        // target: "http://124.70.177.246:8301",
        target: "http://192.168.0.105:8301",
        // target: "http://192.168.10.141:8301",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },
  // configureWebpack: config => {
  //     config.externals = {
  //         "AMap": "AMap",
  //         "AMapUI":"AMapUI"
  //     }
  // },
};
