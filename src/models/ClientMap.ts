import Map from "@geoscene/core/Map.js";
import MapView from "@geoscene/core/views/MapView.js";
import Extent from "@geoscene/core/geometry/Extent.js";
import WebTileLayer from "@geoscene/core/layers/WebTileLayer.js"; // 引入 WebTileLayer
import GeoJSONLayer from "@geoscene/core/layers/GeoJSONLayer";
import WMSLayer from "@geoscene/core/layers/WMSLayer";
import VectorTileLayer from "@geoscene/core/layers/VectorTileLayer";
import Layer from "@geoscene/core/layers/Layer.js";
import WMTSLayer from "@geoscene/core/layers/WMTSLayer";
import Basemap from '@geoscene/core/Basemap';
import { message } from "antd";
import { getLayerName, setRandomFeatureLayerRenderer } from "@/utils/LayerUtils";
import { useMapStore } from "@/store/useMapStore";
import ScaleBar from "@geoscene/core/widgets/ScaleBar";
import OrientedImageryViewer from "@geoscene/core/widgets/OrientedImageryViewer";


const tiandituVector = Basemap.fromId("tianditu-vector");
tiandituVector.thumbnailUrl = "./public/images/天地图矢量.png";



const tiandituImage = Basemap.fromId("tianditu-image");
tiandituImage.thumbnailUrl = "./public/images/天地图影像.png";

export default class ClientMap {
    public view: null | MapView = null;
    public bbox: number[] = [73.5, 3.8, 135.0, 58.9];
    public spatialReference = { wkid: 4326 };
    public layerList: any = null;

    public wmtsLayer = [
        tiandituVector,
        tiandituImage,
        {
            id: "Arcgis-World-Imagery",
            title: "ArcGIS-影像底图",
            thumbnailUrl: "./public/images/ArcGIS-影像.png",
            baseLayers: [
                new WebTileLayer({
                    urlTemplate: "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
                    copyright: 'ArcGIS-影像底图'
                })
            ]
        },
        {
            baseLayers: [
                new WebTileLayer({
                    urlTemplate: "https://webst0{subDomain}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
                    subDomains: ["0", "1", "2", "3", "4"],
                    copyright: '高德矢量底图(火星坐标系)'
                })
            ],
            title: "高德矢量底图(火星坐标系)",
            id: "gaode-ve-basemap",
            thumbnailUrl: "./public/images/高德地图矢量.png"
        },
        {
            baseLayers: [
                new WebTileLayer({
                    urlTemplate: "https://webst0{subDomain}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}",
                    subDomains: ["0", "1", "2", "3", "4"],
                    copyright: '高德影像底图(火星坐标系)'
                })
            ],
            title: "高德影像底图(火星坐标系)",
            id: "gaode-im-basemap",
            thumbnailUrl: "./public/images/高德地图影像.png"
        },
        {
            baseLayers: [],
            title: "空白底图",
            id: "empty-basemap",
        }
    ];

    public constructor(
        container: string,
        bbox?: number[] | null,
        spatialReference?: any | { wkid: number },
        zoomAndCenterAndMap?: {
            zoom: number;
            center: [number, number];
            map: any;
        }
    ) {
        if (zoomAndCenterAndMap) {
            this.view = new MapView({
                container: container,
                ...zoomAndCenterAndMap
            });
        } else {
            if (bbox) this.bbox = bbox;
            if (spatialReference) this.spatialReference = spatialReference;

            // // 创建 ArcGIS World Imagery 的 WebTileLayer（等效于 WMTS 效果）
            // const imageryLayer = new WebTileLayer({
            //     urlTemplate: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            //     copyright: "ArcGIS World Imagery"
            // });

            const map = new Map({
                basemap: this.wmtsLayer[0] // 作为唯一底图图层
            });

            this.view = new MapView({
                container: container,
                map: map,
                extent: new Extent({
                    xmin: this.bbox[0],
                    ymin: this.bbox[1],
                    xmax: this.bbox[2],
                    ymax: this.bbox[3],
                    spatialReference: this.spatialReference
                })
            });
        }
        console.log("this.view", this.view);
        // 添加比例尺控件
        this.view.ui.add(new ScaleBar({
            view: this.view,
            unit: "dual"
        }), {
            position: "bottom-left"
        });

       

    }


    // 添加图层的方法
    // 修复后的 addLayerByURL 方法
    public async addLayerByURL(url: string, layerType: string, layerName?: string) {
        let layer = null;
        switch (layerType) {
            case 'GeoJSON':
                layer = new GeoJSONLayer({
                    url: url,
                    popupEnabled: true,
                });

                break;
            case 'WMS':
                layer = new WMSLayer({
                    url: url,
                });
                break;
            case 'WMTS':
                layer = new WMTSLayer({
                    url: url,
                });
                break;
            case "矢量瓦片":
                layer = new VectorTileLayer({
                    url: url,
                });
                break; // 添加 break 语句
            case "ArcGIS Rest API":
                debugger
                layer = await Layer.fromGeoSceneServerUrl({
                    url: url,
                });
                break;
            default:
                return;
        }
        debugger
        if (!layer) {
            return;
        }

        // 修复：确保 view 和 map 存在
        if (this.view && this.view.map) {
            this.view.map.add(layer);
            console.log(`${layerType} 图层已添加到地图`, layer);

            layer.when(
                (resLayer) => {
                    setRandomFeatureLayerRenderer(resLayer)
                    debugger
                    resLayer.title = layerName || getLayerName(resLayer) || `无标题${layerType}图层`;
                    resLayer.popupTemplate = {
                        title: resLayer.title,
                        content: [{
                            type: "fields",
                            fieldInfos: (resLayer.fields || []).map(field => ({
                                fieldName: field.name,
                                label: field.name,
                                visible: true
                            }))
                        }]
                    };
                    message.success(`${layerType} 图层加载成功`);
                    this.updateLayerList();
                },
                (error: Error) => {
                    console.error(`${layerType} 图层加载错误:`, error);
                    message.error(`${layerType} 图层加载失败，请检查 URL 或数据格式`);
                }
            );
        } else {
            console.error('地图视图或地图对象未初始化');
            message.error('地图未正确初始化，无法添加图层');
        }
    }


    // 更新图层列表
    public updateLayerList() {
        if (this.view) {
            this.layerList = this.view.map.layers.toArray().reverse();
            useMapStore.getState().updateIsAddNew()
        }
    }

}