import React, { useState } from 'react';
import { ActiveTab } from '../../types';

interface CalendarioViewProps {
  onOpenFormentera?: () => void;
  setActiveTab?: (tab: any) => void;
}

export const CalendarioView: React.FC<CalendarioViewProps> = ({ onOpenFormentera, setActiveTab }) => {
  const [selectedDay, setSelectedDay] = useState<number>(3);
  const [activeViewMode, setActiveViewMode] = useState<'mes' | 'semana' | 'agenda'>('mes');
  const [filterTag, setFilterTag] = useState<string>('todos');

  const exportIcal = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//RaceOps//Calendario Oficial Balear 2026//ES
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:triatlo-formentera-2026@raceops.org
DTSTART:20261003T053000Z
DTEND:20261003T153000Z
SUMMARY:Triatló Illa de Formentera 2026 // Operaciones
DESCRIPTION:Montaje y dirección de carrera. Es Pujols - Ses Salines.
LOCATION:Es Pujols, Formentera
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
UID:llampuga-2026@raceops.org
DTSTART:20261009T060000Z
DTEND:20261011T220000Z
SUMMARY:Mostra de la Llampuga (Montajes MITO)
LOCATION:Cala Rajada
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'RaceOps_Calendario_Octubre_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calendarDays = [
    { day: 28, prevMonth: true },
    { day: 29, prevMonth: true },
    { day: 30, prevMonth: true },
    { day: 1 },
    { day: 2 },
    { day: 3, isToday: true, hasEvent: true, eventColor: 'bg-white', label: 'Triatló Formentera' },
    { day: 4, isSunday: true },
    { day: 5 },
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9, hasEvent: true, dotColor: 'bg-amber-600', label: 'Llampuga' },
    { day: 10, hasEvent: true, dotColor: 'bg-amber-600', label: 'Llampuga' },
    { day: 11, isSunday: true, hasEvent: true, dotColor: 'bg-amber-600', label: 'Llampuga' },
    { day: 12 },
    { day: 13, hasEvent: true, dotColor: 'bg-blue-600', label: 'Masters' },
    { day: 14, hasEvent: true, dotColor: 'bg-blue-600', label: 'Masters' },
    { day: 15, hasEvent: true, dotColor: 'bg-blue-600', label: 'Masters' },
    { day: 16, hasEvent: true, dotColor: 'bg-blue-600', label: 'Masters' },
    { day: 17, hasEvent: true, dotColor: 'bg-blue-600', label: 'Masters' },
    { day: 18, isSunday: true, hasEvent: true, dotColor: 'bg-blue-600', label: 'Masters' },
    { day: 19 },
    { day: 20 },
    { day: 21 },
    { day: 22 },
    { day: 23 },
    { day: 24 },
    { day: 25, isSunday: true, hasEvent: true, dotColor: 'bg-emerald-600', label: 'AECC' },
    { day: 26 },
    { day: 27 },
    { day: 28 },
    { day: 29 },
    { day: 30, hasEvent: true, dotColor: 'bg-amber-700', label: 'UTMB' },
    { day: 31, hasEvent: true, dotColor: 'bg-amber-700', label: 'UTMB' }
  ];

  const agendaEvents = [
    {
      id: 'e-03',
      dayNumber: 3,
      dateFormatted: '03',
      month: 'OCT',
      title: 'Triatlón de Formentera',
      tag: 'OPERATIVO / HOY',
      tagType: 'today',
      category: 'Running & Swim',
      schedule: '07:30 - 15:30 (Salida primer cajón: 08:30)',
      location: 'Es Pujols (Zona Boxes Paseo)',
      assigned: 'Arco Meta, 280 Vallas, Carpas',
      lead: 'Marc Gómez (4 técnicos)',
      hasCircuitAction: true,
      hasRiderAction: true
    },
    {
      id: 'e-09',
      dayNumber: 9,
      dateFormatted: '09-11',
      month: 'OCT',
      title: 'Mostra de la Llampuga',
      tag: 'MONTAJES MITO',
      tagType: 'mito',
      category: 'Ferial / Evento',
      schedule: 'Montaje previo: 8 Oct 14:00 • Desmontaje: 11 Oct 23:00',
      location: 'Cala Rajada (Puerto Pesquero)',
      assigned: '18 Carpas 3x3, Cableado 32A, Cuadros',
      lead: 'Toni Cabot (Equipo B)'
    },
    {
      id: 'e-13',
      dayNumber: 13,
      dateFormatted: '13-18',
      month: 'OCT',
      title: 'Semana Internacional Masters',
      tag: 'CICLISMO / ETAPAS',
      tagType: 'ciclismo',
      category: 'UCI Masters',
      schedule: '6 Etapas continuadas • Despliegue móvil diario',
      location: 'Platja de Muro (Centro Neurálgico)',
      assigned: 'Pódium camión, Arco inflable, 600m valla',
      lead: 'Andrés Lladó (Coord. General)'
    },
    {
      id: 'e-25',
      dayNumber: 25,
      dateFormatted: '25',
      month: 'OCT',
      title: 'AECC Mallorca en Marcha',
      tag: 'SOLIDARIO / RUNNING',
      tagType: 'running',
      category: 'Popular (4.000 pax)',
      schedule: 'Salida 10:00 • Montaje desde las 05:30',
      location: 'Palma (Parc de la Mar / Catedral)',
      assigned: 'PA 10kW, 400m Valla peatonal, Guardarropa',
      lead: 'Marc Gómez & Dani R.'
    },
    {
      id: 'e-30',
      dayNumber: 30,
      dateFormatted: '30-02',
      month: 'OCT/NOV',
      title: 'Montaje Vallas UTMB Mallorca',
      tag: 'TRAIL RUNNING / VALLAS',
      tagType: 'trail',
      category: 'Operativo Pesado',
      schedule: 'Jornadas continuadas de replanteo y balizamiento',
      location: 'Sóller / Puerto de Sóller',
      assigned: '1.200m Valla alta, 4 Pórticos de Meta',
      lead: 'Sergi Palmer (8 montadores)'
    }
  ];

  const filteredAgenda = agendaEvents.filter((ev) => {
    if (filterTag === 'propios') return !ev.tag.includes('MITO');
    if (filterTag === 'mito') return ev.tag.includes('MITO');
    if (filterTag === 'ciclismo') return ev.tagType === 'ciclismo';
    if (filterTag === 'running') return ev.tagType === 'running' || ev.tagType === 'trail';
    return true;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-20 pb-20 space-y-5">
      {/* Top View Selector Bar */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 neu-card p-3 rounded-2xl border border-white/70">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl neu-inset flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined text-lg">calendar_month</span>
          </div>
          <div>
            <h3 className="font-bold text-xs uppercase text-slate-800">Calendario Oficial de Montaje</h3>
            <span className="text-[10px] text-slate-500 font-mono">Temporada Balear 2026</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="neu-inset p-1 rounded-2xl flex items-center">
            <button
              onClick={() => setActiveViewMode('mes')}
              className={`px-3 py-1 rounded-xl font-mono text-xs font-bold transition-all ${
                activeViewMode === 'mes' ? 'neu-pill-active text-white' : 'text-slate-600'
              }`}
            >
              Mes
            </button>
            <button
              onClick={() => setActiveViewMode('semana')}
              className={`px-3 py-1 rounded-xl font-mono text-xs font-bold transition-all ${
                activeViewMode === 'semana' ? 'neu-pill-active text-white' : 'text-slate-600'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setActiveViewMode('agenda')}
              className={`px-3 py-1 rounded-xl font-mono text-xs font-bold transition-all ${
                activeViewMode === 'agenda' ? 'neu-pill-active text-white' : 'text-slate-600'
              }`}
            >
              Agenda
            </button>
          </div>
          <button
            onClick={exportIcal}
            className="neu-btn px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-blue-700 flex items-center gap-1"
            title="Exportar archivo iCal"
          >
            <span className="material-symbols-outlined text-sm">cloud_download</span>
            <span>.ICS</span>
          </button>
        </div>
      </section>

      {/* Bento Grid: Interactive Calendar + Active Shift Focus */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Interactive Monthly Calendar Widget */}
        <div className="lg:col-span-7 neu-card rounded-3xl p-5 space-y-4 border border-white/70">
          {/* Month Navigator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl neu-inset flex items-center justify-center text-blue-600">
                <span className="material-symbols-outlined">event</span>
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Octubre 2026</h2>
                <p className="text-[11px] text-slate-500 font-mono">5 eventos técnicos programados</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <button
                onClick={() => setSelectedDay(3)}
                className="px-3 py-1 rounded-xl neu-btn text-xs font-bold text-blue-700"
              >
                HOY
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-1.5 text-center pt-2 font-mono text-xs font-bold text-slate-500">
            <div>L</div>
            <div>M</div>
            <div>X</div>
            <div>J</div>
            <div>V</div>
            <div>S</div>
            <div className="text-rose-600">D</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 pt-1">
            {calendarDays.map((item, idx) => {
              const isSelected = selectedDay === item.day && !item.prevMonth;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (!item.prevMonth) setSelectedDay(item.day);
                  }}
                  className={`h-11 rounded-xl flex flex-col items-center justify-center relative cursor-pointer font-mono transition-all ${
                    item.prevMonth
                      ? 'opacity-25 text-slate-400 cursor-default'
                      : isSelected
                      ? 'bg-blue-600 text-white shadow-md font-black scale-105'
                      : item.hasEvent
                      ? 'neu-inset font-bold text-slate-800'
                      : 'neu-btn text-slate-700 hover:text-blue-600'
                  }`}
                >
                  <span className={`text-xs ${item.isSunday && !isSelected ? 'text-rose-600' : ''}`}>
                    {item.day}
                  </span>
                  {item.hasEvent && !isSelected && (
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor || 'bg-blue-600'} mt-0.5`}></span>
                  )}
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-0.5 animate-pulse"></span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend Tags */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200 text-[10px] font-mono">
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-xs"></span>
              <span>Evento Hoy / Operativo</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 shadow-xs"></span>
              <span>Montajes MITO</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shadow-xs"></span>
              <span>Solidario / Running</span>
            </div>
          </div>
        </div>

        {/* Sidebar Focus Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="neu-card rounded-3xl p-5 space-y-3.5 border border-white/70 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-blue-600 text-white font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                <span>EN CURSO // HOY</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">Turno: 06:00 - 21:00</span>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">Triatlón de Formentera</h3>
              <p className="text-xs text-slate-600 flex items-center gap-1 mt-1 font-medium">
                <span className="material-symbols-outlined text-blue-600 text-base">location_on</span>
                Es Pujols • Circuito Puerto / Savina
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 font-mono pt-1">
              <div className="neu-inset p-3 rounded-2xl">
                <p className="text-[10px] text-slate-500 font-bold uppercase">VALLAS Y ARCOS</p>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-sm font-black text-blue-700">100%</span>
                  <span className="text-[11px] text-slate-700">320 / 320 m</span>
                </div>
                <div className="w-full h-1.5 bg-slate-300 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-full"></div>
                </div>
              </div>

              <div className="neu-inset p-3 rounded-2xl">
                <p className="text-[10px] text-slate-500 font-bold uppercase">CRONOMETRAJE</p>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-sm font-black text-emerald-600">ACTIVO</span>
                  <span className="text-[11px] text-slate-700">4 Antenas</span>
                </div>
                <div className="w-full h-1.5 bg-slate-300 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full w-full"></div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center border-2 border-white">
                  MG
                </div>
                <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center border-2 border-white">
                  TC
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center border-2 border-white">
                  AL
                </div>
              </div>
              <span className="text-slate-600 font-medium">
                Resp. Técnico: <strong>Marc Gómez</strong>
              </span>
            </div>

            <button
              onClick={() => {
                if (onOpenFormentera) onOpenFormentera();
                else if (setActiveTab) setActiveTab('hub');
              }}
              className="w-full py-2.5 neu-btn-primary rounded-xl text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-1.5"
            >
              <span>Abrir Centro de Mando</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Horizontal Filter Bar */}
      <section className="neu-card rounded-2xl p-2 flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-xs">
        <span className="text-[10px] text-slate-500 uppercase font-bold pl-2 whitespace-nowrap">
          Filtros:
        </span>
        <button
          onClick={() => setFilterTag('todos')}
          className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
            filterTag === 'todos' ? 'neu-pill-active text-white' : 'neu-btn text-slate-600'
          }`}
        >
          Todos (5)
        </button>
        <button
          onClick={() => setFilterTag('propios')}
          className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
            filterTag === 'propios' ? 'neu-pill-active text-white' : 'neu-btn text-slate-600'
          }`}
        >
          Propios
        </button>
        <button
          onClick={() => setFilterTag('mito')}
          className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
            filterTag === 'mito' ? 'neu-pill-active text-white' : 'neu-btn text-slate-600'
          }`}
        >
          Montajes MITO
        </button>
        <button
          onClick={() => setFilterTag('ciclismo')}
          className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
            filterTag === 'ciclismo' ? 'neu-pill-active text-white' : 'neu-btn text-slate-600'
          }`}
        >
          Ciclismo
        </button>
        <button
          onClick={() => setFilterTag('running')}
          className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
            filterTag === 'running' ? 'neu-pill-active text-white' : 'neu-btn text-slate-600'
          }`}
        >
          Running / Trail
        </button>
      </section>

      {/* Chronological Technical Agenda Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 font-bold">event_note</span>
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
              Agenda Cronológica • Octubre 2026
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">5 eventos en el libro de ruta</span>
        </div>

        <div className="space-y-3">
          {filteredAgenda.map((item) => (
            <article
              key={item.id}
              className={`neu-card rounded-2xl p-4 transition-all hover:translate-y-[-1px] ${
                item.tagType === 'today' ? 'border-l-4 border-l-blue-600 bg-blue-50/20' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div className="flex items-start md:items-center gap-3">
                  <div
                    className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 font-mono ${
                      item.tagType === 'today'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'neu-inset text-slate-800'
                    }`}
                  >
                    <span className="text-lg font-black leading-none">{item.dateFormatted}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
                      {item.month}
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          item.tagType === 'today'
                            ? 'bg-blue-600 text-white'
                            : item.tagType === 'mito'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.tag}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono neu-inset text-slate-600">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-mono">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span>{item.schedule}</span>
                    </p>
                  </div>
                </div>

                {item.hasCircuitAction && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => (onOpenFormentera ? onOpenFormentera() : setActiveTab?.('circuitos'))}
                      className="px-3 py-1.5 rounded-xl neu-btn font-mono text-xs font-bold text-blue-600 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">map</span>
                      <span>Ver Circuito</span>
                    </button>
                    <button
                      onClick={() => (onOpenFormentera ? onOpenFormentera() : setActiveTab?.('hub'))}
                      className="px-3 py-1.5 rounded-xl neu-btn font-mono text-xs font-bold text-slate-600 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">description</span>
                      <span>Rider</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg neu-inset flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined text-sm">pin_drop</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">UBICACIÓN</p>
                    <p className="font-semibold text-slate-800">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg neu-inset flex items-center justify-center text-amber-600">
                    <span className="material-symbols-outlined text-sm">construction</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">MONTAJE / LOGÍSTICA</p>
                    <p className="font-semibold text-slate-800 truncate">{item.assigned}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg neu-inset flex items-center justify-center text-slate-600">
                    <span className="material-symbols-outlined text-sm">badge</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">RESPONSABLE TÉCNICO</p>
                    <p className="font-semibold text-slate-800">{item.lead}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Floating Action Callout */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 neu-card rounded-2xl border border-white/70">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-blue-600 shrink-0">
            <span className="material-symbols-outlined text-2xl">sync</span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">¿Necesitas los eventos en tu móvil personal?</h4>
            <p className="text-xs text-slate-500">
              Mantén los horarios de montaje sincronizados automáticamente con Google Calendar y Apple iCal.
            </p>
          </div>
        </div>
        <button
          onClick={exportIcal}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl neu-btn-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 active:scale-95 transition-all shadow-md"
        >
          <span className="material-symbols-outlined text-lg">calendar_add_on</span>
          <span>SINCRONIZAR CALENDARIO (.ICS)</span>
        </button>
      </div>
    </div>
  );
};
