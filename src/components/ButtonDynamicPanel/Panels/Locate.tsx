import { useMapStore } from '@/store/useMapStore';
import Point from '@geoscene/core/geometry/Point'; // 补充 Point 的导入
import React, { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Space,
  message,
} from 'antd';
import {
  EnvironmentOutlined,
  DeleteOutlined,
} from '@ant-design/icons';


export default function Locate() {
  const { clientmap } = useMapStore();

  const [longitude, setLongitude] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');


  const handleLocate = () => {

    const lng = parseFloat(longitude);
    const lat = parseFloat(latitude);

    if (isNaN(lng) || isNaN(lat)) {
      message.error('请输入有效的经纬度数值');
      return;
    }

    if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
      message.error('经纬度超出有效范围：经度 [-180,180]，纬度 [-90,90]');
      return;
    }
    const view = clientmap?.view;

    if (!view) {
      message.warning('地图视图未初始化');
      return;
    }



    // 清除已有图形与弹窗
    view.graphics.removeAll();
    view.closePopup();


    // 创建点
    const point = new Point({
      x: parseFloat(longitude),
      y: parseFloat(latitude),
    });

    // 添加标记图形
    view.graphics.add({
      geometry: point,
      symbol: {
        type: 'simple-marker',
        color: [226, 119, 40],
        outline: { color: [255, 255, 255], width: 1 }
      }
    });

    // 打开结构化弹窗
    view.openPopup({
      title: '定位点',
      content: `
        <table style="width:100%; border-collapse: collapse; font-size:14px;">
          <tr>
            <td style="border:1px solid #ddd; padding:8px;">经度 (X)</td>
            <td style="border:1px solid #ddd; padding:8px;">${lng.toFixed(6)}</td>
          </tr>
          <tr>
            <td style="border:1px solid #ddd; padding:8px;">纬度 (Y)</td>
            <td style="border:1px solid #ddd; padding:8px;">${lat.toFixed(6)}</td>
          </tr>
        </table>
      `,
      location: point,
    });

    // 地图跳转
    view.goTo({
      target: point,
      zoom: 7
    });
  };

  const handleClear = () => {
    const view = clientmap?.view;
    setLongitude('');
    setLatitude('');
    // 这里可以添加清除地图上点和弹窗
    view?.graphics.removeAll();
    // 去除弹窗
    view?.popup?.close();
  };

  return (
    <Card
      size="small"
      style={{ width: '100%' }}
    >
      <div style={{ marginBottom: 12 }}>
        <label>经度 (Lng):</label>
        <Input
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="例如：116.4074"
          style={{ marginTop: 4 }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>纬度 (Lat):</label>
        <Input
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="例如：39.9042"
          style={{ marginTop: 4 }}
        />
      </div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button
          type="primary"
          icon={<EnvironmentOutlined />}
          block
          onClick={handleLocate}
        >
          定位到坐标
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          block
          onClick={handleClear}
        >
          清除定位
        </Button>
      </Space>
    </Card>
  );
}