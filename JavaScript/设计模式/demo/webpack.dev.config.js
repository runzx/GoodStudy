const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
  entry:'./src/index.js',
  output:{
    path:__dirname,
    filename:'./release/bundle.js'
  },
  plugins:[
    new HtmlWebpackPlugin({template:'./index.html'})
  ],
  devServer:{
    contentBase:path.join(__dirname,'./release'),
    open:true,
    port:9000
  }
}