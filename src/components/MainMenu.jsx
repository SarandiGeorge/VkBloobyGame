// Импорт React
import React from 'react';
// Импорт хука для навигации
import { useNavigate } from 'react-router-dom';

// Компонент главного меню
function MainMenu() {
  // Хук для навигации
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl mb-8">Blobby Volley</h1>
      {/* Кнопка для начала игры */}
      <button
        className="mb-4 px-6 py-3 bg-blue-500 text-white rounded"
        onClick={() => navigate('/game')}
      >
        Начать игру
      </button>
      {/* Кнопка для траты баллов */}
      <button
        className="mb-4 px-6 py-3 bg-blue-500 text-white rounded"
        onClick={() => navigate('/spend-points')}
      >
        Потратить баллы
      </button>
      {/* Кнопка для инструкций */}
      <button
        className="mb-4 px-6 py-3 bg-blue-500 text-white rounded"
        onClick={() => navigate('/instructions')}
      >
        Инструкция
      </button>
      {/* Кнопка для управления */}
      <button
        className="mb-4 px-6 py-3 bg-blue-500 text-white rounded"
        onClick={() => navigate('/controls')}
      >
        Управление
      </button>
      {/* Кнопка для страницы "О игре" */}
      <button
        className="mb-4 px-6 py-3 bg-blue-500 text-white rounded"
        onClick={() => navigate('/about')}
      >
        О игре
      </button>
    </div>
  );
}

// Экспорт компонента
export default MainMenu;