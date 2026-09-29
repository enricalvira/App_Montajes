import React, { useState } from 'react';
import { ASSETS } from '../../data/mockData';

interface BrandingViewProps {
  onZoomImage: (url: string, title: string, subtitle?: string) => void;
  onOpenReportModal: () => void;
}

export const BrandingView: React.FC<BrandingViewProps> = ({ onZoomImage, onOpenReportModal }) => {
  const [selectedSector, setSelectedSector] = useState<'all' | 'sec1' | 'sec2' | 'sec3' | 'banners'>('all');
  const [itemsState, setItemsState] = useState<{ [key: string]: boolean }>({
    'trasmed-inflado': false,
    'lamola-ajuste': false
  });

  const toggleItem = (key: string) => {
    setItemsState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const flyBannersCount = [
    { brand: 'TRASMAPI', count: 8, isTop: true },
    { brand: 'CONSELL DE FORMENTERA', count: 6, isTop: true },
    { brand: 'PROAUTO', count: 5 },
    { brand: 'ECOPILAS', count: 4 },
    { brand: 'PUJOLS COMERÇ', count: 4 },
    { brand: 'TRASMED', count: 4 },
    { brand: 'LA MOLA RENT', count: 3 },
    { brand: 'FORMOTOR', count: 2 }
  ];

  return (
    <div className="w-full max-w-lg mx-auto px-4 pt-20 pb-24 space-y-4">
      {/* 1. Header Técnico & Telemetría de Branding */}
      <section className="p-5 rounded-3xl neu-card flex flex-col gap-3.5 border border-white/80">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 px-2.5 py-1 rounded-full neu-inset border border-blue-200/50 font-mono">
            RIDER TÉCNICO // PÁG. 16-22
          </span>
          <span className="text-[12px] font-semibold text-slate-500 font-mono">META // ES PUJOLS</span>
        </div>
        <div>
          <h2 className="text-xl text-slate-900 uppercase tracking-tight font-black">
            FORMENTERA 2026 // BRANDING
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            DISTRIBUCIÓN ESPACIAL DE LONAS &amp; FLY BANNERS
          </p>
        </div>

        {/* Telemetry Badges */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <div className="neu-card-sm rounded-2xl p-2.5 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">SUPERVISIÓN</span>
            <span className="text-[11px] font-extrabold text-blue-700 truncate mt-1">PROTOCOLO &amp; MARCA</span>
          </div>
          <div className="neu-card-sm rounded-2xl p-2.5 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">TOTAL ELEMENTOS</span>
            <span className="text-[13px] font-black text-slate-800 font-mono mt-1">53 ITEMS</span>
          </div>
          <div className="neu-card-sm rounded-2xl p-2.5 flex flex-col justify-between border border-emerald-300/40">
            <span className="text-[10px] font-bold uppercase text-emerald-600 tracking-wider">INSTALACIÓN</span>
            <div className="flex items-baseline gap-1 mt-1 font-mono">
              <span className="text-[14px] font-black text-emerald-600">85%</span>
              <span className="text-[10px] font-bold text-emerald-500">OK</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Filters */}
      <section className="flex flex-col gap-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          <button
            onClick={() => setSelectedSector('all')}
            className={`shrink-0 px-4 h-9 rounded-2xl font-bold text-xs uppercase flex items-center gap-1.5 transition-all ${
              selectedSector === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'neu-card-sm text-slate-600 hover:text-blue-600'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span>Todos (53)</span>
          </button>
          <button
            onClick={() => setSelectedSector('sec1')}
            className={`shrink-0 px-3.5 h-9 rounded-2xl font-bold text-xs uppercase flex items-center gap-1.5 transition-all ${
              selectedSector === 'sec1'
                ? 'neu-pill-active text-white'
                : 'neu-card-sm text-slate-600 hover:text-blue-600'
            }`}
          >
            <span>1. Acceso &amp; Pre-Meta</span>
          </button>
          <button
            onClick={() => setSelectedSector('sec2')}
            className={`shrink-0 px-3.5 h-9 rounded-2xl font-bold text-xs uppercase flex items-center gap-1.5 transition-all ${
              selectedSector === 'sec2'
                ? 'neu-pill-active text-white'
                : 'neu-card-sm text-slate-600 hover:text-blue-600'
            }`}
          >
            <span>2. Pasillo Central (60m)</span>
          </button>
          <button
            onClick={() => setSelectedSector('sec3')}
            className={`shrink-0 px-3.5 h-9 rounded-2xl font-bold text-xs uppercase flex items-center gap-1.5 transition-all ${
              selectedSector === 'sec3'
                ? 'neu-pill-active text-white'
                : 'neu-card-sm text-slate-600 hover:text-blue-600'
            }`}
          >
            <span>3. Recta &amp; Meta</span>
          </button>
          <button
            onClick={() => setSelectedSector('banners')}
            className={`shrink-0 px-3.5 h-9 rounded-2xl font-bold text-xs uppercase flex items-center gap-1.5 transition-all ${
              selectedSector === 'banners'
                ? 'bg-amber-600 text-white shadow-md'
                : 'neu-card-sm text-amber-700'
            }`}
          >
            <span>Fly Banners (38)</span>
          </button>
        </div>

        {/* Action Triggers */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onZoomImage(ASSETS.BRANDING_MAP, 'Plano de Montaje Meta Pág. 19', 'Distribución espacial de lonas y fly banners')}
            className="h-11 rounded-2xl neu-card-sm hover:text-blue-600 text-slate-700 font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-blue-600 text-base">architecture</span>
            <span>PLANO ESPACIAL VECTORIAL</span>
          </button>
          <button
            onClick={onOpenReportModal}
            className="h-11 rounded-2xl neu-card-sm hover:text-emerald-600 text-slate-700 font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-emerald-600 text-base">verified</span>
            <span>VALIDAR FOTO-REPORTE</span>
          </button>
        </div>
      </section>

      {/* 3. Esquema Espacial: Pasillo Azul y Corredor en 'T' (Pág. 19 Rider) */}
      <section className="neu-card rounded-3xl p-4 border border-white/80 relative flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg neu-inset flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-base">map</span>
            </div>
            <span className="text-xs uppercase text-slate-900 font-black tracking-tight">
              PLANO DE MONTAJE // PÁG. 19 META
            </span>
          </div>
          <span className="text-[10px] font-bold text-blue-700 neu-inset border border-blue-200/50 px-2 py-0.5 rounded-full font-mono">
            PLANO RIDER PÁG. 19
          </span>
        </div>

        {/* Visor de Imagen */}
        <div
          onClick={() => onZoomImage(ASSETS.BRANDING_MAP, 'Plano de Montaje Meta Pág. 19', 'Distribución espacial de lonas y fly banners')}
          className="relative bg-white rounded-2xl p-2 neu-inset overflow-hidden group cursor-pointer border border-slate-200"
        >
          <div className="relative w-full max-h-[440px] overflow-hidden flex items-center justify-center rounded-xl bg-slate-50">
            <img
              src={ASSETS.BRANDING_MAP}
              alt="Plano de Montaje Meta Pág. 19"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain max-h-[440px] rounded-lg transition-transform group-hover:scale-[1.01]"
            />
          </div>
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider font-mono">
              RIDER VECTORIAL // PÁG. 19
            </span>
          </div>
        </div>

        {/* Botones de Acción Rápida del Visor */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onZoomImage(ASSETS.BRANDING_MAP, 'Plano de Montaje Meta Pág. 19', 'Distribución espacial de lonas y fly banners')}
            className="h-10 rounded-2xl neu-btn hover:text-blue-600 text-slate-700 font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-blue-600 text-base">zoom_in</span>
            <span>Ampliar Alta Resolución</span>
          </button>
          <button
            onClick={onOpenReportModal}
            className="h-10 rounded-2xl neu-btn hover:text-slate-900 text-slate-600 font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-slate-500 text-base">upload_file</span>
            <span>Subir Nuevo Esquema</span>
          </button>
        </div>

        {/* Resumen de Estado de Balizamiento */}
        <div className="flex items-center justify-around text-slate-600 text-xs font-semibold pt-2 border-t border-slate-200 font-mono">
          <span className="flex items-center gap-1.5 neu-inset px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 42 Verificadas
          </span>
          <span className="flex items-center gap-1.5 neu-inset px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> 8 En Montaje
          </span>
          <span className="flex items-center gap-1.5 neu-inset px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> 3 Pendientes
          </span>
        </div>
      </section>

      {/* 4. Checklist Operativo por Sectores */}
      {(selectedSector === 'all' || selectedSector === 'sec1') && (
        <div className="neu-card rounded-3xl p-3.5 flex flex-col gap-2.5 border border-white/80">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 neu-inset px-2 py-0.5 rounded-lg border border-blue-200 font-mono">
                SEC-01
              </span>
              <span className="text-sm text-slate-900 font-black uppercase">Acceso &amp; Pre-Meta</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 neu-inset px-2 py-0.5 rounded-full font-mono">
              4/5 LISTO
            </span>
          </div>

          <div className="space-y-2 pt-0.5">
            <div className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-emerald-500 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">PUJOLS COMERÇ</span>
                <span className="text-[11px] text-slate-500">Lona Perimetral 3x1m • Anclaje Bridas T-8</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  Verificado
                </span>
                <span className="material-symbols-outlined text-emerald-600 text-xl fill-icon">check_circle</span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-emerald-500 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">FORMOTOR RENT</span>
                <span className="text-[11px] text-slate-500">Lona Textil 3x1m • Tensión frontal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  Verificado
                </span>
                <span className="material-symbols-outlined text-emerald-600 text-xl fill-icon">check_circle</span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-emerald-500 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">ECOPILAS</span>
                <span className="text-[11px] text-slate-500">2x Fly Banner Lágrima (3.5m) • Base Agua 20L</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  Verificado
                </span>
                <span className="material-symbols-outlined text-emerald-600 text-xl fill-icon">check_circle</span>
              </div>
            </div>

            {/* In Progress */}
            <div
              onClick={() => toggleItem('trasmed-inflado')}
              className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-amber-500 flex items-center justify-between cursor-pointer hover:bg-amber-50/30 transition-all"
            >
              <div className="flex flex-col">
                <span className="text-xs text-amber-800 font-bold">TRASMED FERRIES</span>
                <span className="text-[11px] text-slate-500">Arco Hinchable de Acceso • Turbina 1.5kW</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  {itemsState['trasmed-inflado'] ? 'Verificado' : 'En Inflado / Lastre'}
                </span>
                <span
                  className={`material-symbols-outlined text-xl ${
                    itemsState['trasmed-inflado'] ? 'text-emerald-600 fill-icon' : 'text-amber-600 animate-spin'
                  }`}
                >
                  {itemsState['trasmed-inflado'] ? 'check_circle' : 'sync'}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-emerald-500 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">FONT VELLA</span>
                <span className="text-[11px] text-slate-500">Zona Hidratación • Carpa 4x4m + Faldones</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  Verificado
                </span>
                <span className="material-symbols-outlined text-emerald-600 text-xl fill-icon">check_circle</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sector 2: Pasillo Central */}
      {(selectedSector === 'all' || selectedSector === 'sec2') && (
        <div className="neu-card rounded-3xl p-3.5 flex flex-col gap-2.5 border border-white/80">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 neu-inset px-2 py-0.5 rounded-lg border border-blue-200 font-mono">
                SEC-02
              </span>
              <span className="text-sm text-slate-900 font-black uppercase">Pasillo Central Moqueta (60m)</span>
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full font-mono">
              ZONA CRÍTICA
            </span>
          </div>

          <div className="space-y-2 pt-0.5">
            <div className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-emerald-500 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">TRASMAPI FAST FERRY</span>
                <span className="text-[11px] text-slate-500">4x Fly Banner 4.2m • Alineación Flanco Oeste</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  Verificado
                </span>
                <span className="material-symbols-outlined text-emerald-600 text-xl fill-icon">check_circle</span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-emerald-500 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">CONSELL DE FORMENTERA</span>
                <span className="text-[11px] text-slate-500">Valla Principal Institucional 12m continuos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  Verificado
                </span>
                <span className="material-symbols-outlined text-emerald-600 text-xl fill-icon">check_circle</span>
              </div>
            </div>

            <div
              onClick={() => toggleItem('lamola-ajuste')}
              className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-slate-400 flex items-center justify-between cursor-pointer hover:bg-slate-100/50 transition-all"
            >
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">LA MOLA RENT</span>
                <span className="text-[11px] text-slate-500">Valla Doble Especial • Revisión de bridas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  {itemsState['lamola-ajuste'] ? 'Verificado' : 'Ajustando'}
                </span>
                <span
                  className={`material-symbols-outlined text-xl ${
                    itemsState['lamola-ajuste'] ? 'text-emerald-600 fill-icon' : 'text-slate-500'
                  }`}
                >
                  {itemsState['lamola-ajuste'] ? 'check_circle' : 'build'}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-emerald-500 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">GOIB ILLES SOSTENIBLES</span>
                <span className="text-[11px] text-slate-500">Lona Microperforada Viento • 6x1.2m</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  Verificado
                </span>
                <span className="material-symbols-outlined text-emerald-600 text-xl fill-icon">check_circle</span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-emerald-500 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">GAJOS LOGÍSTICA</span>
                <span className="text-[11px] text-slate-500">Vallas Baliza Delimitadora • Cabecera Moqueta</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  Verificado
                </span>
                <span className="material-symbols-outlined text-emerald-600 text-xl fill-icon">check_circle</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sector 3: Recta Final & Meta */}
      {(selectedSector === 'all' || selectedSector === 'sec3') && (
        <div className="neu-card rounded-3xl p-3.5 flex flex-col gap-2.5 border border-white/80">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 neu-inset px-2 py-0.5 rounded-lg border border-blue-200 font-mono">
                SEC-03
              </span>
              <span className="text-sm text-slate-900 font-black uppercase">Recta Final &amp; Meta</span>
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full font-mono">
              BROADCAST CAM 1
            </span>
          </div>

          <div className="space-y-2 pt-0.5">
            <div className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-emerald-500 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">COCA-COLA</span>
                <span className="text-[11px] text-emerald-700 font-semibold uppercase">
                  Arco Meta Estructura Truss + 6 Banderas • 100% VISIBLE
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  Validado TV
                </span>
                <span className="material-symbols-outlined text-emerald-600 text-xl fill-icon">videocam</span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-emerald-500 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">CARBONICAS TUR</span>
                <span className="text-[11px] text-slate-500">Lona Frontal Meta 4x1m • Ángulo Cenital</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  Verificado
                </span>
                <span className="material-symbols-outlined text-emerald-600 text-xl fill-icon">check_circle</span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-emerald-500 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">CONSELL INSULAR D'ESPORTS</span>
                <span className="text-[11px] text-slate-500">Backdrop Podio Premiación 3x3m • Iluminación LED</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  Verificado
                </span>
                <span className="material-symbols-outlined text-emerald-600 text-xl fill-icon">check_circle</span>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl neu-card-sm border-l-4 border-emerald-500 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-900 font-bold">ELITECHIP TIMING</span>
                <span className="text-[11px] text-slate-500">Torre Crono Display Doble Cara • Antenas Transponder</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full uppercase font-mono">
                  Verificado
                </span>
                <span className="material-symbols-outlined text-emerald-600 text-xl fill-icon">timer</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Censo Fly Banners en Recinto (38 Uds.) */}
      {(selectedSector === 'all' || selectedSector === 'banners') && (
        <section className="neu-card rounded-3xl p-3.5 flex flex-col gap-2.5 border border-white/80">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg neu-inset flex items-center justify-center text-amber-600">
                <span className="material-symbols-outlined text-sm">flag</span>
              </div>
              <h4 className="text-xs text-slate-900 font-black uppercase">
                Censo Fly Banners en Recinto (38 Uds.)
              </h4>
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase px-2 py-0.5 rounded-full neu-inset font-mono">
              PÁG. 18 RIDER
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-0.5 font-mono">
            {flyBannersCount.map((item) => (
              <div
                key={item.brand}
                className="p-2 rounded-2xl neu-card-sm flex items-center justify-between"
              >
                <span className="text-xs text-slate-800 font-bold truncate pr-1">{item.brand}</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-lg neu-inset ${
                    item.isTop ? 'text-blue-700 border border-blue-200/50' : 'text-slate-700'
                  }`}
                >
                  {item.count} uds
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Tactical Action Buttons */}
      <section className="pt-1 flex flex-col gap-2.5">
        <button
          onClick={onOpenReportModal}
          className="w-full h-13 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 rounded-2xl neu-btn-primary transition-all shadow-md"
        >
          <span className="material-symbols-outlined text-xl fill-icon">photo_camera</span>
          <span>REGISTRAR FOTO-REPORTE BRANDING</span>
        </button>
        <button
          onClick={onOpenReportModal}
          className="w-full h-12 py-3 neu-btn border border-amber-300 hover:bg-amber-50/50 active:scale-[0.99] text-amber-800 font-extrabold text-xs uppercase tracking-wide flex items-center justify-center gap-2 rounded-2xl transition-all"
        >
          <span className="material-symbols-outlined text-lg text-amber-600">warning</span>
          <span>REPORTAR BALIZA O LONA DESPLAZADA</span>
        </button>
      </section>
    </div>
  );
};
