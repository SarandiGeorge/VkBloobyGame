import React from 'react';

const InfoPage1 = ({ onBack }) => (
  <div className="p-4">
    <h1 className="text-xl font-bold">Инструкция</h1>
    <p>Цель игры - забить мяч на сторону противника.</p>
    <button onClick={onBack} className="m-2 p-2 bg-blue-500 text-white rounded">Назад</button>
  </div>
);

export default InfoPage1;