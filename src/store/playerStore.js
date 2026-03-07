import { create } from "zustand";

// Podemos utilizar zustand para cuando necesitemos manejar estados globales
// Creamos un store para manejar el estado del reproductor de música
export const usePlayerStore = create((set) => ({
    isPlaying: false,
    currentMusic: { playlist: null, song: null, songs: [] },
    volume: 1,
    setVolume: (volume) => set({ volume }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setCurrentMusic: (currentMusic) => set({ currentMusic }),

}));
