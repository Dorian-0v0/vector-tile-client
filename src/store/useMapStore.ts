// src/store/useCounterStore.ts
import ClientMap from '@/models/ClientMap';

import { create } from 'zustand';

interface MapState {
    clientmap: ClientMap | null;
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
    clientmap: null,
    zoomAndCenterAndMap: null,
    updateZoomAndCenterAndMap: (mapAndView) => set(() => ({ zoomAndCenterAndMap: mapAndView })),
    getMap: (container) => {
        const state = get();
        // 注意：这里假设ClientMap返回MapView实例，如果ClientMap本身就是MapView则直接返回
        state.clientmap = new ClientMap(container, null, null, state.zoomAndCenterAndMap);
        return state.clientmap;
    },
    reset: () => set(() => ({ zoomAndCenterAndMap: null })),
}));