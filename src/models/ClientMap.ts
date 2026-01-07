import Map from "@geoscene/core/Map.js";
import MapView from "@geoscene/core/views/MapView.js";
import Extent from "@geoscene/core/geometry/Extent.js";
import WebTileLayer from "@geoscene/core/layers/WebTileLayer.js"; // 引入 WebTileLayer

export default class ClientMap {
    public view: null | MapView = null;
    public bbox: number[] = [73.5, 3.8, 135.0, 58.9];
    public spatialReference = { wkid: 4326 };

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

            // 创建 ArcGIS World Imagery 的 WebTileLayer（等效于 WMTS 效果）
            const imageryLayer = new WebTileLayer({
                urlTemplate: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                copyright: "ArcGIS World Imagery"
            });

            const map = new Map({
                layers: [imageryLayer] // 作为唯一底图图层
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
    }
}