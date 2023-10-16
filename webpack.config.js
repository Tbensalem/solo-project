const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : './src/index.js',
    mode : process.env.NODE_ENV,
   
    module : {
        rules : [ 
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                  },
                },
              },
          {
            test: /\.(s(a|c)ss)$/,
            exclude: /node_modules/,
            // All three loaders are needed.
            use : ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
    devServer : {
        static: {
            directory: path.join(__dirname, 'build'),
            publicPath: '/',
        },
        compress : true,
        hot: true,
        port: 8080,
        proxy : {
            '/api' : 'http://localhost:3000'
        },
    },

    plugins: [new HtmlWebpackPlugin({
        title : 'Greatest Game Dev',
        template : 'src/index.html'
    })]
}