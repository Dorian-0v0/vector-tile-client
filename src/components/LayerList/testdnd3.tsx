import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DragOutlined,
  ProfileOutlined,
  FullscreenExitOutlined,
  DeleteOutlined,
  TableOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Button, theme } from 'antd';

interface SortableLayerItemProps {
  layer: {
    id: string;
    title: string;
    visible: boolean;
  };
  onToggleVisible: (layer: any) => void;
  remove: (layer: any) => void;
  zoomTo: (layer: any) => void;
  publishExport?: (layer: any) => void;
  viewLegend: (layer: any) => void;
}

export function SortableLayerItem({
  layer,
  onToggleVisible,
  remove,
  zoomTo,
  viewLegend,
}: SortableLayerItemProps) {
  const { token } = theme.useToken();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: layer.id });



  return (
    <div ref={setNodeRef} {...attributes}>
      {/* 主容器：带边框和背景 */}
      <div
        style={{
          border: `2px solid ${token.colorBorder}`,
          background: token.colorBgContainer,
        }}
      >
        {/* 第一行：图层标题 + 拖拽手柄 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'grab',
            margin: '5px 5px',
          }}
          {...listeners} // 整个标题区域可拖拽
        >
          {/* <DragOutlined
            style={{
              margin: 6,
              color: token.colorTextSecondary,
              fontSize: 14,
            }}
          /> */}
          <span
            style={{
              fontWeight: 'bold',
              fontSize: 13,
            }}
          >
            {layer.title}
          </span>
        </div>

        {/* 第二行：操作按钮 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            size="small"
            type="text"
            icon={layer.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={(e) => {
              e.stopPropagation(); // 防止触发拖拽
              onToggleVisible(layer);
            }}
            title={layer.visible ? '隐藏图层' : '显示图层'}
          />
          <Button
            size="small"
            type="text"
            icon={<ProfileOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              viewLegend(layer);
            }}
            title="查看图例"
          />
          <Button
            size="small"
            type="text"
            icon={<FullscreenExitOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              zoomTo(layer);
            }}
            title="缩放至图层范围"
          />
          <Button
            size="small"
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              remove(layer);
            }}
            title="移除图层"
          />
          <Button
           size="small"
            type="text"
            icon={<TableOutlined />}
            title='图层属性'
          />
          {/* 图层要素过滤查询 */}
          <Button
           size="small"
            type="text"
            icon={<ExportOutlined />}
            title='发布导出'
          />
        </div>
        {/* 图例容器 —— 初始隐藏 */}
        <div
          id={`${layer.id}-legend`}
          style={{
            width: '100%',
            maxHeight: '140px',
            overflowY: 'auto',
            padding: '4px 0',
            display: 'none',
            marginTop: '4px',
            filter:
              token.colorBgElevated === '#ffffff'
                ? 'none'
                : 'brightness(0.88) contrast(0.95) grayscale(0) hue-rotate(180deg) opacity(1) saturate(2.5) sepia(0.5) invert(1)',
          }}
        ></div>
      </div>


    </div>
  );
}