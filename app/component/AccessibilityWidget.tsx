'use client';

import { useState } from 'react';
import { useAccessibility } from '../providers/AccessibilityProvider';

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
                <svg fill="#ffffff" width="101px" height="101px" viewBox="-179.2 -179.2 870.40 870.40" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)" stroke-width="0.00512"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><rect x="-179.2" y="-179.2" width="870.40" height="870.40" rx="435.2" fill="#3182ce" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="2.048"></g><g id="SVGRepo_iconCarrier"><path d="M256,112a56,56,0,1,1,56-56A56.06,56.06,0,0,1,256,112Z"></path><path d="M432,112.8l-.45.12h0l-.42.13c-1,.28-2,.58-3,.89-18.61,5.46-108.93,30.92-172.56,30.92-59.13,0-141.28-22-167.56-29.47a73.79,73.79,0,0,0-8-2.58c-19-5-32,14.3-32,31.94,0,17.47,15.7,25.79,31.55,31.76v.28l95.22,29.74c9.73,3.73,12.33,7.54,13.6,10.84,4.13,10.59.83,31.56-.34,38.88l-5.8,45L150.05,477.44q-.15.72-.27,1.47l-.23,1.27h0c-2.32,16.15,9.54,31.82,32,31.82,19.6,0,28.25-13.53,32-31.94h0s28-157.57,42-157.57,42.84,157.57,42.84,157.57h0c3.75,18.41,12.4,31.94,32,31.94,22.52,0,34.38-15.74,32-31.94-.21-1.38-.46-2.74-.76-4.06L329,301.27l-5.79-45c-4.19-26.21-.82-34.87.32-36.9a1.09,1.09,0,0,0,.08-.15c1.08-2,6-6.48,17.48-10.79l89.28-31.21a16.9,16.9,0,0,0,1.62-.52c16-6,32-14.3,32-31.93S451,107.81,432,112.8Z"></path></g></svg>
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