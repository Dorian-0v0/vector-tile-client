// AddLayer.tsx
import React, { useState } from 'react';
import { Input, Button, message, Card, Select, Form } from 'antd';
import { useMapStore } from '@/store/useMapStore';

// 定义表单数据接口
interface LayerFormData {
  urlType: string;
  url: string;
  name?: string;
}

export default function AddLayer() {
  const { clientmap,updateIsAddNew } = useMapStore();
  const [form] = Form.useForm();

  // 用于动态更新 Placeholder，虽然 Form 接管了数据，但为了 UI 提示保留这个 State
  const [currentType, setCurrentType] = useState<string>('矢量瓦片');

  // 表单提交成功的回调
  const onFinish = (values: LayerFormData) => {
    const { url, urlType, name } = values;

    if (!clientmap?.view) {
      message.error('地图未初始化');
      return;
    }


    clientmap.addLayerByURL(url, urlType, name)
    

  };

  return (
    <Card size="small" title="添加图层服务" style={{ width: '100%' }}>
      <Form
        form={form}
        layout="vertical" // 在窄容器中，垂直布局通常比水平布局更清晰
        onFinish={onFinish}
        initialValues={{
          urlType: '矢量瓦片',
        }}
      >
        {/* 服务类型选择 */}
        <Form.Item
          label="URL 服务类型"
          name="urlType"
          rules={[{ required: true, message: '请选择服务类型' }]}
        >
          <Select onChange={(value) => setCurrentType(value)}>
            <Select.Option value="GeoJSON">GeoJSON</Select.Option>
            <Select.Option value="WMS">WMS</Select.Option>
            <Select.Option value="WMTS">WMTS</Select.Option>
            <Select.Option value="ArcGIS Rest API">ArcGIS Rest API</Select.Option>
            <Select.Option value="矢量瓦片">矢量瓦片</Select.Option>
          </Select>
        </Form.Item>

        {/* URL 输入 */}
        <Form.Item
          label="服务 URL"
          name="url"
          rules={[
            { required: true, message: '请输入服务 URL' },
            { type: 'url', warningOnly: true, message: '请输入合法的 URL 格式' } // 可选：URL格式警告
          ]}
        >
          <Input
            placeholder={`请输入 ${currentType} URL 地址`}
            allowClear
          />
        </Form.Item>

        {/* 名称输入 (已修复状态绑定错误的 Bug) */}
        <Form.Item
          label="图层名称"
          name="name"
        >
          <Input
            placeholder={`请输入 ${currentType} 图层名称（可选）`}
            allowClear
          />
        </Form.Item>

        {/* 提交按钮 */}
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" block>
            添加 {currentType} 图层
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
