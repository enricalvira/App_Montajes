import React, { useState } from 'react';
import { MASTER_EVENTS } from '../../data/mockData';
import { EventItem, MainTab } from '../../types';

interface EventosViewProps {
  onOpenFormentera: () => void;
  onNavigateTab?: (tab: MainTab) => void;
}

export const EventosView: React.FC<EventosViewProps> = ({ onOpenFormentera, onNavigateTab }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);

  const filterMonths = [
    { id: 'todos', label: 'TODOS (25)', count: 25 },
    { id: 'activo', label: 'OPERATIVO AHORA', count: 1 },
    { id: 'ene', label: 'ENERO (5)', monthIndex: 0 },
    { id: 'mar', label: 'MARZO (3)', monthIndex: 2 },
    { id: 'abr', label: 'ABRIL (3)', monthIndex: 3 },
    { id: 'may', label: 'MAYO (4)', monthIndex: 4 },
    { id: 'sep', label: 'SEPTIEMBRE (1)', monthIndex: 8 },
    { id: 'oct', label: 'OCTUBRE (5)', monthIndex: 9 },
    { id: 'nov', label: 'NOVIEMBRE (3)', monthIndex: 10 }
  ];

  const filteredEvents = MASTER_EVENTS.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'activo') return evt.isActiveOperation;
    if (selectedFilter === 'todos') return true;

    const matchedMonth = filterMonths.find((m) => m.id === selectedFilter);
    if (matchedMonth && matchedMonth.monthIndex !== undefined) {
      return evt.monthIndex === matchedMonth.monthIndex;
    }

    return true;
  });

  return (
    <div className="w-full max-w-lg mx-auto px-4 pt-20 pb-20 space-y-5">
      {/* Subtitle Badge & Season Banner */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2.5 py-1 rounded-full neu-inset inline-block">
            CALENDARIO OFICIAL
          </span>
          <h2 className="text-xl text-slate-900 mt-1 font-extrabold tracking-tight">Riders &amp; Operaciones</h2>
        </div>
        <div className="neu-inset rounded-2xl px-3 py-1.5 flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 live-pulse"></span>
          <span className="font-mono text-xs text-blue-700 font-bold">25 EVENTOS</span>
        </div>
      </div>

      {/* Neumorphic Overview & Status Pods */}
      <section className="grid grid-cols-3 gap-3">
        {/* Total Events Pod */}
        <div className="neu-card rounded-2xl p-3 flex flex-col justify-between items-center text-center">
          <div className="w-8 h-8 rounded-full neu-inset flex items-center justify-center text-blue-600 mb-1">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          </div>
          <span className="text-2xl font-black text-slate-800 font-mono">25</span>
          <span className="text-[10px] font-semibold text-slate-500 uppercase">Programados</span>
        </div>

        {/* Active Operations Pod (Highlighted) */}
        <div className="neu-card rounded-2xl p-3 flex flex-col justify-between items-center text-center relative overflow-hidden border border-blue-300">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mb-1 shadow-md">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </div>
          <span className="text-2xl font-black text-blue-600 font-mono">1</span>
          <span className="text-[10px] font-bold text-blue-700 uppercase">Operación Viva</span>
        </div>

        {/* Upcoming Milestone Pod */}
        <div className="neu-card rounded-2xl p-3 flex flex-col justify-between items-center text-center">
          <div className="w-8 h-8 rounded-full neu-inset flex items-center justify-center text-slate-600 mb-1">
            <span className="material-symbols-outlined text-[18px]">flag</span>
          </div>
          <span className="text-xl font-black text-slate-800 font-mono">3 Oct</span>
          <span className="text-[10px] font-semibold text-slate-500 uppercase">Próximo Hito</span>
        </div>
      </section>

      {/* Search Bar */}
      <div className="neu-inset rounded-2xl p-1.5 flex items-center px-3 gap-2">
        <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar evento, isla o tipo de montaje..."
          className="w-full bg-transparent border-0 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:ring-0 py-1.5"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined text-sm">cancel</span>
          </button>
        )}
      </div>

      {/* Month Filter Carousel (Tactile Pills) */}
      <section className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
            Filtro Temporal
          </span>
          <span className="text-[11px] text-blue-600 font-bold font-mono">Deslizar meses</span>
        </div>
        <div className="flex space-x-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
          {filterMonths.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`text-xs px-3.5 py-2 rounded-full whitespace-nowrap flex items-center space-x-1.5 transition-all font-mono font-bold ${
                  isActive
                    ? 'neu-pill-active text-white shadow-md'
                    : 'neu-btn text-slate-600 hover:text-blue-600'
                }`}
              >
                {tab.id === 'activo' && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Event Highlight Banner (TRIATLÓ FORMENTERA) */}
      <section className="neu-card rounded-3xl p-5 border-2 border-blue-500/40 relative overflow-hidden bg-gradient-to-br from-[#edf2f9] to-blue-50/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase font-bold flex items-center space-x-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>EN VIVO // OPERACIONES</span>
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-blue-700 bg-white px-2.5 py-0.5 rounded-full shadow-xs">
            H-48:12:00
          </span>
        </div>
        <div className="mb-3">
          <h3 className="text-lg font-black text-slate-900 leading-tight">
            TRIATLÓN DE FORMENTERA
          </h3>
          <p className="text-xs text-slate-600 mt-0.5 flex items-center font-medium">
            <span className="material-symbols-outlined text-[16px] text-blue-600 mr-1">location_on</span>
            Es Pujols · Circuito Puerto - Faro La Mola
          </p>
        </div>
        {/* Quick Metrics Tags */}
        <div className="grid grid-cols-3 gap-2 my-3">
          <div className="neu-inset rounded-xl p-2 text-center">
            <span className="text-[10px] font-mono text-slate-500 block">Formato</span>
            <span className="text-xs font-bold text-slate-800">Sprint &amp; Olym</span>
          </div>
          <div className="neu-inset rounded-xl p-2 text-center">
            <span className="text-[10px] font-mono text-slate-500 block">Documento</span>
            <span className="text-xs font-bold text-blue-600">Rider 26 Pág</span>
          </div>
          <div className="neu-inset rounded-xl p-2 text-center">
            <span className="text-[10px] font-mono text-slate-500 block">Montaje</span>
            <span className="text-xs font-bold text-emerald-600">78% Listo</span>
          </div>
        </div>
        {/* Action Button to Control Center */}
        <button
          onClick={onOpenFormentera}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 text-xs font-bold tracking-wider uppercase neu-btn-primary active:scale-[0.98] transition-all"
        >
          <span>ACCEDER AL CENTRO DE MANDO</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </section>

      {/* Chronological Full List Header */}
      <div className="flex items-center justify-between pt-2 px-1">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-blue-600 text-[20px]">format_list_bulleted</span>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
            Master Lista de Eventos
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          {filteredEvents.length} de {MASTER_EVENTS.length}
        </span>
      </div>

      {/* Chronological Event Cards List */}
      <div className="space-y-3">
        {filteredEvents.map((evt) => {
          const isTriatlo = evt.isActiveOperation;
          return (
            <div
              key={evt.id}
              onClick={() => {
                if (isTriatlo) {
                  onOpenFormentera();
                } else {
                  setSelectedEventModal(evt);
                }
              }}
              className={`rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all hover:translate-x-1 ${
                isTriatlo
                  ? 'neu-card border-2 border-blue-500/50 bg-blue-50/20'
                  : 'neu-card-sm hover:bg-white'
              }`}
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                <div
                  className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 ${
                    isTriatlo ? 'bg-blue-600 text-white shadow-md' : 'neu-inset'
                  }`}
                >
                  <span
                    className={`text-[10px] uppercase font-bold leading-none font-mono ${
                      isTriatlo ? 'text-white/80' : 'text-slate-500'
                    }`}
                  >
                    {evt.month}
                  </span>
                  <span
                    className={`text-base font-black leading-tight font-mono ${
                      isTriatlo ? 'text-white' : 'text-slate-800'
                    }`}
                  >
                    {evt.dates}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4
                      className={`text-xs sm:text-sm font-bold tracking-tight truncate ${
                        isTriatlo ? 'text-blue-700 font-extrabold' : 'text-slate-900'
                      }`}
                    >
                      {evt.title}
                    </h4>
                    {evt.tag && (
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                          isTriatlo
                            ? 'bg-blue-600 text-white'
                            : evt.tag.includes('MITO')
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {evt.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {evt.category} · {evt.location}
                  </p>
                </div>
              </div>
              <button
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ml-2 ${
                  isTriatlo
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'neu-btn text-slate-500 hover:text-blue-600'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isTriatlo ? 'arrow_forward' : 'chevron_right'}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Central Database Sync Card */}
      <section className="neu-card rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full neu-inset flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined text-[20px]">sync</span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">Base de Datos Centralizada</span>
            <span className="text-[10px] text-slate-500 font-mono">Última sincronización: hace 4 min</span>
          </div>
        </div>
        <button
          onClick={() => alert('Sincronización manual completada con LiveSync Cloud.')}
          className="neu-btn text-blue-600 px-3 py-1.5 rounded-xl font-mono text-xs font-bold"
        >
          Actualizar
        </button>
      </section>

      {/* Modal for viewing non-active event details */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="neu-card rounded-3xl p-5 w-full max-w-md space-y-4 border border-white/80">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold">
                {selectedEventModal.month} {selectedEventModal.dates} // 2026
              </span>
              <button
                onClick={() => setSelectedEventModal(null)}
                className="w-8 h-8 rounded-full neu-circle flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-slate-900">{selectedEventModal.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{selectedEventModal.category}</p>
            </div>

            <div className="neu-inset rounded-2xl p-3 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Ubicación:</span>
                <span className="font-bold text-slate-800">{selectedEventModal.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Operativa:</span>
                <span className="font-bold text-blue-600">Montaje en Almacén / Programado</span>
              </div>
              <p className="text-slate-600 pt-1 text-[11px] leading-relaxed border-t border-slate-200">
                {selectedEventModal.description}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedEventModal(null)}
                className="flex-1 py-2.5 neu-btn rounded-xl text-xs font-bold uppercase text-slate-600"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setSelectedEventModal(null);
                  onNavigateTab?.('almacen');
                }}
                className="flex-1 py-2.5 neu-btn-primary rounded-xl text-xs font-bold uppercase text-white"
              >
                Ver en Almacén
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
