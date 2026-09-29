import React, { useState } from 'react';

interface TruckChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TruckItem {
  id: string;
  name: string;
  qty: string;
  weight: string;
  loaded: boolean;
}

export const TruckChecklistModal: React.FC<TruckChecklistModalProps> = ({ isOpen, onClose }) => {
  const [truckId, setTruckId] = useState('Camión #03 - Furgón Pesado (Dénia - Savina)');
  const [items, setItems] = useState<TruckItem[]>([
    { id: '1', name: 'Vallas Altas Perimetrales 2.00m', qty: '180 uds', weight: '2.160 kg', loaded: true },
    { id: '2', name: 'Barras de apoyo bicicletas + pies', qty: '75 barras / 85 pies', weight: '980 kg', loaded: true },
    { id: '3', name: 'Bases de hormigón arcos (81cm)', qty: '8 uds', weight: '1.200 kg', loaded: true },
    { id: '4', name: 'Moqueta Azul Ignífuga 200cm', qty: '6 rollos (300m)', weight: '420 kg', loaded: false },
    { id: '5', name: 'Cestas de transición numeradas', qty: '450 uds', weight: '310 kg', loaded: false },
    { id: '6', name: 'Balizas y conos pesados reflectantes', qty: '120 uds', weight: '360 kg', loaded: false }
  ]);

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, loaded: !item.loaded } : item))
    );
  };

  const loadedCount = items.filter((i) => i.loaded).length;
  const progressPercent = Math.round((loadedCount / items.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="neu-card rounded-3xl p-5 sm:p-6 w-full max-w-lg space-y-4 border border-white/80">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl neu-circle flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-2xl">local_shipping</span>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-800 uppercase tracking-tight">
                Checklist de Carga de Camión
              </h3>
              <p className="text-[11px] font-mono text-slate-500">Plan de Estiba &amp; Pesaje Oficial • Formentera</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full neu-circle flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Selected Vehicle Selector */}
        <div className="neu-inset rounded-2xl p-2.5 space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
            Vehículo de Transporte Seleccionado
          </span>
          <select
            value={truckId}
            onChange={(e) => setTruckId(e.target.value)}
            className="w-full bg-transparent border-0 text-xs font-bold text-blue-700 focus:ring-0 cursor-pointer p-0"
          >
            <option value="Camión #03 - Furgón Pesado (Dénia - Savina)">Camión #03 - Furgón Pesado (Dénia - Savina)</option>
            <option value="Furgón 2 - Logística Rápida (Trasmapi Express)">Furgón 2 - Logística Rápida (Trasmapi Express)</option>
            <option value="Furgoneta 1 - Material Técnico & Balizamiento">Furgoneta 1 - Material Técnico & Balizamiento</option>
          </select>
        </div>

        {/* Estiba Progress */}
        <div className="neu-subcard p-3 rounded-2xl space-y-2 border border-slate-200">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600 font-bold">ESTADO DE ESTIBA:</span>
            <span className="text-blue-600 font-bold">
              {loadedCount}/{items.length} CARGADOS ({progressPercent}%)
            </span>
          </div>
          <div className="w-full neu-inset h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all border ${
                item.loaded
                  ? 'bg-emerald-50/70 border-emerald-300 text-slate-800'
                  : 'neu-card hover:bg-white text-slate-700 border-white/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                    item.loaded ? 'bg-emerald-600 text-white shadow-xs' : 'neu-inset text-slate-400'
                  }`}
                >
                  {item.loaded && <span className="material-symbols-outlined text-sm font-bold">check</span>}
                </div>
                <div>
                  <span className="text-xs font-bold block">{item.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {item.qty} · Peso est.: {item.weight}
                  </span>
                </div>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  item.loaded ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200/80 text-slate-600'
                }`}
              >
                {item.loaded ? 'ESTIBADO' : 'PENDIENTE'}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 neu-btn rounded-2xl text-xs font-bold uppercase tracking-wider text-slate-600"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl neu-btn-primary flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">check_circle</span>
            <span>Confirmar Carga &amp; Salida</span>
          </button>
        </div>
      </div>
    </div>
  );
};
