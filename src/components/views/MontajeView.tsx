import React, { useState } from 'react';
import { ASSETS } from '../../data/mockData';

interface MontajeViewProps {
  onZoomImage: (url: string, title: string, subtitle?: string) => void;
  onOpenReportModal: () => void;
}

interface ItemState {
  id: string;
  name: string;
  subtitle?: string;
  details?: string;
  tag?: string;
  statusTag?: string;
  verified: boolean;
  section: 'dorsales' | 'natacion' | 'boxes' | 'avituallamiento' | 'meta';
}

export const MontajeView: React.FC<MontajeViewProps> = ({ onZoomImage, onOpenReportModal }) => {
  const [selectedSector, setSelectedSector] = useState<string>('todos');

  const [items, setItems] = useState<ItemState[]>([
    // 01. Dorsales
    {
      id: 'd1',
      name: 'Carpas de 6x3m',
      subtitle: '(2 Solicitadas / 2 Entregadas)',
      tag: 'CONSELL',
      details: 'UBICACIÓN: CARPA PRINCIPAL',
      verified: true,
      section: 'dorsales'
    },
    {
      id: 'd2',
      name: 'Carpa 3x3m Rafa Bicicletas',
      subtitle: '(1 Solicitada / 1 OK)',
      tag: 'CONSELL',
      details: 'SOPORTE MECÁNICO DORSALES',
      verified: true,
      section: 'dorsales'
    },
    {
      id: 'd3',
      name: 'Mobiliario: 3 Casetas Madera, 14 Mesas, 10 Sillas',
      details: '10 Mesas Dorsales + 2 Carpa Rafa + 2 Iglú | 6 Sillas Dorsales + 2 Rafa + 2 Iglú',
      tag: 'CONSELL',
      statusTag: 'MONTAJE COMPLETO',
      verified: true,
      section: 'dorsales'
    },
    {
      id: 'd4',
      name: '450 Camisetas, 400 Bolsas, 350 Barritas 3 Action',
      details: 'Incluye 30 Guías Corredor, Sobres + Pegatinas, Listas Inscritos, 1 Iglú Ecopilas',
      tag: 'UNISPORT',
      statusTag: 'RECEPCIÓN CONFORME',
      verified: true,
      section: 'dorsales'
    },

    // 02. Natación
    {
      id: 'n1',
      name: '25 Vallas Cámaras de Salida + 16 Vallas Delimitación Playa',
      tag: 'CONSELL',
      details: 'MOQUETA SALIDA (3) INSTALADA',
      verified: true,
      section: 'natacion'
    },
    {
      id: 'n2',
      name: '3 Boyas 1.5m, 3 Zodiacs, 10 Kayaks, 1 Moto de Agua GEAS',
      tag: 'RESP: ALEX',
      statusTag: 'SEGURIDAD AGUA CONFIRMADA',
      verified: true,
      section: 'natacion'
    },
    {
      id: 'n3',
      name: 'Carpa Médicos 3x3m + Arco de Salida + Lonas Publicidad',
      details: 'Lonas: 2 Superiores + 4 Laterales Arco, 2 Trasmapi, 2 Illes Sostenibles, 2 GOIB',
      tag: 'UNISPORT / CONSELL',
      verified: true,
      section: 'natacion'
    },
    {
      id: 'n4',
      name: 'Megafonía Playa & Duchas Atletas',
      details: 'Prueba acústica pendiente de sincronización con torre de cronometraje.',
      tag: 'SONS / PREZERO',
      statusTag: 'PENDIENTE TEST AUDIO',
      verified: false,
      section: 'natacion'
    },

    // 03. Boxes
    {
      id: 'b1',
      name: '75 Barras Bicicleta + 85 Pies Aparcabicis',
      details: 'CAPACIDAD: 450 ATLETAS',
      tag: 'UNISPORT',
      verified: true,
      section: 'boxes'
    },
    {
      id: 'b2',
      name: '400 Cestas de Transición Numeradas & Moqueta Azul',
      details: 'PASILLO CENTRAL FIJADO',
      tag: 'CONSELL',
      verified: true,
      section: 'boxes'
    },
    {
      id: 'b3',
      name: 'Lonas Triatlón Perimetrales & Señalización Flujos T1/T2',
      details: 'INSTALACIÓN AL 60%',
      tag: 'UNISPORT',
      verified: false,
      section: 'boxes'
    },

    // 05. Meta
    {
      id: 'm1',
      name: 'Arco Meta Trasmapi + Arco Institucional Formentera',
      details: 'Bases de hormigón 81cm fijadas y contrapesos certificados según Rider Pág. 21.',
      verified: true,
      section: 'meta'
    },
    {
      id: 'm2',
      name: 'Moqueta Azul 200cm + Moqueta Técnica 140cm',
      details: 'Carrer Saigua Dolça <--> Roca Plana fijada con cinta doble cara de alta resistencia.',
      verified: true,
      section: 'meta'
    },
    {
      id: 'm3',
      name: 'Escenario Podio + Carpa Dorsales + Iglú Ecopilas + Carpa Médica',
      details: 'Ubicación perimetral Av. Miramar verificada con línea de paso sanitario libre.',
      verified: true,
      section: 'meta'
    }
  ]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, verified: !i.verified } : i))
    );
  };

  const totalCount = items.length;
  const verifiedCount = items.filter((i) => i.verified).length;
  const pendingCount = totalCount - verifiedCount;
  const completionPercentage = Math.round((verifiedCount / totalCount) * 100);

  const filterButtons = [
    { id: 'todos', label: 'TODOS', count: totalCount },
    { id: 'dorsales', label: 'DORSALES', count: items.filter((i) => i.section === 'dorsales').length },
    { id: 'natacion', label: 'NATACIÓN', count: items.filter((i) => i.section === 'natacion').length },
    { id: 'boxes', label: 'TRANSICIÓN', count: items.filter((i) => i.section === 'boxes').length },
    { id: 'avituallamiento', label: 'AVITUALLAMIENTOS', count: 'P.24-26' },
    { id: 'meta', label: 'META TÉCNICA', count: 'PLANO' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-20 pb-24 space-y-5">
      {/* Telemetry & Progress Header Module */}
      <section className="neu-card p-4 sm:p-5 rounded-3xl border border-white/70">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-slate-600 tracking-wide uppercase">
              ESTADO GLOBAL DE OPERACIONES
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[10px] font-bold">
              EN VIVO
            </span>
          </div>
          <div className="font-mono text-sm font-bold text-blue-600">
            {completionPercentage}% COMPLETO
          </div>
        </div>

        {/* Precision Progress Bar */}
        <div className="w-full neu-inset h-3 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-blue-600 to-sky-500 h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-slate-200/70 text-center font-mono">
          <div className="neu-inset p-2 rounded-2xl">
            <span className="block text-[10px] font-semibold text-slate-500 uppercase">TOTAL ÍTEMS</span>
            <span className="font-black text-slate-800 text-xs mt-0.5 block">{totalCount} ELEMENTOS</span>
          </div>
          <div className="neu-inset p-2 rounded-2xl">
            <span className="block text-[10px] font-semibold text-emerald-600 uppercase">CONFIRMADOS</span>
            <span className="font-black text-emerald-600 text-xs mt-0.5 block">{verifiedCount} VALIDADOS</span>
          </div>
          <div className="neu-inset p-2 rounded-2xl">
            <span className="block text-[10px] font-semibold text-amber-600 uppercase">PENDIENTES</span>
            <span className="font-black text-amber-600 text-xs mt-0.5 block">{pendingCount} ACTIVOS</span>
          </div>
        </div>
      </section>

      {/* Horizontal Sector Filter Matrix */}
      <section className="overflow-x-auto no-scrollbar py-1 -mx-4 px-4 flex items-center space-x-2">
        {filterButtons.map((btn) => {
          const isActive = selectedSector === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setSelectedSector(btn.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold font-mono flex items-center space-x-2 transition-all ${
                isActive
                  ? 'neu-pill-active text-white shadow-sm'
                  : 'neu-btn text-slate-600 hover:text-blue-600'
              }`}
            >
              <span>{btn.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? 'bg-white text-blue-600' : 'bg-slate-200/80 text-slate-700'
                }`}
              >
                {btn.count}
              </span>
            </button>
          );
        })}
      </section>

      {/* SECCIÓN 1: ENTREGA DE DORSALES */}
      {(selectedSector === 'todos' || selectedSector === 'dorsales') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm"></span>
              <h2 className="text-xs font-bold uppercase text-slate-800 tracking-wider">
                01. ENTREGA DE DORSALES &amp; BIENVENIDA
              </h2>
            </div>
            <span className="font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {items.filter((i) => i.section === 'dorsales' && i.verified).length}/
              {items.filter((i) => i.section === 'dorsales').length} VERIFICADO
            </span>
          </div>

          <div className="space-y-2.5">
            {items
              .filter((i) => i.section === 'dorsales')
              .map((item) => (
                <article
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className="neu-card p-3.5 rounded-2xl flex items-center justify-between border border-white/60 cursor-pointer hover:bg-white/40 transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <button
                      type="button"
                      className={`mt-0.5 w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                        item.verified
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'neu-inset text-slate-400'
                      }`}
                    >
                      {item.verified && (
                        <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                      )}
                    </button>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex flex-wrap items-center gap-1.5">
                        <span>{item.name}</span>
                        {item.subtitle && (
                          <span className="font-mono text-[11px] text-slate-500 font-normal">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                      {item.details && (
                        <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                          {item.details}
                        </div>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        {item.tag && (
                          <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-bold">
                            {item.tag}
                          </span>
                        )}
                        {item.statusTag && (
                          <span className="font-mono text-[10px] text-emerald-600 font-bold">
                            {item.statusTag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm text-slate-400">
                    {item.verified ? 'check_circle' : 'pending'}
                  </span>
                </article>
              ))}
          </div>
        </section>
      )}

      {/* SECCIÓN 2: SALIDA NATACIÓN & MARÍTIMO */}
      {(selectedSector === 'todos' || selectedSector === 'natacion') && (
        <section className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm"></span>
              <h2 className="text-xs font-bold uppercase text-slate-800 tracking-wider">
                02. SALIDA NATACIÓN &amp; MARÍTIMO
              </h2>
            </div>
            <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              {items.filter((i) => i.section === 'natacion' && i.verified).length}/
              {items.filter((i) => i.section === 'natacion').length} VERIFICADO
            </span>
          </div>

          <div className="space-y-2.5">
            {items
              .filter((i) => i.section === 'natacion')
              .map((item) => (
                <article
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`neu-card p-3.5 rounded-2xl flex items-center justify-between border cursor-pointer hover:bg-white/40 transition-all ${
                    !item.verified ? 'border-l-4 border-l-amber-500 border-white/60' : 'border-white/60'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <button
                      type="button"
                      className={`mt-0.5 w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                        item.verified
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'neu-inset text-amber-600'
                      }`}
                    >
                      {item.verified ? (
                        <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span>
                      )}
                    </button>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center space-x-2">
                        <span>{item.name}</span>
                        {!item.verified && (
                          <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-amber-500 text-white font-bold">
                            REVISIÓN
                          </span>
                        )}
                      </div>
                      {item.details && (
                        <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                          {item.details}
                        </div>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        {item.tag && (
                          <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-bold">
                            {item.tag}
                          </span>
                        )}
                        {item.statusTag && (
                          <span
                            className={`font-mono text-[10px] font-bold ${
                              item.verified ? 'text-emerald-600' : 'text-amber-600'
                            }`}
                          >
                            {item.statusTag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold ${
                      item.verified
                        ? 'text-emerald-600'
                        : 'neu-card-sm text-amber-700 hover:neu-inset'
                    }`}
                  >
                    {item.verified ? 'OK' : 'REVISAR'}
                  </span>
                </article>
              ))}
          </div>
        </section>
      )}

      {/* SECCIÓN 3: BOXES & ÁREA DE TRANSICIÓN */}
      {(selectedSector === 'todos' || selectedSector === 'boxes') && (
        <section className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm"></span>
              <h2 className="text-xs font-bold uppercase text-slate-800 tracking-wider">
                03. BOXES &amp; ÁREA DE TRANSICIÓN
              </h2>
            </div>
            <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              3/4 EN CURSO
            </span>
          </div>

          <div className="space-y-2.5">
            {items
              .filter((i) => i.section === 'boxes')
              .map((item) => (
                <article
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className="neu-card p-3.5 rounded-2xl flex items-center justify-between border border-white/60 cursor-pointer hover:bg-white/40 transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <button
                      type="button"
                      className={`mt-0.5 w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                        item.verified
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'neu-inset text-blue-600'
                      }`}
                    >
                      {item.verified ? (
                        <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-xs bg-blue-600"></span>
                      )}
                    </button>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{item.name}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                          {item.tag}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono font-medium">
                          {item.details}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`font-mono text-xs font-bold ${
                      item.verified ? 'text-emerald-600' : 'text-blue-600'
                    }`}
                  >
                    {item.verified ? 'OK' : 'EN PROCESO'}
                  </span>
                </article>
              ))}
          </div>
        </section>
      )}

      {/* SECCIÓN 5: PLAN DE MONTAJE | ÁREA TÉCNICA DE META */}
      {(selectedSector === 'todos' || selectedSector === 'meta') && (
        <section className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm"></span>
              <h2 className="text-xs font-bold uppercase text-slate-800 tracking-wider">
                05. PLAN DE MONTAJE | ÁREA TÉCNICA DE META
              </h2>
            </div>
            <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 font-bold">
              ESCALA 1:125
            </span>
          </div>

          <div className="neu-card rounded-3xl p-4 space-y-4 border border-white/60">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-xl neu-card-sm flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined text-sm">architecture</span>
                </div>
                <span className="text-xs font-bold uppercase text-slate-900">
                  CROQUIS TÉCNICO Y DESPLIEGUE VECTORIAL
                </span>
              </div>
              <div className="flex items-center space-x-2 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600 font-bold">
                  DOC RIDER PÁG. 20-23
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 font-bold">
                  REVISIÓN TÉCNICA OK
                </span>
              </div>
            </div>

            {/* Inset container with Technical Blueprint Image */}
            <div
              onClick={() => onZoomImage(ASSETS.MONTAJE_META_MAP, 'Croquis Técnico de Montaje Meta', 'Área Técnica Roca Plana // Av. Miramar')}
              className="neu-inset p-2.5 rounded-2xl overflow-hidden cursor-pointer group"
            >
              <div className="flex items-center justify-between px-2 py-1 text-[10px] font-mono text-slate-500 border-b border-slate-200/80 mb-2">
                <span>SECTOR ROCA PLANA // AV. MIRAMAR // CARRER SAIGUA DOLÇA</span>
                <span className="text-blue-600 font-bold">COTA TRANSVERSAL: 14.80m</span>
              </div>
              <div className="relative rounded-xl overflow-hidden bg-white shadow-inner max-h-[340px] flex items-center justify-center">
                <img
                  src={ASSETS.MONTAJE_META_MAP}
                  alt="Croquis Técnico de Montaje Meta"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-1 rounded-lg flex items-center space-x-1 shadow">
                  <span className="material-symbols-outlined text-[13px]">zoom_in</span>
                  <span>RIDER PÁG 20</span>
                </div>
              </div>
            </div>

            {/* Technical specs matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono pt-1">
              <div className="neu-card-sm p-2.5 rounded-2xl border border-white/80">
                <span className="text-slate-500 text-[10px] block font-semibold">PASILLO ATLETAS</span>
                <span className="font-bold text-blue-600 text-sm mt-0.5 block">200 cm</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Moqueta azul ignífuga</span>
              </div>
              <div className="neu-card-sm p-2.5 rounded-2xl border border-white/80">
                <span className="text-slate-500 text-[10px] block font-semibold">PASILLO SERVICIO</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">140 cm</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Crono &amp; sanitarios</span>
              </div>
              <div className="neu-card-sm p-2.5 rounded-2xl border border-white/80">
                <span className="text-slate-500 text-[10px] block font-semibold">BASE ARCOS</span>
                <span className="font-bold text-emerald-600 text-sm mt-0.5 block">81 cm / u.</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Trasmapi &amp; Formentera</span>
              </div>
              <div className="neu-card-sm p-2.5 rounded-2xl border border-white/80">
                <span className="text-slate-500 text-[10px] block font-semibold">DELIMITACIÓN VALLAS</span>
                <span className="font-bold text-amber-600 text-sm mt-0.5 block">Altas + Bajas</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">200cm crono / 90cm ext</span>
              </div>
            </div>

            {/* Meta checklist items */}
            <div className="space-y-2 pt-1">
              {items
                .filter((i) => i.section === 'meta')
                .map((item) => (
                  <article
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="neu-card p-3 rounded-2xl flex items-center justify-between border border-white/60 cursor-pointer hover:bg-white/40 transition-all"
                  >
                    <div className="flex items-start space-x-3">
                      <button
                        type="button"
                        className={`mt-0.5 w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                          item.verified ? 'bg-blue-600 text-white shadow-md' : 'neu-inset'
                        }`}
                      >
                        {item.verified && (
                          <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                        )}
                      </button>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.name}</div>
                        <div className="font-mono text-[10px] text-slate-500 mt-0.5">
                          {item.details}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {item.verified ? 'INSTALADO' : 'PENDIENTE'}
                    </span>
                  </article>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Action Buttons */}
      <div className="pt-2 pb-6 flex items-center space-x-3">
        <button
          onClick={onOpenReportModal}
          type="button"
          className="flex-1 h-13 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center space-x-2 neu-btn-primary transition-all"
        >
          <span className="material-symbols-outlined text-base">add_a_photo</span>
          <span>REGISTRAR FOTO / EVIDENCIA</span>
        </button>
        <button
          onClick={onOpenReportModal}
          type="button"
          className="h-13 py-3.5 px-4 neu-btn hover:text-amber-600 text-amber-700 font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center space-x-1.5 transition-all border border-amber-200"
        >
          <span className="material-symbols-outlined text-base">warning</span>
          <span className="hidden sm:inline">REPORTAR INCIDENCIA</span>
        </button>
      </div>
    </div>
  );
};
