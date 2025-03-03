import { create } from "zustand"

export interface SnackbarState {
    setOpen: (key: string) => void
    setActiveTab: (path: string) => void
    activeTab: string | null
}

export const useSideNavCollapseStore = create<SnackbarState>((set, get) => ({
    setOpen: (key) => {
        const state = get();
        const isActiveTab = state.activeTab?.startsWith(key);

        const newState = {
            [key]:
                !state[
                    key as keyof Omit<SnackbarState, 'setOpen' | 'setActiveTab' | 'activeTab'>
                ] || isActiveTab
        }

        set(newState);
    },
    setActiveTab: (path) => {
        const newState = {
            activeTab: path
        }

        set(newState);
    },
    activeTab: null,
}))