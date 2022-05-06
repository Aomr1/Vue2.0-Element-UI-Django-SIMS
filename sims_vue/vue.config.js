module.exports = {
  lintOnSave:false,
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  devServer: { //启动项目在8000端口自动打开
    open: true,
    host:'0.0.0.0',
    port: 8000,
    proxy: 'http://localhost:8000',
},
};