import { Button, Layout, Menu, Switch, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";
import CheckMap from "../CheckMap";
import RegistryDatabase from "@/pages/RegistryDatabase";
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './index.css'
import About from "@/pages/About";
// 子组件必须包裹在 ConfigProvider 内才能使用 useToken
const ThemeWrapper: React.FC<{
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isDarkMode, setIsDarkMode }) => {
  const { token } = theme.useToken(); // 必须在 ConfigProvider 作用域内调用

  const menuItems = [
    {
      key: '/db',
      label: <NavLink to="/db">当前数据库</NavLink>,
    },
    {
      key: '/registry',
      label: <NavLink to="/registry">切换数据库</NavLink>,
    },
    {
      key: '/layer',
      label: <NavLink to="/layer">瓦片预览</NavLink>,
    },
    {
      key: '/about',
      label: <NavLink to="/about">关于我们</NavLink>,
    },
  ];


  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: token.colorBgElevated,
          height: '64px', // 略微降低高度（可选）
          padding: '0 16px', // 减少左右留白
        }}
      >
        {/* 左侧 Logo */}
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>LOGO</div>
        <div style={{ fontSize: '16px', fontWeight: 'bold', width: '8vw', marginLeft: '2vw' }}>layername</div>

        {/* 中间导航菜单 —— 更紧凑 */}
        <Menu
          mode="horizontal"
          items={menuItems}
          style={{
            flex: 1,
            minWidth: 0,
            margin: '0 12px', // 缩小左右间隙
            backgroundColor: 'transparent',
            borderBottom: 'none',
          }}
          selectedKeys={[]}
          className="compact-menu" // 用于自定义样式
        />


        {/* 右侧主题切换 —— 使用小尺寸 */}
        <Switch
          size="small"
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
      </Header>

      <Content style={{ padding: '0', background: token.colorBgContainer, margin: '0' }}>
        {/* 显示路由组件 */}
        <Routes>
          <Route path="/db" element={<RegistryDatabase />} />
          <Route path="/registry" element={<RegistryDatabase />} />
          <Route path="/layer" element={<CheckMap />} />
          <Route path="/about" element={<About/>} />
          {/* 默认重定向 */}
          <Route path="/" element={<Navigate to="vector-tile-client/db" replace />} />
        </Routes>

      </Content>


    </Layout>
  );
};

export default ThemeWrapper;