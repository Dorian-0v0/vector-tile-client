import { useEffect, useState } from 'react'

import '@/App.css'
import ConfigProvider from 'antd/es/config-provider'
import { theme } from 'antd'
import ThemeWrapper from './pages/ThemeWrapper'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    // 获取id为mapcontainer的容器
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      // 给图层添加滤镜
      mapContainer.style.filter = isDarkMode ? 'brightness(0.88) contrast(0.95) grayscale(0) hue-rotate(180deg) opacity(1) saturate(2.5) sepia(0.5) invert(1)' : 'none';
    }
  }, [isDarkMode]);
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          borderRadius: 0, // 👈 关键：全局取消圆角


        },
        components: {
          Splitter: {
            /* 这里是你的组件 token */
            splitBarSize: 5,

          },
        },
      }}
    >
      <BrowserRouter basename="/vector-tile-client"><ThemeWrapper isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} /></BrowserRouter>




    </ConfigProvider>

  )
}

export default App
