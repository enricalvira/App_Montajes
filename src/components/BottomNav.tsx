import React from 'react';
import { FormenteraSection, MainTab } from '../types';

interface BottomNavProps {
  currentMainTab: MainTab;
  onSelectMainTab: (tab: MainTab) => void;
  selectedEvent: string | null;
  formenteraSection?: FormenteraSection;
  onSelectFormenteraSection?: (section: FormenteraSection) => void;
  onExitEvent?: () => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentMainTab,
  onSelectMainTab,
  selectedEvent,
  formenteraSection = 'hub',
  onSelectFormenteraSection,
  onExitEvent,
  unreadCount = 3
}) => {
  // If inside an event (e.g. Formentera), bottom nav transforms into the event modules:
  // (Mando + Montaje + Avituall. + Logística + Publicidad + SOS)
  if (selectedEvent === 'formentera') {
    const eventModules: {
      id: FormenteraSection;
      label: string;
      icon: string;
      isSos?: boolean;
    }[] = [
      { id: 'hub', label: 'Mando', icon: 'dashboard' },
      { id: 'montaje', label: 'Montaje', icon: 'build' },
      { id: 'avituallamiento', label: 'Avituall.', icon: 'water_drop' },
      { id: 'logistica', label: 'Logística', icon: 'inventory_2' },
      { id: 'lonas', label: 'Publicidad', icon: 'campaign' },
      { id: 'emergencias', label: 'SOS', icon: 'emergency', isSos: true }
    ];

    return (
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-1.5 sm:px-3 h-16 box-content bg-[#edf2f9]/95 backdrop-blur-md border-t border-white/80 shadow-[0_-4px_20px_rgba(166,180,200,0.2)] pb-safe">
        {eventModules.map((mod) => {
          const isActive = formenteraSection === mod.id;

          if (mod.isSos) {
            return (
              <button
                key={mod.id}
                onClick={() => onSelectFormenteraSection?.(mod.id)}
                className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
                  isActive
                    ? 'text-rose-600 font-bold'
                    : 'text-rose-500/80 hover:text-rose-600'
                }`}
                title="Canal Emergencias / SOS"
              >
                <div
                  className={`w-9 h-8 rounded-xl flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-[0_2px_8px_rgba(225,29,72,0.4)]'
                      : 'neu-inset text-rose-600'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">emergency</span>
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-wider mt-0.5 font-mono text-rose-600">
                  SOS
                </span>
                {isActive && (
                  <span className="absolute top-0 w-6 h-0.5 bg-rose-600 rounded-full"></span>
                )}
              </button>
            );
          }

          return (
            <button
              key={mod.id}
              onClick={() => onSelectFormenteraSection?.(mod.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-blue-600 opacity-80 hover:opacity-100'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-7 h-0.5 bg-blue-600 rounded-full"></span>
              )}
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[21px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {mod.icon}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mt-0.5 font-mono truncate max-w-[58px]">
                {mod.label}
              </span>
            </button>
          );
        })}
      </nav>
    );
  }

  // Global / Initial state bottom menu: (Eventos + Calendario + Almacén + Avisos)
  const globalTabs: { id: MainTab; label: string; icon: string }[] = [
    { id: 'eventos', label: 'Eventos', icon: 'list_alt' },
    { id: 'calendario', label: 'Calendario', icon: 'calendar_month' },
    { id: 'almacen', label: 'Almacén', icon: 'warehouse' },
    { id: 'avisos', label: 'Avisos', icon: 'notifications' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 h-16 box-content bg-[#edf2f9]/95 backdrop-blur-md border-t border-white/80 shadow-[0_-4px_20px_rgba(166,180,200,0.2)] pb-safe">
      {globalTabs.map((tab) => {
        const isActive = currentMainTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === 'eventos' && selectedEvent && onExitEvent) {
                onExitEvent();
              }
              onSelectMainTab(tab.id);
            }}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
              isActive
                ? 'text-blue-600 font-bold after:content-[""] after:w-8 after:h-0.5 after:bg-blue-600 after:absolute after:top-0'
                : 'text-slate-500 hover:text-blue-600 opacity-75 hover:opacity-100'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[22px]"
                data-icon={tab.icon}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>

              {/* Unread badge on Avisos */}
              {tab.id === 'avisos' && unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center border border-white font-mono shadow-xs">
                  {unreadCount}
                </span>
              )}
            </div>

            <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5 font-mono">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
