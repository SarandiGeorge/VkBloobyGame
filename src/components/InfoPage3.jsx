import React from 'react';

const InfoPage3 = ({ onBack }) => (
  <div className="p-4">
    <h1 className="text-xl font-bold">О игре</h1>
    <p>Blobby Volley - классическая аркадная игра, адаптированная для ВКонтакте.</p>
    <button onClick={onBack} className="m-2 p-2 bg-blue-500 text-white rounded">Назад</button>
  </div>
);

export default InfoPage3;