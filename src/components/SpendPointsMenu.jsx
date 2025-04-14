import React, { useContext } from 'react';
import { PointsContext } from '../contexts/PointsContext';

const SpendPointsMenu = ({ onBack }) => {
  const { points, updatePoints } = useContext(PointsContext);

  const spendPoints = () => {
    if (points >= 10) {
      updatePoints(points - 10);
      alert('Вы потратили 10 баллов!');
    } else {
      alert('Недостаточно баллов!');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Потратить баллы</h1>
      <p>Ваши баллы: {points}</p>
      <button
        className="m-2 p-2 bg-blue-500 text-white rounded"
        onClick={spendPoints}
      >
        Потратить 10 баллов
      </button>
      <button
        className="m-2 p-2 bg-gray-500 text-white rounded"
        onClick={onBack}
      >
        Назад
      </button>
    </div>
  );
};

export default SpendPointsMenu;