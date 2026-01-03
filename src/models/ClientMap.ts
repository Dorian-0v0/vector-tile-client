import Map from "@geoscene/core/Map.js";
import MapView from "@geoscene/core/views/MapView.js"
import Extent from "@geoscene/core/geometry/Extent.js";
export default class ClientMap {
    // 视图view
    public view: null | MapView = null;
    // bbox
    public bbox: number[] = [73.5, 3.8, 135.0, 58.9];
    // 底图
    public baseMap: string | any = "tianditu-vector";
    // 坐标系
    public spatialReference: {
        wkid: number;
    } = { wkid: 4326 };



    // 初始化ArcGIS地图
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
            if (bbox) {
                this.bbox = bbox;
            }
            if (spatialReference) {
                this.spatialReference = spatialReference;
            }

            this.view = new MapView({
                container: container,
                map: new Map({
                    basemap: this.baseMap,
                }),
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