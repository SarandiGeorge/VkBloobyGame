// Импорт React
import React from 'react';
// Импорт хука для навигации
import { useNavigate } from 'react-router-dom';

// Компонент "О игре"
function About() {
  // Хук для навигации
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl mb-4">О игре</h1>
      <p className="mb-4">Blobby Volley — это простая игра, вдохновлённая классическими аркадами.</p>
      <p className="mb-4">Разработано для VK Mini Apps.</p>
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
export default About;