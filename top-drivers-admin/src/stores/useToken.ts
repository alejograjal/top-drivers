import { create } from "zustand"

interface TokenState {
    token: string | null
    refreshToken: string | null
    setToken: (
        token: string,
    ) => void
    setRefreshToken: (
        refreshToken: string,
    ) => void
    setTokens: (
        token: string,
        refreshToken: string,
    ) => void
    resetTokens: () => void
}

export const useToken = create<TokenState>((set) => ({
    token: null,
    refreshToken: null,
    setToken: (
        token
    ) => {
        set({ token })
    },
    setRefreshToken: (
        refreshToken
    ) => {
        set({ refreshToken })
    },
    setTokens: (
        token,
        refreshToken
    ) => {
        set({ token, refreshToken })
    },
    resetTokens: () => {
        set({ token: null, refreshToken: null })
    }
}))