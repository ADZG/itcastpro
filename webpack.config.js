var path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: './src/app.js',
  // 文件处理的入口
  output: {
    // 文件输出存放的位置
    path: path.join(__dirname, 'dist'),
    // 文件处理之后，保存的文件名称
    filename: 'main.js'
  },
  devServer: {
    // 默认会在该路径的文件夹下面生成处理后的文件
    publicPath: '/dist'
  },

  module: {

    rules: [
      // 配置的是用来解析.css文件的loader(style-loader和css-loader)
      {
        // 1.0 用正则匹配当前访问的文件的后缀名是  .css
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // webpack底层调用这些包的顺序是从右到左
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff)/,
        use: [{
          loader: 'url-loader',
          options: {
            // limit表示如果图片大于50000byte，就以路径形式展示，小于的话就用base64格式展示
            limit: 5000
          }
        }]
      },
      {
        test: /\.js$/,

        // 使用use可以配置loader选项
        use: {
          loader: 'babel-loader',
          // loader可选配置,这里必须加上,preset-env转化为es5
          options: {
            presets: ['@babel/preset-env']
          }
        },

        // 不需要转化node_modules中的文件
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
