// src/constants/layerButtons.tsx
import React from 'react';
import { Button, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import BaseMap from '@/components/ButtonDynamicPanel/Panels/BaseMap';
import AddLayer from '@/components/ButtonDynamicPanel/Panels/AddLayer';
import Measure from '@/components/ButtonDynamicPanel/Panels/Measure';
import Draw from '@/components/ButtonDynamicPanel/Panels/Draw';
import Locate from '@/components/ButtonDynamicPanel/Panels/Locate';
import ToolBox from '@/components/ButtonDynamicPanel/Panels/ToolBox';
import Print from '@/components/ButtonDynamicPanel/Panels/Print';
import Ai from '@/components/ButtonDynamicPanel/Panels/Ai';
import Icon, {
  EditOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  LineChartOutlined,
  PlusCircleOutlined,
  PrinterOutlined,
  RobotOutlined,
  ToolOutlined,
} from '@ant-design/icons';

export const LAYER_BUTTONS = [
  {
    key: 'baseMap',
    label: '底图切换',
    comment: BaseMap,
    icon: GlobalOutlined,
  },
  {
    key: 'addLayer',
    label: '添加图层',
    comment: AddLayer,
    icon: PlusCircleOutlined,
  },
  {
    key: 'measure',
    label: '测量距离',
    comment: Measure,
    icon: LineChartOutlined,
  },
  {
    key: 'draw',
    label: '绘制图层',
    comment: Draw,
    icon: EditOutlined,
  },
  {
    key: 'locate',
    label: '坐标定位',
    comment: Locate,
    icon: EnvironmentOutlined,
  },
  {
    key: 'toolbox',
    label: '工具箱',
    comment: ToolBox,
    icon: ToolOutlined,
  },
  {
    key: 'print',
    label: '打印出图',
    comment: Print,
    icon: PrinterOutlined,
  },
  {
    key: 'ai',
    label: 'AI交互',
    comment: Ai,
    icon: RobotOutlined,
  },
] as const;

export type LayerButtonKey = typeof LAYER_BUTTONS[number]['key'];

// ✅ 根据 key 获取 label
export function getPanelTitle(key: string | null): string {
  const button = LAYER_BUTTONS.find(btn => btn.key === key);
  return button ? button.label : '未知面板';
}

// ✅ 根据 key 获取组件
export function getPanelCom(key: string | null): React.ComponentType<any> | null {
  const button = LAYER_BUTTONS.find(btn => btn.key === key);
  return button ? button.comment : null;
}

// ✅ 根据 key 获取图标组件
export function getPanelIcon(key: string | null) {
  const button = LAYER_BUTTONS.find(btn => btn.key === key);
  return button ? button.icon : null;
}

// ✅ 新增：渲染面板头部 + 内容的完整组件
export interface PanelRendererProps {
  visiblePanel: string | null;
  setVisiblePanel: (key: string | null) => void;
}

export const PanelRenderer: React.FC<PanelRendererProps> = ({
  visiblePanel,
  setVisiblePanel,
}) => {
  const IconComponent = getPanelIcon(visiblePanel);
  const PanelComponent = getPanelCom(visiblePanel);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '5px 5px',
          borderBottom: '2px solid #a5a1a1ff',
          borderTop: '2px solid #a5a1a1ff',
          fontWeight: 800,
          fontSize: '16px',
        }}
      >
        <Space>
          {IconComponent ? React.createElement(IconComponent) : null}
          {getPanelTitle(visiblePanel)}
        </Space>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => setVisiblePanel(null)}
          aria-label="关闭面板"
          style={{
            padding: '4px',
            minWidth: 'auto',
            height: 'auto',
          }}
        />
      </div>
      {PanelComponent ? React.createElement(PanelComponent) : null}
    </>
  );
};