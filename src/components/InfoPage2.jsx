import React from 'react';

const InfoPage2 = ({ onBack }) => (
  <div className="p-4">
    <h1 className="text-xl font-bold">Управление</h1>
    <p>Стрелки влево/вправо - движение, стрелка вверх - прыжок, пробел - замедление, касание экрана - включить свет.</p>
    <button onClick={onBack} className="m-2 p-2 bg-blue-500 text-white rounded">Назад</button>
  </div>
);

export default InfoPage2;