import { useState } from "react";
import { LayerList1 } from "./testdnd2";
import React from "react";


const TestDnd1: React.FC = () => {
  const [layers, setLayers] = useState<any[]>([
    { id: '1', title: '道路', visible: true, locked: false },
    { id: '2', title: '建筑物', visible: true, locked: true },
    { id: '3', title: '水系', visible: false, locked: false },
  ]);

  const handleReorder = (newLayers: any[]) => {
    setLayers(newLayers);
    // 同步到地图引擎（如 ArcGIS JS API）
  };

  const toggleVisible = (id: string) => {
    setLayers(layers.map(l => 
      l.id === id ? { ...l, visible: !l.visible } : l
    ));
  };



  return (
    <LayerList1
      layers={layers}
      onReorder={handleReorder}
      onToggleVisible={toggleVisible}
      onSelect={(id) => console.log('选中图层:', id)}
    />
  );
};

export default TestDnd1;