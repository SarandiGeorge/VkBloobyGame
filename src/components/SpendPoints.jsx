// Импорт React и хуков
import React, { useContext } from 'react';
// Импорт хука для навигации
import { useNavigate } from 'react-router-dom';
// Импорт контекста баллов
import { PointsContext } from '../contexts/PointsContext';

// Компонент для траты баллов
function SpendPoints() {
  // Хук для навигации
  const navigate = useNavigate();
  // Получение баллов и функции обновления из контекста
  const { points, updatePoints } = useContext(PointsContext);

  // Функция для траты баллов
  const handleSpendPoints = () => {
    if (points >= 10) {
      updatePoints(points - 10);
      alert('Вы потратили 10 баллов!');
    } else {
      alert('Недостаточно баллов!');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl mb-4">Меню траты баллов</h1>
      <p className="mb-4">Ваши баллы: {points}</p>
      {/* Кнопка для траты баллов */}
      <button
        className="mb-4 px-6 py-3 bg-green-500 text-white rounded"
        onClick={handleSpendPoints}
      >
        Потратить 10 баллов
      </button>
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
export default SpendPoints;