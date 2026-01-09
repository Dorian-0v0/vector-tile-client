// LayerList1.tsx
import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { DragOutlined } from '@ant-design/icons';

import { useMapStore } from '@/store/useMapStore';
import Legend from '@geoscene/core/widgets/Legend';
import { SortableLayerItem } from './testdnd3';
import { theme } from 'antd';

// 工具函数：移动数组元素
const arrayMove = <T,>(arr: T[], from: number, to: number): T[] => {
  const newArr = [...arr];
  const [item] = newArr.splice(from, 1);
  newArr.splice(to, 0, item);
  return newArr;
};

interface Layer {
  id: string;
  title: string;
  visible: boolean;
  fullExtent?: __geoscene.Extent;
  layers?: { items?: { fullExtent?: __geoscene.Extent }[] };
}

export function LayerList1() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { clientmap, updateIsAddNew, isAddNew } = useMapStore();
  const [layerList, setLayerList] = useState<Layer[]>([]);
  const legendInstances = useRef<Map<string, __geoscene.Legend>>(new Map());
  const { token } = theme.useToken();
  // 同步图层列表
  useLayoutEffect(() => {
    if (clientmap?.layerList) {
      setLayerList([...clientmap.layerList]);
    }
  }, [isAddNew]);

  // 清理 Legend 实例（可选：在组件卸载时）
  useEffect(() => {
    return () => {
      legendInstances.current.forEach((legend) => {
        if (!legend.destroyed) legend.destroy();
      });
    };
  }, []);

  const activeLayer = layerList.find((layer) => layer.id === activeId);

  const handleDragStart = (event: any) => {
    console.log("event.active.id", event);

    setActiveId(event.active.id);
  };


  const handleDragEnd = (event: any) => {
    console.log("event.handleDragEnd", event);
    const { active, over } = event;


    const newIndex = layerList.findIndex((layer) => layer.id === over.id);
    const oldIndex = layerList.findIndex((layer) => layer.id === active.id);
    // console.log("oldIndex, newIndex", oldIndex, newIndex, over);
    const removeLayer = layerList[oldIndex]

    // console.log("layerList", layerList);

    // const newLayerList = arrayMove(layerList, oldIndex, newIndex);
    // console.log("newLayerList", newLayerList);

    // setLayerList(newLayerList);
    const res = clientmap?.view.map.reorder(removeLayer, layerList.length - newIndex - 1);
    // console.log("res", res);
    clientmap?.updateLayerList();


    setActiveId(null);
  };

  const toggleVisible = useCallback((layer: Layer) => {
    layer.visible = !layer.visible;
    updateIsAddNew(); // 触发重绘
  }, [updateIsAddNew]);

  const remove = useCallback((layer: Layer) => {
    if (clientmap?.view?.map) {
      clientmap.view.map.remove(layer);
      // 重新获取图层列表（或直接过滤）
      if (typeof clientmap.updateLayerList === 'function') {
        clientmap.updateLayerList();
      }
    }
  }, [clientmap]);

  const viewLegend = useCallback((layer: Layer) => {
    const legendId = `${layer.id}-legend`;
    const legendElement = document.getElementById(legendId);
    if (!legendElement || !clientmap?.view) return;

    const currentLegend = legendInstances.current.get(layer.id);

    if (legendElement.style.display === 'none') {
      if (!currentLegend || currentLegend.destroyed) {
        const newLegend = new Legend({
          view: clientmap.view,
          layerInfos: [{ layer, title: null }],
          container: legendId,
        });
        legendInstances.current.set(layer.id, newLegend);
      }
      legendElement.style.display = 'block';
    } else {
      legendElement.style.display = 'none';
    }
  }, [clientmap?.view]);

  const zoomTo = useCallback((layer: Layer) => {
    if (!clientmap?.view) return;
    const extent = layer.fullExtent || layer.layers?.items?.[0]?.fullExtent;
    if (extent) {
      clientmap.view.goTo(extent);
    }
  }, [clientmap?.view]);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div style={{ width: '100%', padding: '6px' }}>
        {layerList.map((layer) => (
          <SortableLayerItem
            key={layer.id}
            layer={layer}
            onToggleVisible={toggleVisible}
            remove={remove}
            zoomTo={zoomTo}
            publishExport={() => { }}
            viewLegend={viewLegend}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeLayer ? (
          <div
            style={{
              padding: '8px 12px',
              background: token.colorBorderBg,
              border: '2px dashed #1890ff',
              // borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              fontSize: 14,
            }}
          >
            <DragOutlined style={{ marginRight: 8 }} />
            {activeLayer.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}   