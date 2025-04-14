const path = require('path');
// Импорт copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Точка входа
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // Убедимся, что ресурсы доступны с корня
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Обрабатываем JS/JSX файлы
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|wav|mp3)$/, // Обрабатываем изображения и аудио
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext][query]', // Копируем в dist/assets/
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Разрешаем импорты без указания расширения
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), // Отдаём содержимое dist/
      publicPath: '/', // Убедимся, что корневой путь обрабатывается
    },
    port: 9000,
    historyApiFallback: true, // Поддержка SPA
    headers: {
      'Content-Security-Policy': "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline' https://www.gstatic.com; media-src 'self'"
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'), // Копируем папку assets
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'public/index.html'), // Копируем index.html
          to: path.resolve(__dirname, 'dist/index.html'),
        },
      ],
    }),
  ],
};