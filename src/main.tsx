
import { createRoot } from 'react-dom/client'

import App from './App'
// 引入geoscene样式
import '@geoscene/core/assets/geoscene/themes/light/main.css';
import React, { StrictMode } from 'react';
import { ClickToComponent } from 'click-to-react-component';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClickToComponent editor="vscode" />
    <App />
  </StrictMode>,
)
