import React, { useState } from 'react';
import { SUPPLIERS } from '../../data/mockData';
import { SupplierPickup } from '../../types';

interface LogisticaViewProps {
  onOpenReportModal: () => void;
}

export const LogisticaView: React.FC<LogisticaViewProps> = ({ onOpenReportModal }) => {
  const [suppliers, setSuppliers] = useState<SupplierPickup[]>(SUPPLIERS);
  const [filterRegion, setFilterRegion] = useState<'all' | 'ibiza' | 'palma' | 'formentera'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [noteInputs, setNoteInputs] = useState<{ [key: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleItemCheck = (supplierId: string, itemIndex: number) => {
    setSuppliers((prev) =>
      prev.map((sup) => {
        if (sup.id !== supplierId) return sup;
        const newItems = [...sup.items];
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          checked: !newItems[itemIndex].checked
        };
        return { ...sup, items: newItems };
      })
    );
  };

  const handleSaveObservation = (supplierId: string) => {
    const text = noteInputs[supplierId];
    if (!text?.trim()) return;

    setSuppliers((prev) =>
      prev.map((sup) => (sup.id === supplierId ? { ...sup, observations: text } : sup))
    );
    setToastMessage(`Nota guardada para ${suppliers.find((s) => s.id === supplierId)?.name}.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRegisterEntrance = (supplierName: string) => {
    setToastMessage(`Recepción y albarán de ${supplierName} registrado con éxito.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredSuppliers = suppliers.filter((sup) => {
    const matchesSearch =
      sup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sup.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sup.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterRegion === 'ibiza') return sup.route.includes('IBIZA');
    if (filterRegion === 'palma') return sup.route.includes('MARÍTIMO') || sup.route.includes('TEXTIL') || sup.route.includes('CRONO');
    if (filterRegion === 'formentera') return sup.route.includes('FORMENTERA') || sup.isLocalFleet;

    return true;
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-20 pb-24 space-y-4">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="neu-card p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold font-mono animate-fadeIn flex items-center justify-between">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)}>
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Subheader Status Summary Banner */}
      <section className="neu-card p-4 sm:p-5 rounded-3xl border border-white/70">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[10px] font-bold text-emerald-600 tracking-wider uppercase">
                MONITORIZACIÓN DE CARGA // ALBARANES
              </span>
            </div>
            <h1 className="font-black text-xl sm:text-2xl text-slate-800 tracking-tight mt-1">
              8 / 10 PROVEEDORES LISTOS
            </h1>
          </div>
          <div className="neu-inset px-3 py-1.5 text-right rounded-xl">
            <span className="font-mono text-[9px] font-bold text-slate-500 block uppercase leading-none">
              HOY PROGRAMADAS
            </span>
            <span className="font-mono text-amber-600 text-sm font-black">02 RECOGIDAS</span>
          </div>
        </div>

        {/* Progress track */}
        <div className="w-full h-3 neu-inset p-0.5 rounded-full overflow-hidden flex">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: '80%' }}
          ></div>
          <div
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full ml-1 transition-all duration-500"
            style={{ width: '20%' }}
          ></div>
        </div>

        <div className="flex justify-between items-center mt-2.5 font-mono text-[10px] font-semibold text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            80% MATERIAL ASEGURADO
          </span>
          <span className="text-orange-600 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span>
            2 PENDIENTES EN RUTA
          </span>
        </div>
      </section>

      {/* Geographic Route Filter Chips */}
      <nav className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setFilterRegion('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono tracking-wide whitespace-nowrap transition-all ${
            filterRegion === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'neu-btn text-slate-600 hover:text-blue-600'
          }`}
        >
          TODOS [10]
        </button>
        <button
          onClick={() => setFilterRegion('ibiza')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono tracking-wide whitespace-nowrap transition-all ${
            filterRegion === 'ibiza'
              ? 'neu-pill-active text-white'
              : 'neu-btn text-slate-600 hover:text-blue-600'
          }`}
        >
          IBIZA [1]
        </button>
        <button
          onClick={() => setFilterRegion('palma')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono tracking-wide whitespace-nowrap transition-all ${
            filterRegion === 'palma'
              ? 'neu-pill-active text-white'
              : 'neu-btn text-slate-600 hover:text-blue-600'
          }`}
        >
          PALMA / TRASMED [3]
        </button>
        <button
          onClick={() => setFilterRegion('formentera')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono tracking-wide whitespace-nowrap transition-all ${
            filterRegion === 'formentera'
              ? 'neu-pill-active text-white'
              : 'neu-btn text-slate-600 hover:text-blue-600'
          }`}
        >
          FORMENTERA / PUERTO [6]
        </button>
      </nav>

      {/* Quick Search Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 neu-inset rounded-2xl flex items-center px-3 py-1">
          <span className="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar por proveedor, material o chofer..."
            className="w-full bg-transparent border-0 font-mono text-xs text-slate-800 placeholder:text-slate-400 focus:ring-0 py-1.5"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-slate-400">
              <span className="material-symbols-outlined text-sm">cancel</span>
            </button>
          )}
        </div>
        <button
          onClick={() => alert('Escáner de código de barras / QR de albaranes activado.')}
          className="h-10 px-3 rounded-2xl neu-btn text-blue-600 flex items-center justify-center gap-1.5 hover:text-blue-700 transition-colors shrink-0"
          title="Escanear albarán QR"
        >
          <span className="material-symbols-outlined text-lg">qr_code_scanner</span>
          <span className="font-mono text-xs font-bold hidden sm:inline">ALBARÁN</span>
        </button>
      </div>

      {/* Supplier Cards */}
      <div className="space-y-4">
        {filteredSuppliers.map((supplier) => (
          <article
            key={supplier.id}
            className={`neu-card p-4 sm:p-5 rounded-3xl space-y-3.5 border border-white/70 ${
              supplier.status === 'en_ruta'
                ? 'border-t-4 border-t-orange-500'
                : supplier.status === 'entregado' || supplier.status === 'completo'
                ? 'border-t-4 border-t-emerald-500'
                : 'border-t-4 border-t-blue-600'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-md font-mono text-[10px] uppercase font-bold border shadow-xs ${
                      supplier.status === 'en_ruta'
                        ? 'bg-orange-100 text-orange-800 border-orange-200'
                        : supplier.status === 'entregado' || supplier.status === 'completo'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : 'bg-blue-100 text-blue-800 border-blue-200'
                    }`}
                  >
                    {supplier.statusText}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 font-semibold">{supplier.route}</span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mt-1.5">
                  {supplier.name}
                </h2>
              </div>
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl neu-inset text-slate-700">
                {supplier.date}
              </span>
            </div>

            {/* Location & Marshal Contact Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs bg-white/70 p-3 rounded-2xl border border-slate-200/60 shadow-xs">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-blue-600 text-base mt-0.5 shrink-0">
                  location_on
                </span>
                <span className="text-slate-600 leading-snug">{supplier.address}</span>
              </div>
              <div className="flex items-center justify-between border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-3">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-slate-400 text-base">person</span>
                  <span className="text-slate-800 font-bold truncate">{supplier.contactPerson}</span>
                </div>
                <a
                  href={`tel:${supplier.contactPhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-800 font-mono text-xs font-bold py-1 px-2.5 rounded-lg neu-btn"
                >
                  <span className="material-symbols-outlined text-xs">call</span>
                  <span>{supplier.contactPhone}</span>
                </a>
              </div>
            </div>

            {/* Material Checklist Grid */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center font-mono text-[10px] text-slate-500 uppercase border-b border-slate-200 pb-1">
                <span className="font-bold">BULTOS &amp; TELEMETRÍA CARGA</span>
                <span className="font-bold">ESTADO</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                {supplier.items.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleItemCheck(supplier.id, idx)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl border cursor-pointer transition-all ${
                      item.checked
                        ? 'bg-white/80 border-emerald-200 text-slate-800'
                        : 'bg-white/40 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="truncate pr-1">
                      {item.name} ({item.quantity})
                    </span>
                    <span
                      className={`material-symbols-outlined text-base ${
                        item.checked ? 'text-emerald-600 fill-icon' : 'text-slate-400'
                      }`}
                    >
                      {item.checked ? 'check_circle' : 'check_box_outline_blank'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Directive notice if present */}
            {supplier.notice && (
              <div className="flex items-start gap-2 bg-amber-50 border-l-4 border-amber-500 p-2.5 rounded-r-xl text-xs text-amber-900 shadow-xs">
                <span className="material-symbols-outlined text-amber-600 text-base shrink-0">
                  warning
                </span>
                <span>
                  <strong>TENER EN CUENTA:</strong> {supplier.notice}
                </span>
              </div>
            )}

            {/* Observations / Comment Box */}
            <div className="neu-card-sm p-3 rounded-2xl space-y-2 border border-white/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="material-symbols-outlined text-sm text-blue-600">edit_note</span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                    OBSERVACIONES / COMENTARIO DE RECOGIDA
                  </span>
                </div>
                <span className="font-mono text-[9px] text-slate-500 font-bold">EN CAMPO</span>
              </div>
              <p className="text-xs text-slate-700 neu-inset p-2 rounded-xl">
                {supplier.observations}
              </p>
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Actualizar nota de estado o incidencias..."
                  value={noteInputs[supplier.id] || ''}
                  onChange={(e) =>
                    setNoteInputs({ ...noteInputs, [supplier.id]: e.target.value })
                  }
                  className="w-full neu-inset rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 border-0 focus:ring-0"
                />
                <button
                  onClick={() => handleSaveObservation(supplier.id)}
                  className="neu-btn px-3 py-1.5 text-blue-600 hover:text-blue-700 font-mono text-[11px] font-bold rounded-xl flex items-center gap-1 whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-xs">save</span>
                  <span>GUARDAR</span>
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                onClick={() =>
                  alert(`Abriendo ruta GPS hacia ${supplier.address} en Apple / Google Maps.`)
                }
                className="neu-btn h-9 px-3.5 text-xs font-mono font-bold flex items-center gap-1.5 text-slate-700 rounded-xl"
              >
                <span className="material-symbols-outlined text-sm text-blue-600">navigation</span>
                <span>RUTA GPS</span>
              </button>
              <button
                onClick={() => handleRegisterEntrance(supplier.name)}
                className="neu-btn-primary h-9 px-4 text-xs font-bold text-white rounded-xl flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>REGISTRAR ENTRADA</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Quick Dispatch Action Button */}
      <div className="pt-2">
        <button
          onClick={onOpenReportModal}
          className="neu-btn-primary w-full h-13 py-3.5 text-white font-extrabold text-sm tracking-wider uppercase rounded-2xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-xl">add_task</span>
          <span>REGISTRAR NUEVA RECEPCIÓN DE MATERIAL</span>
        </button>
      </div>
    </div>
  );
};
