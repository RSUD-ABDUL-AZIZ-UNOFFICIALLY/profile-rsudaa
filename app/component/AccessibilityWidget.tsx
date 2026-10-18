'use client';

import { useState } from 'react';
import { useAccessibility } from '../providers/AccessibilityProvider';
import Image from 'next/image';
import AccessibilityIcon from '../../public/accessibility.svg';

export default function AccessibilityWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { settings, toggleSetting, resetSettings } = useAccessibility();

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Menu Panel */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-64 bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-all">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Accessibility</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500">&times;</button>
                    </div>

                    <div className="space-y-3">
                        <ToggleItem
                            label="High Contrast"
                            isActive={settings.highContrast}
                            onClick={() => toggleSetting('highContrast')}
                        />
                        <ToggleItem
                            label="Bigger Text"
                            isActive={settings.largeText}
                            onClick={() => toggleSetting('largeText')}
                        />
                        <ToggleItem
                            label="Dyslexia Font"
                            isActive={settings.dyslexiaFont}
                            onClick={() => toggleSetting('dyslexiaFont')}
                        />
                        <ToggleItem
                            label="Highlight Links"
                            isActive={settings.highlightLinks}
                            onClick={() => toggleSetting('highlightLinks')}
                        />
                    </div>

                    <button
                        onClick={resetSettings}
                        className="mt-4 w-full py-2 bg-red-100 text-red-600 rounded-md font-medium hover:bg-red-200 transition"
                    >
                        Reset Settings
                    </button>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105"
                aria-label="Open Accessibility Menu"
            >
                <Image alt='logo' src={AccessibilityIcon} className='h-14 w-fit' />

            </button>
        </div>
    );
}

// Sub-komponen kecil untuk layout tombol toggle
function ToggleItem({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex justify-between items-center p-2 rounded-md border transition-colors ${isActive ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                }`}
        >
            <span>{label}</span>
            <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-300'}`} />
        </button>
    );
}