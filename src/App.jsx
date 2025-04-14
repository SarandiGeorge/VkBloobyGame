// Импорт React и хуков
import React, { useEffect } from 'react';
// Импорт компонента игры
import Game from './components/Game';
// Импорт провайдера баллов
import { PointsProvider } from './contexts/PointsContext';
// Импорт VK Bridge
import vkBridge from '@vkontakte/vk-bridge';

// Основной компонент приложения
function App() {
  // Инициализация VK Bridge при монтировании
  useEffect(() => {
    vkBridge.send('VKWebAppInit', {});
  }, []); // Пустой массив зависимостей — выполняется один раз

  return (
    // Оборачиваем всё в провайдер баллов
    <PointsProvider>
      <div className="w-full h-full bg-gray-100">
        <Game />
      </div>
    </PointsProvider>
  );
}

// Экспорт компонента
export default App;