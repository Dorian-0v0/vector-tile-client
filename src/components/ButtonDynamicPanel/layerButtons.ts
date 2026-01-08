// src/constants/layerButtons.ts
import BaseMap from '@/components/ButtonDynamicPanel/Panels/BaseMap';
import AddLayer from '@/components/ButtonDynamicPanel/Panels/AddLayer';
import Measure from '@/components/ButtonDynamicPanel/Panels/Measure';
import Draw from '@/components/ButtonDynamicPanel/Panels/Draw';
import Locate from '@/components/ButtonDynamicPanel/Panels/Locate';
import ToolBox from '@/components/ButtonDynamicPanel/Panels/ToolBox';
import Print from '@/components/ButtonDynamicPanel/Panels/Print';
import Ai from '@/components/ButtonDynamicPanel/Panels/Ai';
import Icon, { EditOutlined, EnvironmentOutlined, GlobalOutlined, LineChartOutlined, PlusCircleOutlined, PrinterOutlined, RobotOutlined, ToolOutlined } from '@ant-design/icons';

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

// ✅ 新增：根据 key 获取 label 的函数
export function getPanelTitle(key: string | null): string {
  const button = LAYER_BUTTONS.find(btn => btn.key === key);
  // debugger
  return button ? button.label : '未知面板';
}

// ✅ 修复：添加完整的函数实现和返回类型
export function getPanelCom(key: string | null): React.ComponentType<any> | null {
  debugger
  const button = LAYER_BUTTONS.find(btn => btn.key === key);
  return button ? button.comment : null;
}

// 获取图标
export function getPanelIcon(key: string | null) {
  const button = LAYER_BUTTONS.find(btn => btn.key === key);
  return button ? button.icon : null;
}