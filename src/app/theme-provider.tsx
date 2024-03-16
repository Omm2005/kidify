"use client"

import * as React from "react"
import { Toaster } from "sonner"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>
    <Toaster richColors closeButton theme="system" position="top-center" />
    {children}
    </NextThemesProvider>
}
