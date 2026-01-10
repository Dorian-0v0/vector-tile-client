import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, theme } from 'antd'
import React, { useEffect } from 'react'
import BasemapGallery from '@geoscene/core/widgets/BasemapGallery'
import { useMapStore } from '@/store/useMapStore'
import './index.css'
export default function BaseMap() {
  const { token } = theme.useToken();
  const { clientmap } = useMapStore();
  useEffect(() => {
    const basemapGallery = new BasemapGallery({
      container: 'basemapGalleryContainer',
      view: clientmap?.view,
      // source: [Basemap.fromId("tianditu-vector"), Basemap.fromId("tianditu-image")]
      source: clientmap?.wmtsLayer
    });
  }, [])
  return (
    <div>
      <div
        id="basemapGalleryContainer"
        style={{
          width: '100%',

          outline: 'none',
          filter: token.colorBgElevated == "#ffffff" ? 'none' : 'brightness(0.88) contrast(0.95) grayscale(0) hue-rotate(180deg) opacity(1) saturate(2.5) sepia(0.5) invert(1)',

        }}
      />
      {/* <hr />
      <Button type="link" style={{ padding: '0', color: '#1890ff', fontSize: '12px' }}>
        <PlusOutlined /> 添加自定义底图
      </Button>
      <br />
      <Button type="link" style={{ padding: '0', color: '#1890ff', fontSize: '12px' }}>
        <InfoCircleOutlined /> 底图信息
      </Button> */}
    </div >
  )
}
