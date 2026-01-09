import Layer from "@geoscene/core/layers/Layer";
import { SimpleFillSymbol, SimpleLineSymbol } from '@geoscene/core/symbols.js';
import SimpleRenderer from "@geoscene/core/renderers/SimpleRenderer.js";
export function getRandomBrightColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return [r, g, b, 0.8]; // RGB数组，带透明度
}


export async function setRandomFeatureLayerRenderer(layer :Layer) {
    try {
        await layer.load();
        const randomColor = getRandomBrightColor();
        if (layer.geometryType == "point") {
            layer.renderer = {
                type: "simple",
                symbol: {
                    type: "simple-marker",
                    color: randomColor,
                    size: "11px",
                }
            };
        }
        if (layer.geometryType == "polygon") {
            layer.renderer = new SimpleRenderer({
                symbol: new SimpleFillSymbol({
                    color: randomColor,
                    outline: new SimpleLineSymbol({
                        color: [50, 50, 50],
                        width: 1
                    })
                })
            });
        }
        if (layer.geometryType == "polyline") {
            layer.renderer = new SimpleRenderer({
                symbol: new SimpleLineSymbol({
                    color: randomColor,
                    width: 3
                })
            });
        }
    } catch (error) {
        console.error("设置随机颜色失败", error);
    }
}