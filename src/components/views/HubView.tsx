import React, { useState } from 'react';
import { FormenteraSection, MainTab } from '../../types';

interface HubViewProps {
  onSelectSection: (section: FormenteraSection) => void;
  onNavigateGlobalTab: (tab: MainTab) => void;
  onOpenReportModal: () => void;
  onOpenPrintModal: () => void;
}

export const HubView: React.FC<HubViewProps> = ({
  onSelectSection,
  onNavigateGlobalTab,
  onOpenReportModal,
  onOpenPrintModal
}) => {
  const [weatherRefreshed, setWeatherRefreshed] = useState(false);

  const handleRefreshWeather = () => {
    setWeatherRefreshed(true);
    setTimeout(() => setWeatherRefreshed(false), 2000);
  };

  const launcherModules = [
    {
      id: 'montaje' as FormenteraSection,
      icon: 'build',
      title: 'MONTAJE & CHECKLIST',
      subtitle: '6 Sectores, infraestructuras y crono',
      badge: '18/24 OK',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'avituallamiento' as FormenteraSection,
      icon: 'water_drop',
      title: 'AVITUALLAMIENTOS',
      subtitle: "Miramar, S'Abeuredeta y Meta",
      badge: '3 PUNTOS',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    {
      id: 'logistica' as FormenteraSection,
      icon: 'inventory_2',
      title: 'LOGÍSTICA & PROVEEDORES',
      subtitle: 'Coca-Cola, Trasmed, Elitechip, Rent a car',
      badge: '8/10 LISTOS',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'lonas' as FormenteraSection,
      icon: 'campaign',
      title: 'PUBLICIDAD & BRANDING',
      subtitle: 'Distribución espacial de lonas y 38 fly banners',
      badge: '53 ITEMS',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      id: 'emergencias' as FormenteraSection,
      icon: 'emergency',
      title: 'EMERGENCIAS // SOS',
      subtitle: 'VHF Ch 09, Guardia Civil, PMA y Médicos',
      badge: 'ACTIVO 24H',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      iconColor: 'text-rose-600',
      hoverColor: 'group-hover:bg-rose-600'
    }
  ];

  // 24-hour weather timeline data for Es Pujols, Formentera
  const hourlyForecast = [
    { hour: '07:00', temp: '19°C', wind: '9 km/h NE', sky: 'sunny', sea: 'Calma 0.2m', phase: 'Salida' },
    { hour: '09:00', temp: '22°C', wind: '12 km/h E', sky: 'sunny', sea: 'Rizada 0.3m', phase: 'Bici' },
    { hour: '11:00', temp: '24°C', wind: '14 km/h E', sky: 'partly_cloudy_day', sea: '0.4m', phase: 'Carrera' },
    { hour: '13:00', temp: '25°C', wind: '16 km/h E', sky: 'partly_cloudy_day', sea: '0.4m', phase: 'Meta' },
    { hour: '15:00', temp: '25°C', wind: '15 km/h ESE', sky: 'sunny', sea: '0.3m', phase: 'Podio' },
    { hour: '18:00', temp: '23°C', wind: '12 km/h SE', sky: 'sunny', sea: '0.3m', phase: 'Desmontaje' },
    { hour: '21:00', temp: '21°C', wind: '9 km/h S', sky: 'clear_night', sea: 'Calma', phase: 'Cierre' },
    { hour: '00:00', temp: '19°C', wind: '7 km/h S', sky: 'clear_night', sea: 'Calma', phase: 'Noche' }
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-3.5 sm:px-4 pt-20 pb-24 space-y-4">
      {/* 1. Neumorphic Operations Hero Status */}
      <section className="neu-card rounded-3xl p-4 sm:p-5 space-y-3.5 border border-white/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 live-pulse"></span>
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 font-mono">
              CENTRO DE MANDO EN VIVO
            </span>
          </div>
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 font-mono">
            T - 18h // LIVE SYNC
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-0.5">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              78% OPERATIVO
            </span>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">
              18 de 24 sectores verificados · Conexión directa
            </p>
          </div>
          <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full uppercase tracking-wide">
            ON SCHEDULE
          </span>
        </div>

        {/* Embossed Inset Progress Bar */}
        <div className="w-full neu-inset h-2.5 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: '78%' }}
          ></div>
        </div>
      </section>

      {/* 2. INFORMACIÓN GENERAL DEL EVENTO (Solicitado) */}
      <section className="neu-card rounded-3xl p-4 sm:p-5 border border-white/80 space-y-3">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl neu-circle flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-base">info</span>
            </div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Información General del Evento
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
            14ª EDICIÓN
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="neu-inset p-2.5 rounded-2xl space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Fecha &amp; Hora</span>
            <p className="font-bold text-slate-800 text-[12px] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-blue-600">calendar_today</span>
              03 Oct 2026 · 08:00 AM
            </p>
          </div>

          <div className="neu-inset p-2.5 rounded-2xl space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Ubicación</span>
            <p className="font-bold text-slate-800 text-[12px] flex items-center gap-1 truncate">
              <span className="material-symbols-outlined text-xs text-rose-500">pin_drop</span>
              Es Pujols, Formentera
            </p>
          </div>

          <div className="neu-inset p-2.5 rounded-2xl space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Modalidades</span>
            <p className="font-bold text-slate-800 text-[12px] truncate">
              Sprint (750m-20k-5k) &amp; Olí.
            </p>
          </div>

          <div className="neu-inset p-2.5 rounded-2xl space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Atletas Inscritos</span>
            <p className="font-bold text-slate-800 text-[12px] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-emerald-600">groups</span>
              450 Participantes (100%)
            </p>
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Sede: Plaza de Europa / Boxes Paseo</span>
          <span className="font-bold text-blue-600">Unisport Balears</span>
        </div>
      </section>

      {/* 3. PREVISIÓN METEOROLÓGICA EN TIEMPO REAL 24H (Solicitado) */}
      <section className="neu-card rounded-3xl p-4 sm:p-5 border border-white/80 space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-200/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl neu-circle flex items-center justify-center text-amber-500">
              <span className="material-symbols-outlined text-base">partly_cloudy_day</span>
            </div>
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                Previsión Meteorológica (24h Vista)
              </h2>
              <span className="text-[9px] font-mono text-slate-400 font-bold">
                ESTACIÓN AEMET ES PUJOLS · TIEMPO REAL
              </span>
            </div>
          </div>

          <button
            onClick={handleRefreshWeather}
            className="w-7 h-7 rounded-full neu-circle flex items-center justify-center text-slate-500 hover:text-blue-600 active:rotate-180 transition-all"
            title="Actualizar datos meteorológicos"
          >
            <span className={`material-symbols-outlined text-sm ${weatherRefreshed ? 'animate-spin text-blue-600' : ''}`}>
              refresh
            </span>
          </button>
        </div>

        {/* Current Conditions Bento */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="neu-inset p-2 rounded-2xl">
            <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">Temperatura</span>
            <span className="text-base font-black text-slate-900 font-mono">23°C</span>
            <span className="text-[9px] text-slate-500 block">Sens. 24°</span>
          </div>

          <div className="neu-inset p-2 rounded-2xl">
            <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">Viento</span>
            <span className="text-base font-black text-blue-700 font-mono">12 km/h</span>
            <span className="text-[9px] text-slate-500 block">Este (E)</span>
          </div>

          <div className="neu-inset p-2 rounded-2xl">
            <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">Estado Mar</span>
            <span className="text-base font-black text-emerald-700 font-mono">0.4 m</span>
            <span className="text-[9px] text-slate-500 block">Rizada</span>
          </div>

          <div className="neu-inset p-2 rounded-2xl">
            <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">Agua Mar</span>
            <span className="text-base font-black text-blue-600 font-mono">22.5°C</span>
            <span className="text-[9px] text-emerald-600 font-bold block">Neopreno Opt.</span>
          </div>
        </div>

        {/* Hourly 24h Vista Horizontal Scroller */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block pl-0.5">
            Evolución Horaria Prevista
          </span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {hourlyForecast.map((item, idx) => (
              <div
                key={idx}
                className="shrink-0 w-20 neu-card p-2 rounded-2xl text-center flex flex-col items-center justify-between border border-white/70"
              >
                <span className="text-[10px] font-mono font-bold text-slate-700">{item.hour}</span>
                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded-full my-0.5 font-mono">
                  {item.phase}
                </span>
                <span className="material-symbols-outlined text-amber-500 text-lg my-0.5">
                  {item.sky}
                </span>
                <span className="text-xs font-black text-slate-900 font-mono">{item.temp}</span>
                <span className="text-[9px] text-slate-500 font-mono mt-0.5 leading-tight">{item.wind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CIRCUITOS OFICIALES (1 BOTÓN CADA UNO A WEB EXTERNA - Solicitado) */}
      <section className="neu-card rounded-3xl p-4 sm:p-5 border border-white/80 space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-200/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl neu-circle flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-base">map</span>
            </div>
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                Circuitos &amp; Tracks Oficiales
              </h2>
              <span className="text-[9px] font-mono text-slate-400 font-bold">
                ACCESO DIRECTO A MAPAS Y DETALLES EN WEB EXTERNA
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {/* Circuito 1: Natación */}
          <a
            href="https://www.elitechip.net"
            target="_blank"
            rel="noopener noreferrer"
            className="neu-card p-3 rounded-2xl flex items-center justify-between hover:bg-white transition-all group border border-white/80"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl neu-circle flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-lg">pool</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Circuito de Natación (Platja d'Es Pujols)
                  </h3>
                  <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">
                    1.03 KM
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Triángulo boyas oficiales · Salida playa y cajón de boxes
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-slate-500 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0">
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </div>
          </a>

          {/* Circuito 2: Ciclismo */}
          <a
            href="https://www.elitechip.net"
            target="_blank"
            rel="noopener noreferrer"
            className="neu-card p-3 rounded-2xl flex items-center justify-between hover:bg-white transition-all group border border-white/80"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl neu-circle flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-lg">directions_bike</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Circuito de Ciclismo (Es Pujols - Sant Ferran - Savina)
                  </h3>
                  <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded">
                    20.4 KM
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Asfalto cerrado · 2 Vueltas sprint · Perfil llano y seguro
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-slate-500 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0">
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </div>
          </a>

          {/* Circuito 3: Carrera a pie */}
          <a
            href="https://www.elitechip.net"
            target="_blank"
            rel="noopener noreferrer"
            className="neu-card p-3 rounded-2xl flex items-center justify-between hover:bg-white transition-all group border border-white/80"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl neu-circle flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-lg">directions_run</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Circuito Carrera a Pie (Paseo Es Pujols / Camí Sa Guía)
                  </h3>
                  <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded">
                    5.0 KM
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Paseo marítimo + madera · 2 Vueltas con 2 avituallamientos
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-slate-500 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0">
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </div>
          </a>

          {/* Botón 4: Ficha Oficial Web Completa */}
          <a
            href="https://www.elitechip.net"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 neu-btn text-blue-700 hover:text-blue-800 font-mono text-xs font-bold rounded-2xl flex items-center justify-center gap-2 border border-blue-200/80 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-sm">language</span>
            <span>VER FICHA TÉCNICA Y REGLAMENTO EN WEB OFICIAL</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </a>
        </div>
      </section>

      {/* 5. MÓDULOS TÉCNICOS OPERATIVOS */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Módulos del Evento
          </h2>
          <span className="text-[10px] font-bold text-slate-500 bg-white/70 px-2 py-0.5 rounded-full font-mono">
            5 MÓDULOS
          </span>
        </div>

        <div className="space-y-2.5">
          {launcherModules.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className="w-full text-left neu-card rounded-2xl p-3.5 flex items-center justify-between transition-all duration-200 hover:translate-y-[-1px] group border border-white/80"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl neu-circle flex items-center justify-center shrink-0 ${
                    item.iconColor || 'text-blue-600'
                  } ${
                    item.hoverColor || 'group-hover:bg-blue-600'
                  } group-hover:text-white transition-all`}
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 tracking-tight truncate">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-medium text-slate-500 truncate">{item.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pl-2 shrink-0">
                <span
                  className={`text-[10px] font-bold border px-2 py-0.5 rounded-full font-mono ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-600 text-lg">
                  chevron_right
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 6. Quick Global Switcher to Other App Sections */}
      <section className="neu-card rounded-2xl p-3 border border-white/80 space-y-2">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block pl-1">
          Navegación Global RaceOps
        </span>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onNavigateGlobalTab('calendario')}
            className="neu-btn rounded-xl p-2 flex items-center justify-center gap-1.5 text-slate-700 text-xs font-mono font-bold"
          >
            <span className="material-symbols-outlined text-sm text-blue-600">calendar_month</span>
            <span>Calendario</span>
          </button>

          <button
            onClick={() => onNavigateGlobalTab('almacen')}
            className="neu-btn rounded-xl p-2 flex items-center justify-center gap-1.5 text-slate-700 text-xs font-mono font-bold"
          >
            <span className="material-symbols-outlined text-sm text-blue-600">warehouse</span>
            <span>Almacén</span>
          </button>

          <button
            onClick={() => onNavigateGlobalTab('avisos')}
            className="neu-btn rounded-xl p-2 flex items-center justify-center gap-1.5 text-slate-700 text-xs font-mono font-bold"
          >
            <span className="material-symbols-outlined text-sm text-blue-600">notifications</span>
            <span>Avisos</span>
          </button>
        </div>
      </section>

      {/* 7. Action Triggers */}
      <section className="pt-1 space-y-2.5">
        <button
          onClick={onOpenReportModal}
          type="button"
          className="w-full py-3.5 neu-btn-primary text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md"
        >
          <span className="material-symbols-outlined text-lg">photo_camera</span>
          <span>REPORTAR INCIDENCIA RÁPIDA / FOTO</span>
        </button>

        <button
          onClick={onOpenPrintModal}
          type="button"
          className="w-full py-3 neu-btn text-slate-700 font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all border border-white"
        >
          <span className="material-symbols-outlined text-lg text-blue-600">print</span>
          <span>IMPRIMIR RIDER TÉCNICO // PDF</span>
        </button>
      </section>
    </div>
  );
};
