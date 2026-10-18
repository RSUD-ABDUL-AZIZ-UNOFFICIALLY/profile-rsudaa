'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type AccessibilityState = {
    highContrast: boolean;
    largeText: boolean;
    dyslexiaFont: boolean;
    highlightLinks: boolean;
};

type AccessibilityContextType = {
    settings: AccessibilityState;
    toggleSetting: (key: keyof AccessibilityState) => void;
    resetSettings: () => void;
};

const defaultSettings: AccessibilityState = {
    highContrast: false,
    largeText: false,
    dyslexiaFont: false,
    highlightLinks: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<AccessibilityState>(defaultSettings);
    const [mounted, setMounted] = useState(false);

    // Load dari localStorage saat pertama kali mount
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('a11y-settings');
        if (saved) {
            setSettings(JSON.parse(saved));
        }
    }, []);

    // Sync state ke localStorage & manipulasi class di <html> tag
    useEffect(() => {
        if (!mounted) return;

        localStorage.setItem('a11y-settings', JSON.stringify(settings));

        const html = document.documentElement;

        settings.highContrast ? html.classList.add('a11y-high-contrast') : html.classList.remove('a11y-high-contrast');
        settings.largeText ? html.classList.add('a11y-large-text') : html.classList.remove('a11y-large-text');
        settings.dyslexiaFont ? html.classList.add('a11y-dyslexia-font') : html.classList.remove('a11y-dyslexia-font');
        settings.highlightLinks ? html.classList.add('a11y-highlight-links') : html.classList.remove('a11y-highlight-links');
    }, [settings, mounted]);

    const toggleSetting = (key: keyof AccessibilityState) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const resetSettings = () => setSettings(defaultSettings);

    return (
        <AccessibilityContext.Provider value={{ settings, toggleSetting, resetSettings }}>
            {children}
        </AccessibilityContext.Provider>
    );
}

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
    return context;
};