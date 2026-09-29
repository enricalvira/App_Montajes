import React, { useState } from 'react';
import { ASSETS } from '../../data/mockData';

interface CircuitosViewProps {
  onZoomImage: (url: string, title: string, subtitle?: string) => void;
}

export const CircuitosView: React.FC<CircuitosViewProps> = ({ onZoomImage }) => {
  const [activeSegmentTab, setActiveSegmentTab] = useState<'all' | 'natacion' | 'ciclismo' | 'carrera'>('all');
  const [satelliteMode, setSatelliteMode] = useState(false);

  const downloadGpx = () => {
    const element = document.createElement('a');
    const file = new Blob(
      [
        `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="RaceOps Formentera" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Triatló Illa de Formentera 2026 - Tracks Oficiales</name>
    <desc>Natación 1.03km, Ciclismo 8.09km, Carrera a Pie 2.56km</desc>
    <time>2026-10-03T08:30:00Z</time>
  </metadata>
  <trk>
    <name>Circuito Es Pujols - Ses Salines</name>
    <type>Triathlon</type>
  </trk>
</gpx>`
      ],
      { type: 'application/gpx+xml' }
    );
    element.href = URL.createObjectURL(file);
    element.download = 'Triatlo_Formentera_2026_Tracks.gpx';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-20 pb-24 space-y-5">
      {/* Subheader / System Status Strip */}
      <section className="neu-card rounded-3xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-white/70">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 neu-inset rounded-full">
            <span className="material-symbols-outlined text-blue-600 text-sm">route</span>
            <span className="font-mono text-[11px] text-blue-700 font-bold">TRACKS GPX V3.4</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 neu-inset rounded-full">
            <span className="text-[10px] text-slate-500 font-bold uppercase font-mono">SISTEMA:</span>
            <span className="font-mono text-[11px] text-slate-800 font-bold">ETRS89 / UTM 31N</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 neu-inset rounded-full">
            <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
            <span className="text-[10px] text-emerald-700 font-bold font-mono">HOMOLOGACIÓN FETRI</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSatelliteMode(!satelliteMode)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold font-mono transition-all ${
              satelliteMode ? 'neu-pill-active text-white' : 'neu-card-sm text-slate-700 hover:neu-inset'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {satelliteMode ? 'layers' : 'satellite_alt'}
            </span>
            <span>{satelliteMode ? 'MODO CAD VECTORIAL' : 'VISTA SATÉLITE / ALTIMETRÍA'}</span>
          </button>
          <button
            onClick={downloadGpx}
            className="flex items-center gap-1.5 px-4 py-2 neu-pill-active text-white font-bold text-xs rounded-2xl transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-sm font-bold">download</span>
            <span>DESCARGAR GPX / KML</span>
          </button>
        </div>
      </section>

      {/* Tactical Viewport Tabs */}
      <div className="grid grid-cols-4 gap-2 p-1.5 neu-inset rounded-3xl">
        <button
          onClick={() => setActiveSegmentTab('all')}
          className={`py-2.5 px-2 text-center rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
            activeSegmentTab === 'all'
              ? 'neu-pill-active text-white shadow-sm'
              : 'text-slate-600 hover:text-blue-600'
          }`}
        >
          <span className="material-symbols-outlined text-sm">view_agenda</span>
          <span className="truncate">Todos</span>
        </button>
        <button
          onClick={() => setActiveSegmentTab('natacion')}
          className={`py-2.5 px-2 text-center rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
            activeSegmentTab === 'natacion'
              ? 'neu-pill-active text-white shadow-sm'
              : 'text-slate-600 hover:text-blue-600'
          }`}
        >
          <span className="material-symbols-outlined text-sm">pool</span>
          <span className="truncate">1. Natación (1,03k)</span>
        </button>
        <button
          onClick={() => setActiveSegmentTab('ciclismo')}
          className={`py-2.5 px-2 text-center rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
            activeSegmentTab === 'ciclismo'
              ? 'neu-pill-active text-white shadow-sm'
              : 'text-slate-600 hover:text-blue-600'
          }`}
        >
          <span className="material-symbols-outlined text-sm">directions_bike</span>
          <span className="truncate">2. Ciclismo (8,09k)</span>
        </button>
        <button
          onClick={() => setActiveSegmentTab('carrera')}
          className={`py-2.5 px-2 text-center rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
            activeSegmentTab === 'carrera'
              ? 'neu-pill-active text-white shadow-sm'
              : 'text-slate-600 hover:text-blue-600'
          }`}
        >
          <span className="material-symbols-outlined text-sm">sprint</span>
          <span className="truncate">3. Carrera (2,56k)</span>
        </button>
      </div>

      {/* SECCIÓN 1: LOS 3 SEGMENTOS DEL TRIATLÓN (Plano Técnico) */}
      <section className="neu-card rounded-3xl overflow-hidden flex flex-col border border-white/70">
        <div className="p-3.5 bg-white/40 flex flex-wrap items-center justify-between gap-2 border-b border-white/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center neu-card text-blue-600">
              <span className="material-symbols-outlined text-lg">map</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xs sm:text-sm uppercase text-slate-800 font-extrabold tracking-tight">
                MAPA OFICIAL DE LOS CIRCUITOS // PLANO RIDER TÉCNICO
              </h3>
              <span className="font-mono text-[10px] text-slate-500 font-medium">
                HOJA 02: NATACIÓN, CICLISMO Y CARRERA A PIE CON ALTIMETRÍA
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onZoomImage(ASSETS.CIRCUITO_MAP, 'Plano de los Circuitos Triatló de Formentera', 'Hoja 02 Rider Técnico Oficial')}
              className="flex items-center gap-1 px-3 py-1.5 neu-card-sm hover:neu-inset rounded-xl font-mono text-xs text-blue-600 active:scale-95 transition-all font-bold"
            >
              <span className="material-symbols-outlined text-sm">fullscreen</span>
              <span>Ampliar Plano</span>
            </button>
          </div>
        </div>

        <div
          onClick={() => onZoomImage(ASSETS.CIRCUITO_MAP, 'Plano de los Circuitos Triatló de Formentera', 'Hoja 02 Rider Técnico Oficial')}
          className="relative bg-white/60 w-full group overflow-hidden flex justify-center items-center p-3 cursor-pointer"
        >
          <img
            src={ASSETS.CIRCUITO_MAP}
            alt="Mapas de los Circuitos Triatló de Formentera"
            referrerPolicy="no-referrer"
            className="w-full max-h-[500px] object-contain rounded-2xl neu-inset transition-all group-hover:brightness-105"
          />
          <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
            <div className="neu-card px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg text-slate-800 font-mono text-xs font-bold">
              <span className="material-symbols-outlined text-blue-600 text-base">zoom_in</span>
              <span>Tocar para ampliar a pantalla completa</span>
            </div>
          </div>
          <div className="absolute bottom-5 left-5 flex items-center gap-1.5 px-3 py-1 neu-card rounded-full font-mono text-[10px] text-slate-600 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>PLANO TÉCNICO VINCULADO: DIAPOSITIVA 2</span>
          </div>
        </div>
      </section>

      {/* PERFILES DE RECORRIDO OFICIAL */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-5 bg-blue-600 rounded-full shadow-sm"></div>
            <h2 className="text-base uppercase tracking-tight text-slate-800 font-extrabold">
              PERFILES DE RECORRIDO OFICIAL
            </h2>
          </div>
          <span className="font-mono text-xs text-slate-500 font-bold">TRIATLÓ ILLA DE FORMENTERA</span>
        </div>

        {/* Bento Grid of Segments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* SEGMENT 1: NATACIÓN */}
          {(activeSegmentTab === 'all' || activeSegmentTab === 'natacion') && (
            <article className="neu-card rounded-3xl flex flex-col overflow-hidden group hover:scale-[1.01] transition-all border border-white/70">
              <div className="h-1.5 bg-blue-600 w-full"></div>
              <div className="p-4 flex flex-col flex-1 justify-between gap-3.5">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider bg-blue-100 text-blue-700">
                        SEGMENTO 1
                      </span>
                      <h3 className="text-base sm:text-lg text-slate-900 mt-1 font-extrabold">
                        Natación Es Pujols
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-2xl neu-circle flex items-center justify-center text-blue-600">
                      <span className="material-symbols-outlined text-2xl">pool</span>
                    </div>
                  </div>

                  {/* Thumbnail Map */}
                  <div
                    onClick={() => onZoomImage(ASSETS.NATACION_MAP, 'Segmento 1: Natación Es Pujols (1.03 km)', 'Plano balizado marítimo')}
                    className="relative rounded-2xl overflow-hidden mt-3 group/thumb h-28 neu-inset cursor-pointer"
                  >
                    <img
                      src={ASSETS.NATACION_MAP}
                      alt="Plano Natación"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top opacity-90 group-hover/thumb:opacity-100 transition-all"
                    />
                    <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full neu-card font-mono text-[9px] text-blue-700 font-bold">
                      <span className="material-symbols-outlined text-[11px]">fullscreen</span>
                      <span>Ver plano natación</span>
                    </div>
                  </div>

                  {/* Technical Stats */}
                  <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 rounded-2xl neu-inset font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">DISTANCIA TOTAL</span>
                      <span className="text-base text-blue-600 font-black">1,03 km</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">DESNIVEL POSITIVO</span>
                      <span className="text-base text-emerald-600 font-black">+10 m</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">ALTITUD MÍN / MÁX</span>
                      <span className="text-xs text-slate-700 font-bold">0 m / 6 m</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">DIFERENCIA COTA</span>
                      <span className="text-xs text-slate-700 font-bold">6 m</span>
                    </div>
                  </div>

                  {/* Tactical Briefing */}
                  <div className="mt-3 flex flex-col gap-1.5 text-xs text-slate-600 font-sans">
                    <div className="flex items-center gap-2 text-slate-800 font-medium">
                      <span className="material-symbols-outlined text-blue-600 text-sm">navigation</span>
                      <span>Salida en cuña Playa de Es Pujols</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-600 text-sm">warning</span>
                      <span>3 boyas de giro triangulares (1.5m) a babor</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700 font-medium">
                      <span className="material-symbols-outlined text-sm">verified_user</span>
                      <span>Canal náutico balizado coord. Joan Mayans</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-slate-500 font-bold">T1: TRANSICIÓN 150m</span>
                  <span className="text-blue-700 text-[11px] font-bold">CALLE ROCA PLANA</span>
                </div>
              </div>
            </article>
          )}

          {/* SEGMENT 2: CICLISMO */}
          {(activeSegmentTab === 'all' || activeSegmentTab === 'ciclismo') && (
            <article className="neu-card rounded-3xl flex flex-col overflow-hidden group hover:scale-[1.01] transition-all border border-white/70">
              <div className="h-1.5 bg-sky-500 w-full"></div>
              <div className="p-4 flex flex-col flex-1 justify-between gap-3.5">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider bg-sky-100 text-sky-700">
                        SEGMENTO 2
                      </span>
                      <h3 className="text-base sm:text-lg text-slate-900 mt-1 font-extrabold">
                        Ciclismo Ses Salines
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-2xl neu-circle flex items-center justify-center text-sky-600">
                      <span className="material-symbols-outlined text-2xl">directions_bike</span>
                    </div>
                  </div>

                  {/* Thumbnail Map */}
                  <div
                    onClick={() => onZoomImage(ASSETS.CICLISMO_MAP, 'Segmento 2: Ciclismo Ses Salines (8.09 km)', 'Circuito de velocidad')}
                    className="relative rounded-2xl overflow-hidden mt-3 group/thumb h-28 neu-inset cursor-pointer"
                  >
                    <img
                      src={ASSETS.CICLISMO_MAP}
                      alt="Plano Ciclismo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center opacity-90 group-hover/thumb:opacity-100 transition-all"
                    />
                    <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full neu-card font-mono text-[9px] text-sky-700 font-bold">
                      <span className="material-symbols-outlined text-[11px]">fullscreen</span>
                      <span>Ver plano ciclismo</span>
                    </div>
                  </div>

                  {/* Technical Stats */}
                  <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 rounded-2xl neu-inset font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">DISTANCIA CIRCUITO</span>
                      <span className="text-base text-sky-700 font-black">8,09 km</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">DESNIVEL ACUMULADO</span>
                      <span className="text-base text-sky-700 font-black">+33 m</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">ALTITUD MÍN / MÁX</span>
                      <span className="text-xs text-slate-700 font-bold">0 m / 8 m</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">CORTES PM-820</span>
                      <span className="text-xs text-rose-600 font-bold">ESTRICTO 09:15</span>
                    </div>
                  </div>

                  {/* Tactical Briefing */}
                  <div className="mt-3 flex flex-col gap-1.5 text-xs text-slate-600 font-sans">
                    <div className="flex items-center gap-2 text-slate-800 font-medium">
                      <span className="material-symbols-outlined text-sky-600 text-sm">turn_right</span>
                      <span>Giro rápido Sa Roqueta / Ctra. Ses Salines</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600 text-sm">shield</span>
                      <span>14 marshals móviles + 120 conos de desvío</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700 font-medium">
                      <span className="material-symbols-outlined text-sm">check</span>
                      <span>Asfalto reasfaltado tramo Camp des Batle</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-slate-500 font-bold">VEL. MEDIA ESTIMADA</span>
                  <span className="text-sky-700 text-[11px] font-bold">39.4 KM/H</span>
                </div>
              </div>
            </article>
          )}

          {/* SEGMENT 3: CARRERA A PIE */}
          {(activeSegmentTab === 'all' || activeSegmentTab === 'carrera') && (
            <article className="neu-card rounded-3xl flex flex-col overflow-hidden group hover:scale-[1.01] transition-all border border-white/70">
              <div className="h-1.5 bg-emerald-500 w-full"></div>
              <div className="p-4 flex flex-col flex-1 justify-between gap-3.5">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-700">
                        SEGMENTO 3
                      </span>
                      <h3 className="text-base sm:text-lg text-slate-900 mt-1 font-extrabold">
                        Carrera a Pie Costa
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-2xl neu-circle flex items-center justify-center text-emerald-600">
                      <span className="material-symbols-outlined text-2xl">sprint</span>
                    </div>
                  </div>

                  {/* Thumbnail Map */}
                  <div
                    onClick={() => onZoomImage(ASSETS.CARRERA_MAP, 'Segmento 3: Carrera a Pie Costa (2.56 km)', 'Circuito urbano y paseo')}
                    className="relative rounded-2xl overflow-hidden mt-3 group/thumb h-28 neu-inset cursor-pointer"
                  >
                    <img
                      src={ASSETS.CARRERA_MAP}
                      alt="Plano Carrera a Pie"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-bottom opacity-90 group-hover/thumb:opacity-100 transition-all"
                    />
                    <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full neu-card font-mono text-[9px] text-emerald-700 font-bold">
                      <span className="material-symbols-outlined text-[11px]">fullscreen</span>
                      <span>Ver plano carrera</span>
                    </div>
                  </div>

                  {/* Technical Stats */}
                  <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 rounded-2xl neu-inset font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">DISTANCIA VUELTA</span>
                      <span className="text-base text-emerald-600 font-black">2,56 km</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">DESNIVEL POSITIVO</span>
                      <span className="text-base text-emerald-600 font-black">+25 m</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">ALTITUD MÍN / MÁX</span>
                      <span className="text-xs text-slate-700 font-bold">1 m / 25 m</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block">TIPO SUPERFICIE</span>
                      <span className="text-xs text-slate-700 font-bold">Asfalto + Paseo</span>
                    </div>
                  </div>

                  {/* Tactical Briefing */}
                  <div className="mt-3 flex flex-col gap-1.5 text-xs text-slate-600 font-sans">
                    <div className="flex items-center gap-2 text-slate-800 font-medium">
                      <span className="material-symbols-outlined text-emerald-600 text-sm">route</span>
                      <span>Av. Miramar → Sa Punta → Roca Plana</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600 text-sm">water_drop</span>
                      <span>Avituallamiento km 1.2 (Agua/Isotónico)</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                      <span className="material-symbols-outlined text-sm">sports_score</span>
                      <span>Entrada a recta de meta con alfombra azul</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-slate-500 font-bold">EMBUDO DE LLEGADA</span>
                  <span className="text-emerald-700 text-[11px] font-bold">200 CM MOQUETA</span>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>

      {/* CONTROL DE SEGURIDAD EN RUTA & PUNTOS CRÍTICOS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-5 bg-emerald-500 rounded-full shadow-sm"></div>
            <h2 className="text-base uppercase tracking-tight text-slate-800 font-extrabold">
              CONTROL DE SEGURIDAD EN RUTA &amp; PUNTOS CRÍTICOS
            </h2>
          </div>
          <span className="font-mono text-xs text-emerald-700 font-bold">TRACKS EN TIEMPO REAL</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 neu-card rounded-3xl flex flex-col gap-2.5 border border-white/70">
            <div className="flex items-center gap-2 text-blue-600">
              <div className="w-8 h-8 rounded-xl neu-card-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">water</span>
              </div>
              <span className="text-xs font-bold uppercase text-slate-800">Segmento 1 - Natación</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Circuito triangular a favor de la corriente predominante. 3 boyas de 1.5m señalizadas con balizas acústicas. Embarcación de apoyo rápida y 4 kayaks de seguridad perimetral.
            </p>
            <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500 font-semibold">TIEMPO DE CORTE:</span>
              <span className="text-blue-600 font-bold">30 MINUTOS</span>
            </div>
          </div>

          <div className="p-4 neu-card rounded-3xl flex flex-col gap-2.5 border border-white/70">
            <div className="flex items-center gap-2 text-sky-600">
              <div className="w-8 h-8 rounded-xl neu-card-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">traffic</span>
              </div>
              <span className="text-xs font-bold uppercase text-slate-800">Segmento 2 - Ciclismo</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Cierre total de la carretera PM-820 desde las 09:15h. Asfalto inspeccionado y sellado en el tramo Camp des Batle. 14 marshals móviles FETRI con comunicación directa a dirección de carrera.
            </p>
            <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500 font-semibold">TIEMPO DE CORTE:</span>
              <span className="text-sky-600 font-bold">1H 15M DESDE SALIDA</span>
            </div>
          </div>

          <div className="p-4 neu-card rounded-3xl flex flex-col gap-2.5 border border-white/70">
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="w-8 h-8 rounded-xl neu-card-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">local_drink</span>
              </div>
              <span className="text-xs font-bold uppercase text-slate-800">Segmento 3 - Carrera</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Circuito urbano por paseo marítimo de Es Pujols y Roca Plana. Punto de avituallamiento líquido cada 1.25 km con agua y sales isotónicas. Tramo de moqueta amortiguada en acceso final.
            </p>
            <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500 font-semibold">TIEMPO MÁXIMO TOTAL:</span>
              <span className="text-emerald-600 font-bold">2H 00M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
