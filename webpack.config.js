const path = require('path');
// Импорт copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Точка входа
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // Путь для ресурсов
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
    static: path.resolve(__dirname, 'dist'),
    port: 9000,
    headers: {
      'Content-Security-Policy': "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline' https://www.gstatic.com; media-src 'self'"
    }
  },
  plugins: [
    // Добавляем плагин для копирования папки src/assets в dist/assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }),
  ],
};