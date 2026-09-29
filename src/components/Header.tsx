import React, { useState } from 'react';
import { FormenteraSection, MainTab, UserProfile } from '../types';

interface HeaderProps {
  currentMainTab: MainTab;
  selectedEvent: string | null;
  formenteraSection: FormenteraSection;
  onSelectFormenteraSection?: (section: FormenteraSection) => void;
  onExitEvent: () => void;
  onOpenSos?: () => void;
  user?: UserProfile | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMainTab,
  selectedEvent,
  formenteraSection,
  onExitEvent,
  user,
  onLogout
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  // If inside an event (Formentera)
  if (selectedEvent === 'formentera') {
    const getFormenteraInfo = () => {
      switch (formenteraSection) {
        case 'montaje':
          return {
            title: 'FORMENTERA // MONTAJE',
            subtitle: 'DESPLIEGUE TÉCNICO & SECTORES'
          };
        case 'avituallamiento':
          return {
            title: 'FORMENTERA // AVITUALLAMIENTOS',
            subtitle: 'RIDER P.24-26 · CONTROL DE PUNTOS'
          };
        case 'logistica':
          return {
            title: 'FORMENTERA // LOGÍSTICA',
            subtitle: 'PROVEEDORES & ALBARANES'
          };
        case 'lonas':
          return {
            title: 'FORMENTERA // PUBLICIDAD',
            subtitle: 'LONAS & BRANDING ESPACIAL'
          };
        case 'circuitos':
          return {
            title: 'FORMENTERA // CIRCUITOS',
            subtitle: 'TRACKS & ENLACES OFICIALES'
          };
        case 'emergencias':
          return {
            title: 'FORMENTERA // EMERGENCIAS (SOS)',
            subtitle: 'CANAL RADIO [CH 09] & DIR. MÉDICA'
          };
        case 'hub':
        default:
          return {
            title: 'TRIATLÓ FORMENTERA 2026',
            subtitle: 'CENTRO DE MANDO OPERATIVO'
          };
      }
    };

    const eventInfo = getFormenteraInfo();

    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-[#edf2f9]/95 backdrop-blur-md border-b border-white/60 shadow-[0_4px_16px_rgba(166,180,200,0.2)]">
        <div className="flex justify-between items-center px-4 h-16">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Back button to return to Master Events list */}
            <button
              onClick={onExitEvent}
              className="px-2.5 py-1.5 rounded-xl neu-btn text-blue-700 hover:text-blue-800 text-xs font-mono font-bold flex items-center gap-1 shrink-0 active:scale-95 transition-all shadow-xs"
              title="Volver a la lista de eventos (Inicio)"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Eventos</span>
            </button>

            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center neu-circle rounded-full border border-white/80 shrink-0 text-blue-600">
              <span className="material-symbols-outlined text-base sm:text-lg font-bold">sensors</span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 leading-tight">
                <span className="text-[12px] sm:text-[14px] font-extrabold uppercase tracking-tight text-slate-900 truncate">
                  {eventInfo.title}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 live-pulse shrink-0"></span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-semibold text-slate-500 flex items-center gap-1 mt-0.5 tracking-wide uppercase truncate font-mono">
                <span>{eventInfo.subtitle}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono font-bold text-slate-600 bg-white/70 px-2.5 py-1 rounded-full border border-white/80 shadow-xs hidden sm:inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-blue-600">event</span>
              03 OCT 2026
            </span>

            {onLogout && (
              <button
                onClick={onLogout}
                className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-slate-500 hover:text-rose-600 transition-colors"
                title="Cerrar sesión"
              >
                <span className="material-symbols-outlined text-base">logout</span>
              </button>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Global / Root level header (Eventos, Calendario, Almacén, Avisos)
  const getGlobalHeaderInfo = () => {
    switch (currentMainTab) {
      case 'calendario':
        return {
          title: 'RACEOPS // CALENDARIO',
          subtitle: 'LIVESYNC CLOUD • TEMPORADA 2026'
        };
      case 'almacen':
        return {
          title: 'RACEOPS // ALMACÉN',
          subtitle: 'CENTRAL LOGÍSTICA & FLOTA'
        };
      case 'avisos':
        return {
          title: 'RACEOPS // AVISOS',
          subtitle: 'NOTIFICACIONES TÉCNICAS & RADIO'
        };
      case 'eventos':
      default:
        return {
          title: 'RACEOPS // EVENTOS',
          subtitle: 'SISTEMA ACTIVO // 25 PRUEBAS'
        };
    }
  };

  const globalInfo = getGlobalHeaderInfo();

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-[#edf2f9]/90 backdrop-blur-md border-b border-white/60 shadow-[0_4px_16px_rgba(166,180,200,0.2)]">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center neu-circle rounded-full border border-white/80 shrink-0 text-blue-600">
          <span className="material-symbols-outlined text-lg sm:text-xl font-bold">sensors</span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 leading-tight">
            <span className="text-[13px] sm:text-[14px] font-extrabold uppercase tracking-tight text-slate-900 truncate">
              {globalInfo.title}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 live-pulse shrink-0"></span>
          </div>
          <p className="text-[10px] font-semibold text-slate-500 flex items-center gap-1.5 mt-0.5 tracking-wide uppercase truncate font-mono">
            <span>{globalInfo.subtitle}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full neu-btn text-xs font-mono font-bold text-slate-700 hover:text-blue-700 transition-all border border-white/80"
              title="Perfil de técnico"
            >
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                {user.name.charAt(0)}
              </div>
              <span className="hidden md:inline truncate max-w-[120px]">{user.name}</span>
              <span className="material-symbols-outlined text-xs text-slate-400">arrow_drop_down</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-10 w-64 neu-card rounded-2xl p-3 shadow-xl border border-white/90 z-50 space-y-2 animate-fadeIn text-xs">
                <div className="border-b border-slate-200/80 pb-2">
                  <p className="font-extrabold text-slate-900 truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {user.role}
                  </span>
                </div>
                {onLogout && (
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full py-1.5 neu-btn rounded-xl font-mono text-[11px] font-bold text-rose-600 hover:bg-rose-50 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    <span>Cerrar Sesión</span>
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60 shadow-xs hidden sm:inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            UNISPORT BALEARS
          </span>
        )}

        {onLogout && !user && (
          <button
            onClick={onLogout}
            className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-slate-500 hover:text-rose-600 transition-colors"
            title="Cerrar sesión"
          >
            <span className="material-symbols-outlined text-base">logout</span>
          </button>
        )}
      </div>
    </header>
  );
};
