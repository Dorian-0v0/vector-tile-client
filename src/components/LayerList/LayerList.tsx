import React, { useState, useEffect, useRef } from 'react';
import { useMapStore } from '@/store/useMapStore';
import { Button, List, theme } from 'antd';
import { ProfileOutlined, EyeOutlined, DeleteOutlined, FilterOutlined, FullscreenExitOutlined, ExportOutlined, EyeInvisibleOutlined, TableOutlined } from '@ant-design/icons';
import Legend from '@geoscene/core/widgets/Legend'; // 注意：确认你用的是 @arcgis/core（v4.x+）
import "./LayerList.css"
export default function LayerList() {
    const { clientmap, isAddNew, updateIsAddNew } = useMapStore();
    const [layerList, setLayerList] = useState<any[]>([]);
    const legendInstances = useRef<Map<string, __geoscene.Legend>>(new Map()); // 存储每个图层的 legend 实例
    const { token } = theme.useToken();

    // 同步图层列表
    useEffect(() => {
        if (clientmap?.layerList) {
            setLayerList([...clientmap.layerList]);
        }
    }, [isAddNew]);

    // 清理所有 legend 实例（可选：在组件卸载时）
    // useEffect(() => {
    //     return () => {
    //         legendInstances.current.forEach(legend => {
    //             if (legend.destroy) legend.destroy();
    //         });
    //         legendInstances.current.clear();
    //     };
    // }, []);
    // 移除图层
    const removeLayer = (layer) => {
        clientmap?.view?.map.remove(layer);
        clientmap?.updateLayerList()
    };

    const toggleLegendVisibility = (layer: any) => {
        const legendId = `${layer.id}-legend`;
        const legendElement = document.getElementById(legendId);

        if (!legendElement || !clientmap?.view) return;

        const currentLegend = legendInstances.current.get(layer.id);

        if (legendElement.style.display === 'none') {
            // 首次创建或已销毁：重新创建
            if (!currentLegend || currentLegend.destroyed) {
                const newLegend = new Legend({
                    view: clientmap.view,
                    layerInfos: [{
                        layer: layer,
                        title: null // 不显示图层名
                    }],
                    container: legendId,
                });
                legendInstances.current.set(layer.id, newLegend);
            }
            legendElement.style.display = 'block';
        } else {
            // 隐藏（不销毁，保留实例）
            legendElement.style.display = 'none';
        }
    };

    return (
        <div className='layers-container' style={{
            padding: "0px 5px",
            maxHeight: "100%",
            overflowY: "auto",
            userSelect: "none"
        }}>
            <List
                dataSource={layerList}
                renderItem={(layer) => (
                    <List.Item key={layer.id} style={{ padding: "0px 0px", margin: "2px 0px" }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                fontSize: 11,
                                border: '2px solid #aaa6a6ff',
                                padding: '0px 2px',
                                width: '100%',
                                fontWeight: 'bold'
                            }}
                        >
                            <div style={{ width: '100%' }}>
                                <span>{layer.title}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Button
                                    type="text"
                                    title='查看图例'
                                    icon={<ProfileOutlined />}
                                    onClick={() => toggleLegendVisibility(layer)}
                                />
                                {/* 可扩展：添加图层可见性切换 */}
                                <Button
                                    type="text"
                                    icon={layer.visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                    title='隐藏图层'
                                    onClick={() => {
                                        if (layer) {
                                            layer.visible = !layer.visible;
                                            updateIsAddNew()
                                            // setLayersChange(prev => !prev)
                                        }
                                    }}
                                />
                                {/* 移除图层 */}

                                {/* 查看图层属性 */}
                                <Button
                                    type="text"
                                    icon={<TableOutlined />}
                                    title='图层属性'
                                />
                                {/* 图层要素过滤查询 */}
                                <Button
                                    type="text"
                                    icon={<ExportOutlined />}
                                    title='发布导出'
                                />
                                
                                <Button
                                    type="text"
                                    icon={<FullscreenExitOutlined />}
                                    title='缩放至'
                                    onClick={() => {
                                        if (clientmap?.view) {
                                            clientmap.view.goTo(layer.fullExtent || layer.layers.items[0].fullExtent)
                                        }
                                    }}
                                />
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    title='移除图层'
                                    onClick={() => {
                                        removeLayer(layer)
                                    }}
                                />
                            </div>

                            {/* 图例容器 —— 初始隐藏 */}
                            <div
                                id={`${layer.id}-legend`}
                                style={{
                                    width: '100%',
                                    overflowY: 'auto',
                                    padding: 0,
                                    maxHeight: '140px',
                                    display: 'none', // 初始隐藏
                                    filter: token.colorBgElevated == "#ffffff" ? 'none' : 'brightness(0.88) contrast(0.95) grayscale(0) hue-rotate(180deg) opacity(1) saturate(2.5) sepia(0.5) invert(1)',
                                }}
                            ></div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
}