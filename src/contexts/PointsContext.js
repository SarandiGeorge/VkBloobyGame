import React, { createContext, useState, useEffect } from 'react';
import vkBridge from '@vkontakte/vk-bridge';

export const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    async function fetchPoints() {
      const data = await vkBridge.send('VKWebAppStorageGet', { keys: ['points'] });
      const storedPoints = data.keys.find(k => k.key === 'points')?.value || '0';
      setPoints(parseInt(storedPoints, 10));
    }
    fetchPoints();
  }, []);

  const updatePoints = async (newPoints) => {
    setPoints(newPoints);
    await vkBridge.send('VKWebAppStorageSet', { key: 'points', value: newPoints.toString() });
  };

  return (
    <Points上下文.Provider value={{ points, updatePoints }}>
      {children}
    </PointsContext.Provider>
  );
};