import React, { useContext } from 'react';
import { PointsContext } from '../contexts/PointsContext';

const Menu = ({ onStartGame, onSpendPoints, onInfo1, onInfo2, onInfo3 }) => {
  const { points } = useContext(PointsContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Blobby Volley</h1>
      <p>Баллы: {points}</p>
      <button
        className="m-2 p-2 bg-green-500 text-white rounded"
        onClick={onStartGame}
      >
        Начать игру
      </button>
      <button
        className="m-2 p-2 bg-blue-500 text-white rounded"
        onClick={onSpendPoints}
      >
        Потратить баллы
      </button>
      <button
        className="m-2 p-2 bg-gray-500 text-white rounded"
        onClick={onInfo1}
      >
        Инструкция
      </button>
      <button
        className="m-2 p-2 bg-gray-500 text-white rounded"
        onClick={onInfo2}
      >
        Управление
      </button>
      <button
        className="m-2 p-2 bg-gray-500 text-white rounded"
        onClick={onInfo3}
      >
        О игре
      </button>
    </div>
  );
};

export default Menu;