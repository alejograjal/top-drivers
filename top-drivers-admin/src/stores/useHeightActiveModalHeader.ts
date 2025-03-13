import { create } from "zustand"

interface HeightActiveModalHeaderState {
    height: number,
    setHeight: (height: number) => void
}

export const useHeightActiveModalHeader = create<HeightActiveModalHeaderState>(
    (set) => ({
        height: 0,
        setHeight: (height: number) => {
            set({ height });
        }
    })
)