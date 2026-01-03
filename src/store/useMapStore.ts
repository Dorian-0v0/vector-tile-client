// src/store/useCounterStore.ts
import ClientMap from '@/models/ClientMap';
import MapView from '@geoscene/core/views/MapView';
import { create } from 'zustand';

interface MapState {
    zoomAndCenterAndMap: {
        zoom: number;
        center: [number, number];
        map: any;
    } | null;
    updateZoomAndCenterAndMap: (mapAndView: {
        zoom: number;
        center: [number, number];
        map: any;
    } | null) => void;
    getMap: (container: string) => ClientMap | null;
    reset: () => void;
}

export const useMapStore = create<MapState>((set, get) => ({
    zoomAndCenterAndMap: null,
    updateZoomAndCenterAndMap: (mapAndView) => set(() => ({ zoomAndCenterAndMap: mapAndView })),
    getMap: (container) => {
        const state = get();
        // 注意：这里假设ClientMap返回MapView实例，如果ClientMap本身就是MapView则直接返回
        return new ClientMap(container, null, null, state.zoomAndCenterAndMap);
    },
    reset: () => set(() => ({ zoomAndCenterAndMap: null })),
}));