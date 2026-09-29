import React, { useState } from 'react';
import { INVENTORY_ITEMS } from '../../data/mockData';
import { InventoryItem } from '../../types';

interface AlmacenViewProps {
  onOpenTruckModal: () => void;
}

export const AlmacenView: React.FC<AlmacenViewProps> = ({ onOpenTruckModal }) => {
  const [items, setItems] = useState<InventoryItem[]>(INVENTORY_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [traceItem, setTraceItem] = useState<InventoryItem | null>(null);
  const [showMovementModal, setShowMovementModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todo el Material', icon: 'apps' },
    { id: 'Estructuras & Vallas', label: 'Estructuras & Vallas', icon: 'fence' },
    { id: 'Branding & Lonas', label: 'Branding & Lonas', icon: 'branding_watermark' },
    { id: 'Fluidos & Avituallamiento', label: 'Fluidos & Avituallamiento', icon: 'water_drop' },
    { id: 'Electricidad & Audio', label: 'Electricidad & Audio', icon: 'electrical_services' },
    { id: 'Balizamiento & Flechas', label: 'Balizamiento & Flechas', icon: 'traffic' }
  ];

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleExportManifest = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Nombre,Categoria,Ubicacion,Disponible,Total,Estado\n' +
      items
        .map(
          (i) =>
            `"${i.id}","${i.name}","${i.category}","${i.location}",${i.stockAvailable},${i.totalStock},"${i.statusText}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Manifiesto_Almacen_Central_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-20 pb-20 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="neu-card p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold font-mono animate-fadeIn flex items-center justify-between">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)}>
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Hero & Action Bar */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-blue-700 uppercase font-bold tracking-wider">
            Control Operativo Técnico
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Inventario y Carga de Eventos
          </h2>
        </div>
        <button
          onClick={onOpenTruckModal}
          className="self-start md:self-auto flex items-center gap-2 px-5 py-3 rounded-2xl neu-btn-primary font-bold text-xs uppercase tracking-wider text-white shadow-md active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-lg">local_shipping</span>
          <span>Checklist de Carga Camión</span>
        </button>
      </section>

      {/* Inset Search Bar */}
      <div className="w-full neu-inset rounded-2xl p-2 flex items-center gap-3">
        <div className="pl-3 text-slate-400 flex items-center justify-center">
          <span className="material-symbols-outlined text-xl">search</span>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent border-0 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:ring-0"
          placeholder="Buscar por lote, vallas altas, lonas institucionales, carpas 3x3, cables, balizas..."
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="text-slate-400 pr-2">
            <span className="material-symbols-outlined text-base">cancel</span>
          </button>
        )}
      </div>

      {/* Stock Metric Capsule Widgets (Bento Grid) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Capsule 1: Vallas */}
        <div className="neu-card rounded-2xl p-3.5 flex flex-col justify-between border border-white/70">
          <div className="flex items-center justify-between mb-2">
            <span className="w-9 h-9 rounded-xl neu-inset flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-lg">fence</span>
            </span>
            <span className="text-[10px] font-mono text-blue-700 font-bold px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
              850 disp.
            </span>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-500 uppercase font-mono">Vallas Altas / Bajas</h4>
            <p className="text-xl font-black text-slate-800 font-mono mt-0.5">
              850 <span className="text-xs text-slate-400 font-normal">/ 1.200 total</span>
            </p>
          </div>
          <div className="w-full neu-inset h-2 rounded-full mt-3 overflow-hidden p-0.5">
            <div className="bg-blue-600 h-full rounded-full w-[70.8%]"></div>
          </div>
        </div>

        {/* Capsule 2: Carpas */}
        <div className="neu-card rounded-2xl p-3.5 flex flex-col justify-between border border-white/70">
          <div className="flex items-center justify-between mb-2">
            <span className="w-9 h-9 rounded-xl neu-inset flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-lg">holiday_village</span>
            </span>
            <span className="text-[10px] font-mono text-blue-700 font-bold px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
              18 disp.
            </span>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-500 uppercase font-mono">Carpas (3x3, 4x3, 6x3)</h4>
            <p className="text-xl font-black text-slate-800 font-mono mt-0.5">
              18 <span className="text-xs text-slate-400 font-normal">/ 22 total</span>
            </p>
          </div>
          <div className="w-full neu-inset h-2 rounded-full mt-3 overflow-hidden p-0.5">
            <div className="bg-blue-600 h-full rounded-full w-[81.8%]"></div>
          </div>
        </div>

        {/* Capsule 3: Arcos de Meta */}
        <div className="neu-card rounded-2xl p-3.5 flex flex-col justify-between border border-white/70">
          <div className="flex items-center justify-between mb-2">
            <span className="w-9 h-9 rounded-xl neu-inset flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined text-lg">sports_score</span>
            </span>
            <span className="text-[10px] font-mono text-amber-800 font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
              6 disp.
            </span>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-500 uppercase font-mono">Arcos Meta &amp; Hinchables</h4>
            <p className="text-xl font-black text-slate-800 font-mono mt-0.5">
              6 <span className="text-xs text-slate-400 font-normal">/ 8 total</span>
            </p>
          </div>
          <div className="w-full neu-inset h-2 rounded-full mt-3 overflow-hidden p-0.5">
            <div className="bg-amber-600 h-full rounded-full w-[75%]"></div>
          </div>
        </div>

        {/* Capsule 4: Moqueta Azul */}
        <div className="neu-card rounded-2xl p-3.5 flex flex-col justify-between border border-white/70">
          <div className="flex items-center justify-between mb-2">
            <span className="w-9 h-9 rounded-xl neu-inset flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-lg">layers</span>
            </span>
            <span className="text-[10px] font-mono text-blue-700 font-bold px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
              24 rollos
            </span>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-500 uppercase font-mono">Moqueta Azul Oficial</h4>
            <p className="text-xl font-black text-slate-800 font-mono mt-0.5">
              24 <span className="text-xs text-slate-400 font-normal">/ 30 rollos</span>
            </p>
          </div>
          <div className="w-full neu-inset h-2 rounded-full mt-3 overflow-hidden p-0.5">
            <div className="bg-blue-600 h-full rounded-full w-[80%]"></div>
          </div>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
        <div className="flex items-center space-x-2 w-max">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold font-mono flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'neu-pill-active text-white shadow-md'
                    : 'neu-btn text-slate-600 hover:text-blue-600'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Inventory Item Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-tight">
            <span>Artículos Inventariados</span>
            <span className="text-slate-500 font-normal text-xs font-mono">
              ({filteredItems.length} materiales listados)
            </span>
          </h3>
          <button
            onClick={handleExportManifest}
            className="text-xs font-mono text-blue-700 font-bold flex items-center gap-1 hover:underline"
          >
            <span className="material-symbols-outlined text-sm">file_download</span>
            <span>Exportar Manifiesto</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="neu-card rounded-2xl p-4 flex flex-col justify-between hover:translate-y-[-2px] transition-transform border border-white/70 space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2 font-mono">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                      item.status === 'en_nave'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'cargado'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'en_nave'
                          ? 'bg-emerald-600'
                          : item.status === 'cargado'
                          ? 'bg-blue-600'
                          : 'bg-amber-600'
                      }`}
                    ></span>
                    <span>{item.statusText}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1 neu-inset px-2 py-0.5 rounded-md">
                    <span className="material-symbols-outlined text-xs">shelves</span>
                    <span>{item.location}</span>
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">{item.name}</h4>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-baseline justify-between mb-1.5 font-mono">
                  <span className="text-xs text-slate-500">Stock Disponible:</span>
                  <span className="text-sm font-black text-slate-900">
                    {item.stockAvailable}{' '}
                    <span className="text-slate-400 font-normal text-xs">/ {item.totalStock} tot.</span>
                  </span>
                </div>

                <div className="bg-amber-50 rounded-xl p-2 flex items-center gap-2 mb-3 border border-amber-200">
                  <span className="material-symbols-outlined text-amber-700 text-base shrink-0">
                    event_busy
                  </span>
                  <p className="text-[10px] font-mono text-amber-900 leading-tight">
                    {item.committedText}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTraceItem(item)}
                    className="flex-1 py-2 rounded-xl neu-btn font-mono text-xs font-bold text-blue-700 flex items-center justify-center gap-1 hover:text-blue-800"
                  >
                    <span className="material-symbols-outlined text-sm">qr_code</span>
                    <span>Trazabilidad</span>
                  </button>
                  <button
                    onClick={() => {
                      setToastMessage(`Editando ficha de ${item.name}`);
                      setTimeout(() => setToastMessage(null), 2000);
                    }}
                    className="px-3 py-2 rounded-xl neu-btn text-slate-500 hover:text-blue-700"
                    title="Editar artículo"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom Sticky Quick Action Bar */}
      <section className="neu-card rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/70">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-blue-600 shrink-0">
            <span className="material-symbols-outlined text-2xl">swap_horiz</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Movimientos de Entrada / Salida</h4>
            <p className="text-xs text-slate-500">
              Registra entregas de proveedores, devoluciones o expedición a carreras.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => {
              setToastMessage('Histórico de lotes descargado / sincronizado.');
              setTimeout(() => setToastMessage(null), 2500);
            }}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl neu-btn font-mono text-xs font-bold text-blue-700 flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">assignment_turned_in</span>
            <span>Histórico Lotes</span>
          </button>
          <button
            onClick={() => setShowMovementModal(true)}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl neu-btn-primary font-mono text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-base">add_box</span>
            <span>Registrar Salida / Entrada</span>
          </button>
        </div>
      </section>

      {/* Traceability Modal */}
      {traceItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="neu-card rounded-3xl p-5 w-full max-w-md space-y-4 border border-white/80">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono text-blue-700 font-bold block">
                  REGISTRO DE TRAZABILIDAD RFID / LOTE
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 mt-0.5">{traceItem.name}</h3>
              </div>
              <button
                onClick={() => setTraceItem(null)}
                className="w-8 h-8 rounded-full neu-circle flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="neu-inset rounded-2xl p-3 space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-200 py-1">
                <span className="text-slate-500">Ubicación Actual:</span>
                <span className="font-bold text-slate-800">{traceItem.location}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 py-1">
                <span className="text-slate-500">Stock Físico / Total:</span>
                <span className="font-bold text-blue-700">
                  {traceItem.stockAvailable} / {traceItem.totalStock} {traceItem.unit}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 py-1">
                <span className="text-slate-500">Asignación Inmediata:</span>
                <span className="font-bold text-amber-700">{traceItem.committedText}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Última Inspección:</span>
                <span className="font-bold text-emerald-700">26 Sep 2026 - Conforme</span>
              </div>
            </div>

            <button
              onClick={() => setTraceItem(null)}
              className="w-full py-2.5 neu-btn rounded-xl font-mono text-xs font-bold uppercase text-slate-700"
            >
              Cerrar Ficha
            </button>
          </div>
        </div>
      )}

      {/* Movement Modal */}
      {showMovementModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="neu-card rounded-3xl p-5 w-full max-w-md space-y-4 border border-white/80">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900 uppercase">
                Registrar Movimiento de Material
              </h3>
              <button
                onClick={() => setShowMovementModal(false)}
                className="w-8 h-8 rounded-full neu-circle flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setToastMessage('Movimiento registrado en inventario.');
                setShowMovementModal(false);
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Tipo de Operación</label>
                <div className="neu-inset rounded-xl px-3 py-1">
                  <select className="w-full bg-transparent border-0 font-bold text-slate-800 focus:ring-0 py-1">
                    <option>Salida a Carrera (Carga en Camión)</option>
                    <option>Entrada de Proveedor (Recepción)</option>
                    <option>Retorno de Carrera (Descarga nave)</option>
                    <option>Paso a Taller Técnico (Revisión)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Artículo</label>
                <div className="neu-inset rounded-xl px-3 py-1">
                  <select className="w-full bg-transparent border-0 font-bold text-slate-800 focus:ring-0 py-1">
                    {items.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Cantidad de Bultos / Uds</label>
                <div className="neu-inset rounded-xl px-3 py-1">
                  <input
                    type="number"
                    defaultValue={20}
                    className="w-full bg-transparent border-0 font-mono font-bold text-slate-800 focus:ring-0 py-1"
                    min="1"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMovementModal(false)}
                  className="flex-1 py-2.5 neu-btn rounded-xl font-bold uppercase text-slate-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 neu-btn-primary rounded-xl font-bold uppercase text-white"
                >
                  Confirmar Registro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
