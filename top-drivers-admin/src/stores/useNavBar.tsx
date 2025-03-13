import { create } from "zustand"

interface NavBarState {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
}

export const useNavBar = create<NavBarState>((set) => ({
    isOpen: false,
    open: () => {
        set({ isOpen: true })
    },
    close: () => {
        set({ isOpen: false })
    },
    toggle: () => {
        set((state) => ({ isOpen: !state.isOpen }))
    }
}))