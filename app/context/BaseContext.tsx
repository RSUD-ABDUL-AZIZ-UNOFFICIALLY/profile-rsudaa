'use client'

import React, { createContext, useContext, useEffect, useState } from "react";

export const BaseContext: any | null = createContext(null)

export const BaseProvider = ({ children }: { children: any }) => {
    const color = {
        primary: '#2e997d',
        dark: '#002722',
        midDark: '#002722',
        secondary: '#aacd71',
        info: '#d9f8f3',
        white: '#ffffff',
        black: '#101110',
    }

    return (
        <BaseContext.Provider value={{ color }} >
            {children}
        </BaseContext.Provider>
    )
}

