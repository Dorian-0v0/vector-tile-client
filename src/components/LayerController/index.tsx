import { Button, Space } from 'antd';
import React from 'react';
import { LAYER_BUTTONS } from '@/components/ButtonDynamicPanel/layerButtons';
export interface LayerControllerProps {
  onToggle: (key: string) => void;
}

export default function LayerController({ onToggle }: LayerControllerProps) {
 

  return (
    <div style={{ padding: '6px', overflowY: 'auto' }}>
     {LAYER_BUTTONS.map(btn => {
        const IconComponent = btn.icon; // icon 是 React 组件
        return (
          <Button
            key={btn.key}
            type="default"
            // shape="circle" // 圆形按钮更适配图标
            icon={<IconComponent />}
            onClick={() => onToggle(btn.key)}
            style={{ height: '35px', width: '35px', margin: '1px' }} // 固定尺寸，保证整齐
          />
        );
      })}
    </div>
  );
}   