import ClientMap from "@/models/ClientMap";
import { useEffect, useState } from "react";
import { Card, theme } from "antd";
import "./index.css";
import React from "react";
import LayerController from "@/components/LayerController";

import { useMapStore } from '@/store/useMapStore';

export default function CheckMap() {
  const { token } = theme.useToken(); // 必须在 ConfigProvider 作用域内调用
  const { updateZoomAndCenterAndMap, getMap } = useMapStore()

  useEffect(() => {
    // debugger
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      // 给图层添加滤镜
      mapContainer.style.filter = token.colorBgElevated == "#ffffff" ? 'none' : 'brightness(0.88) contrast(0.95) grayscale(0) hue-rotate(180deg) opacity(1) saturate(2.5) sepia(0.5) invert(1)';
    }
    const map = getMap('map');
    return () => {
      // 获取view的zoom、center、map属性
      if (map.view.center) {
        updateZoomAndCenterAndMap({
          zoom: map.view.zoom,
          center: [map.view.center.longitude, map.view.center.latitude],
          map: map.view.map
        });
      }
  
    };

  }, []);


  return (
    <div className="map-container-wrapper">
      <Card
        title="图层控制"
        style={{ width: 210, height: "100%", overflowY: "auto" }}
        bodyStyle={{ padding: "12px" }}
        className="layer-panel"
      >
        <LayerController></LayerController>
      </Card>
      {/* 地图容器 */}
      <div id="map"></div>



    </div>
  );
}