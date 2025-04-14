// Импорт React
import React from 'react';
// Импорт хука для навигации
import { useNavigate } from 'react-router-dom';

// Компонент инструкций
function Instructions() {
  // Хук для навигации
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl mb-4">Инструкция</h1>
      <p className="mb-4">Цель игры: забить мяч на сторону противника.</p>
      <p className="mb-4">Управление:</p>
      <ul className="list-disc mb-4">
        <li>Стрелки влево/вправо — движение</li>
        <li>Стрелка вверх — прыжок</li>
        <li>Пробел — замедление времени (3 сек)</li>
        <li>Клик мыши — включить свет</li>
      </ul>
      {/* Кнопка "Назад" */}
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded"
        onClick={() => navigate('/')}
      >
        Назад
      </button>
    </div>
  );
}

// Экспорт компонента
export default Instructions;