import { useEffect, useState } from "react";
import { Button, Space, Splitter, theme, } from "antd";
import "./index.css";
import React from "react";
import LayerController from "@/components/LayerController";
import { useMapStore } from '@/store/useMapStore';

import { CloseOutlined } from "@ant-design/icons";
import { getPanelTitle, getPanelCom, getPanelIcon, PanelRenderer } from "@/components/ButtonDynamicPanel/layerButtons";
import LayerList from "@/components/LayerList/LayerList";

export default function CheckMap() {
  const { token } = theme.useToken(); // 必须在 ConfigProvider 作用域内调用
  const { updateZoomAndCenterAndMap, getMap } = useMapStore()
  const [visiblePanel, setVisiblePanel] = useState<string | null>(null);

  // 创建适配函数
  const handleToggle = (key: string) => {
    setVisiblePanel(key);
  };

  useEffect(() => {
    // debugger
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      // 给图层添加滤镜
      mapContainer.style.filter = token.colorBgElevated == "#ffffff" ? 'none' : 'brightness(0.88) contrast(0.95) grayscale(0) hue-rotate(180deg) opacity(1) saturate(2.5) sepia(0.5) invert(1)';
    }
    const map = getMap('map');
    map?.updateLayerList()  
    return () => {
      // 获取view的zoom、center、map属性
      if (map?.view?.center) {
        updateZoomAndCenterAndMap({
          zoom: map.view.zoom,
          center: [map.view.center.longitude as number, map.view.center.latitude as number],
          map: map.view.map
        });
      }
    };

  }, []);


  return (
    <Splitter style={{ height: 'calc(100vh - 64px)' }} draggerIcon>
      {/* 左侧面板 */}
      <Splitter.Panel defaultSize="15%" min="10%" max="27%" >
        <LayerList></LayerList>
      </Splitter.Panel>
      {/* 右侧面板：嵌套垂直分割器 */}
      <Splitter.Panel>
        <Splitter
          orientation="vertical"
        >
          {/* 上：地图 */}
          <Splitter.Panel
            defaultSize="70%"
            min="30%" // 防止地图被缩得太小
          >
            <div id="map" />
          </Splitter.Panel>
          {/* 下：属性表（可隐藏） */}
          <Splitter.Panel
            defaultSize="30%"
            min="100px" // 至少保留 100px 高度用于显示"展开"提示或标题
            max='45%'
            collapsible={true}
          >
            属性表
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>

      <Splitter.Panel
        defaultSize="15%"
        min="14%"
        max="26%"
      >
        <LayerController onToggle={handleToggle} />
        {/* Panel Header */}
        {visiblePanel && (
          <PanelRenderer
            visiblePanel={visiblePanel}
            setVisiblePanel={setVisiblePanel}
          />)}
      </Splitter.Panel>

    </Splitter>
  );
}