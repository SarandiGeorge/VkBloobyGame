import React, { useState, useEffect } from 'react';
import PointsProvider from './contexts/PointsContext';
import Menu from './components/Menu';
import Game from './components/Game';
import SpendPointsMenu from './components/SpendPointsMenu';
import InfoPage1 from './components/InfoPage1';
import InfoPage2 from './components/InfoPage2';
import InfoPage3 from './components/InfoPage3';

const App = () => {
  const [activePanel, setActivePanel] = useState('menu');

  useEffect(() => {
    vkBridge.send('VKWebAppInit', {});
  }, []);

  return (
    <PointsProvider>
      <div className="w-full h-full bg-gray-100">
        {activePanel === 'menu' && (
          <Menu
            onStartGame={() => setActivePanel('game')}
            onSpendPoints={() => setActivePanel('spend')}
            onInfo1={() => setActivePanel('info1')}
            onInfo2={() => setActivePanel('info2')}
            onInfo3={() => setActivePanel('info3')}
          />
        )}
        {activePanel === 'game' && <Game onBack={() => setActivePanel('menu')} />}
        {activePanel === 'spend' && <SpendPointsMenu onBack={() => setActivePanel('menu')} />}
        {activePanel === 'info1' && <InfoPage1 onBack={() => setActivePanel('menu')} />}
        {activePanel === 'info2' && <InfoPage2 onBack={() => setActivePanel('menu')} />}
        {activePanel === 'info3' && <InfoPage3 onBack={() => setActivePanel('menu')} />}
      </div>
    </PointsProvider>
  );
};

export default App;