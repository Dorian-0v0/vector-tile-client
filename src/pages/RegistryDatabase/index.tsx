import React, { FC } from 'react';
import { Form, Input, Button, Card, Space } from 'antd';
import { LockOutlined, UserOutlined, DatabaseOutlined, GlobalOutlined, AppstoreOutlined, KeyOutlined } from '@ant-design/icons';

const RegistryDatabase: FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('提交的数据库连接信息:', values);
    // 此处可调用后端 API 进行连接测试或保存
  };

  return (
    <Card title="连接 PostgreSQL 数据库" style={{ maxWidth: 500, margin: 'auto', padding: 0
    }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          port: '5432', // PostgreSQL 默认端口
        }}
      >
        <Form.Item
        style={{
          marginTop: '-1vh' 
        }}
          name="host"
          label="主机地址 (IP 或域名)"
          rules={[{ required: true, message: '请输入主机地址' }]}
        >
          <Input prefix={<GlobalOutlined />} placeholder="例如：127.0.0.1 或 example.com" />
        </Form.Item>

        <Form.Item
         style={{
          marginTop: '-1vh' 
        }}
          name="port"
          label="端口"
          rules={[
            { required: true, message: '请输入端口号' },
            { pattern: /^\d+$/, message: '端口必须为数字' },
          ]}
        >
          <Input placeholder="默认为 5432" />
        </Form.Item>

        <Form.Item
         style={{
          marginTop: '-1vh' 
        }}
          name="database"
          label="数据库名称"
          rules={[{ required: true, message: '请输入数据库名称' }]}
        >
          <Input prefix={<DatabaseOutlined />} placeholder="例如：mydb" />
        </Form.Item>

        <Form.Item
         style={{
          marginTop: '-1vh' 
        }}
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="例如：postgres" />
        </Form.Item>

        <Form.Item
         style={{
          marginTop: '-1vh' 
        }}
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="输入密码" />
        </Form.Item>

        <Form.Item
         style={{
          marginTop: '-1vh' 
        }}
          name="schema"
          label="架构 (Schema)"
          tooltip="可选，留空则使用默认 schema"
        >
          <Input prefix={<AppstoreOutlined />} placeholder="例如：public" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" icon={<KeyOutlined />}>
              测试连接
            </Button>
            <Button htmlType="reset">重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegistryDatabase;  