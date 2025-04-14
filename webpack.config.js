const path = require('path');
// Плагин для копирования index.html и других статических файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Точка входа
  output: {
    path: path.resolve(__dirname, 'dist'), // Папка для сборки
    filename: 'bundle.js', // Имя выходного файла
    publicPath: '/', // Публичный путь для ресурсов
    clean: true, // Очищать dist перед сборкой
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Обработка JS/JSX файлов
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|wav|mp3)$/, // Обработка активов
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]' // Копировать активы в dist/assets/
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Используем public/ для статических файлов
    },
    port: 9000,
    https: true,
    historyApiFallback: true, // Перенаправлять все запросы на index.html
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Использовать public/index.html как шаблон
      filename: 'index.html', // Имя файла в dist/
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Разрешённые расширения
  },
};