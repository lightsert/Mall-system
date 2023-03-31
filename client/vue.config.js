const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // publicPath:'./',  //打包的配置
  devServer: {
    // host:'192.168.5.3',
    proxy: {
      '/api': {
        target: 'http://localhost:5000/api/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
  
});
