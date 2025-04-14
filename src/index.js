import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import vkBridge from '@vkontakte/vk-bridge';

// Инициализация VK Bridge
vkBridge.send('VKWebAppInit', {});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);