import React, { useState } from 'react';

interface AvituallamientosViewProps {
  onOpenReportModal: () => void;
}

interface SupplyItem {
  id: string;
  stationId: '1' | '2' | '3';
  category: 'hidratacion' | 'nutricion' | 'mobiliario' | 'residuos';
  name: string;
  quantity: string;
  supplier: string;
  checked: boolean;
  statusText?: string;
  statusVariant?: 'ok' | 'warning' | 'alert';
  note?: string;
}

const INITIAL_SUPPLIES: SupplyItem[] = [
  // PUESTO 1: AV. MIRAMAR
  {
    id: 'p1-1',
    stationId: '1',
    category: 'hidratacion',
    name: 'Agua mineral Font Vella 0.5L',
    quantity: '38 cajas (912 botellines)',
    supplier: 'Consell / Font Vella',
    checked: true,
    statusText: 'En puesto (OK)',
    statusVariant: 'ok',
    note: 'Reserva estratégica: 99 cajas globales en almacén'
  },
  {
    id: 'p1-2',
    stationId: '1',
    category: 'hidratacion',
    name: 'Cubos y garrafas de enfriamiento',
    quantity: '4 cubos + 4 garrafas',
    supplier: 'Unisport Consulting',
    checked: true,
    statusText: 'Verificado',
    statusVariant: 'ok'
  },
  {
    id: 'p1-3',
    stationId: '1',
    category: 'hidratacion',
    name: 'Sacos de hielo picado',
    quantity: '8 sacos (6 en 1ª fase + 2 en 2ª)',
    supplier: 'Lorenzo Vidal',
    checked: true,
    statusText: 'En ruta activa',
    statusVariant: 'ok'
  },
  {
    id: 'p1-4',
    stationId: '1',
    category: 'nutricion',
    name: 'Vasos biodegradables Limfor',
    quantity: '1.000 unidades',
    supplier: 'Lorenzo Vidal',
    checked: true,
    statusText: 'Verificado',
    statusVariant: 'ok'
  },
  {
    id: 'p1-5',
    stationId: '1',
    category: 'mobiliario',
    name: 'Mobiliario operativo',
    quantity: '2 mesas plegables + 2 sillas',
    supplier: 'Consell Insular',
    checked: true,
    statusText: 'Instalado',
    statusVariant: 'ok'
  },
  {
    id: 'p1-6',
    stationId: '1',
    category: 'residuos',
    name: 'Cubos de residuos 250L + bolsas',
    quantity: '4 cubos industriales',
    supplier: 'Prezero / Elcacho',
    checked: true,
    statusText: 'Colocados',
    statusVariant: 'ok'
  },
  {
    id: 'p1-7',
    stationId: '1',
    category: 'residuos',
    name: 'Personal y voluntarios en puesto',
    quantity: '2 voluntarios asignados',
    supplier: 'Organización / Voluntariado',
    checked: true,
    statusText: 'Posicionados',
    statusVariant: 'ok'
  },

  // PUESTO 2: S'ABEUREDETA
  {
    id: 'p2-1',
    stationId: '2',
    category: 'hidratacion',
    name: 'Agua Font Vella 0.5L',
    quantity: '45 cajas recibidas (40 solicitadas)',
    supplier: 'Consell / Font Vella',
    checked: true,
    statusText: '+5 cajas excedente',
    statusVariant: 'warning',
    note: 'Separar 4 cajas de botellines para punto S\'Avaradero'
  },
  {
    id: 'p2-2',
    stationId: '2',
    category: 'hidratacion',
    name: 'Isotónico Coca-Cola 1.5L',
    quantity: '20 de 28 botellas (166L)',
    supplier: 'Unisport / Coca-Cola',
    checked: false,
    statusText: 'Faltan 8 botellas',
    statusVariant: 'alert',
    note: 'Furgón 2 en camino con las 8 botellas pendientes'
  },
  {
    id: 'p2-3',
    stationId: '2',
    category: 'hidratacion',
    name: 'Sacos de hielo técnico',
    quantity: '8 sacos (6 en fase 1 + 2 fase 2)',
    supplier: 'Lorenzo Vidal',
    checked: true,
    statusText: '6 recibidos, 2 pendientes',
    statusVariant: 'ok'
  },
  {
    id: 'p2-4',
    stationId: '2',
    category: 'hidratacion',
    name: 'Cubos y garrafas enfriamiento',
    quantity: '8 cubos + 12 garrafas (Ratio 1.5/cubo)',
    supplier: 'Unisport',
    checked: true,
    statusText: 'Completado',
    statusVariant: 'ok'
  },
  {
    id: 'p2-5',
    stationId: '2',
    category: 'nutricion',
    name: 'Fruta fresca preparada',
    quantity: '250 plátanos (en 2) + 150 naranjas (en 4)',
    supplier: 'Lorenzo Vidal',
    checked: true,
    statusText: 'Cortada y en bandejas',
    statusVariant: 'ok',
    note: '6 bandejas, cuchillos y guantes sanitarios incluidos'
  },
  {
    id: 'p2-6',
    stationId: '2',
    category: 'nutricion',
    name: 'Vasos Limfor',
    quantity: '1.000 unidades',
    supplier: 'Lorenzo Vidal',
    checked: true,
    statusText: 'Listos',
    statusVariant: 'ok'
  },
  {
    id: 'p2-7',
    stationId: '2',
    category: 'mobiliario',
    name: 'Carpa estructural 6x3m + 6 mesas',
    quantity: '1 carpa + 6 mesas plegables',
    supplier: 'Consell Insular',
    checked: true,
    statusText: 'Montada',
    statusVariant: 'ok'
  },
  {
    id: 'p2-8',
    stationId: '2',
    category: 'mobiliario',
    name: 'Sillas técnicas de apoyo',
    quantity: '5 de 8 sillas (-3 faltan)',
    supplier: 'Consell Insular',
    checked: false,
    statusText: 'Faltan 3 sillas',
    statusVariant: 'alert',
    note: 'Solicitadas a logística de zona de boxes'
  },
  {
    id: 'p2-9',
    stationId: '2',
    category: 'residuos',
    name: 'Contenedores 250L + Megafonía',
    quantity: '4 cubos grandes + 1 altavoz autónomo',
    supplier: 'Prezero / Lorenzo',
    checked: true,
    statusText: 'Operativo',
    statusVariant: 'ok'
  },
  {
    id: 'p2-10',
    stationId: '2',
    category: 'residuos',
    name: 'Equipo de voluntarios con chaleco',
    quantity: '6 voluntarios asignados',
    supplier: 'Organización',
    checked: true,
    statusText: 'En posición',
    statusVariant: 'ok'
  },

  // PUESTO 3: META & RECUPERACIÓN
  {
    id: 'p3-1',
    stationId: '3',
    category: 'hidratacion',
    name: 'Bidones oficiales Triatló Formentera',
    quantity: '360 bidones serigrafiados',
    supplier: 'Consell Insular',
    checked: true,
    statusText: 'Listos para entrega',
    statusVariant: 'ok',
    note: '8 cubos exclusivos para recogida selectiva de bidones'
  },
  {
    id: 'p3-2',
    stationId: '3',
    category: 'hidratacion',
    name: 'Dispensadores de Agua 3 Glops',
    quantity: '20 garrafas + 5 soportes y pinchos',
    supplier: 'Unisport / 3 Glops',
    checked: true,
    statusText: 'Instalados y probados',
    statusVariant: 'ok'
  },
  {
    id: 'p3-3',
    stationId: '3',
    category: 'hidratacion',
    name: 'Botellines Font Vella 0.5L',
    quantity: '14 cajas (336 botellas)',
    supplier: 'Consell / Font Vella',
    checked: true,
    statusText: 'En frío',
    statusVariant: 'ok'
  },
  {
    id: 'p3-4',
    stationId: '3',
    category: 'hidratacion',
    name: 'Sacos de hielo en escamas',
    quantity: '12 sacos recibidos (8 solicitados)',
    supplier: 'Lorenzo Vidal',
    checked: true,
    statusText: '+4 para Zona Podio',
    statusVariant: 'warning',
    note: 'Desviar 4 sacos de hielo para Manolo (Podio y protocolo)'
  },
  {
    id: 'p3-5',
    stationId: '3',
    category: 'hidratacion',
    name: 'Dispensador oficial Coca-Cola / Aquarius',
    quantity: '100L Aquarius (11 cajas / 66 bot.)',
    supplier: 'Norbey / Coca-Cola',
    checked: true,
    statusText: 'Conectado a red',
    statusVariant: 'ok'
  },
  {
    id: 'p3-6',
    stationId: '3',
    category: 'nutricion',
    name: 'Vasos cartón y vasos Beer Palma',
    quantity: '400 de cartón + 100 reutilizables',
    supplier: 'Unisport / Limfor',
    checked: true,
    statusText: 'En mostradores',
    statusVariant: 'ok'
  },
  {
    id: 'p3-7',
    stationId: '3',
    category: 'nutricion',
    name: 'Fruta post-meta (Plátanos, Manzanas, Naranjas)',
    quantity: '150 bananas + 150 manzanas + 100 naranjas',
    supplier: 'Lorenzo Vidal',
    checked: true,
    statusText: 'Lavada y cortada',
    statusVariant: 'ok'
  },
  {
    id: 'p3-8',
    stationId: '3',
    category: 'mobiliario',
    name: 'Carpa principal 6x3m + 4x3m Norbey',
    quantity: '2 carpas + 6 mesas + 6 sillas',
    supplier: 'Consell / Norbey',
    checked: true,
    statusText: 'Estructuras fijadas',
    statusVariant: 'ok'
  },
  {
    id: 'p3-9',
    stationId: '3',
    category: 'residuos',
    name: 'Contenedores selectivos Prezero',
    quantity: '20 cubos generales + 2 grandes',
    supplier: 'Prezero',
    checked: true,
    statusText: 'Distribuidos',
    statusVariant: 'ok'
  },
  {
    id: 'p3-10',
    stationId: '3',
    category: 'residuos',
    name: 'Equipo de recuperación y avituallamiento',
    quantity: '8 voluntarios con chaleco',
    supplier: 'Organización',
    checked: true,
    statusText: 'En posición',
    statusVariant: 'ok'
  }
];

export const AvituallamientosView: React.FC<AvituallamientosViewProps> = ({ onOpenReportModal }) => {
  const [selectedStation, setSelectedStation] = useState<'all' | '1' | '2' | '3'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hidratacion' | 'nutricion' | 'mobiliario' | 'residuos'>('all');
  const [supplies, setSupplies] = useState<SupplyItem[]>(INITIAL_SUPPLIES);
  const [showStockModal, setShowStockModal] = useState(false);
  const [replenishData, setReplenishData] = useState({ point: '2', product: 'hielo', qty: '4' });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setSupplies((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleMarkAll = (stationId: '1' | '2' | '3', checkState: boolean) => {
    setSupplies((prev) =>
      prev.map((item) => (item.stationId === stationId ? { ...item, checked: checkState } : item))
    );
    setToastMessage(checkState ? `Todos los items del Puesto ${stationId} marcados como listos.` : `Puesto ${stationId} reseteado.`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleReplenishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage(`Reposición de ${replenishData.qty} uds de ${replenishData.product.toUpperCase()} enviada a Puesto ${replenishData.point}.`);
    setShowStockModal(false);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter supplies
  const filteredSupplies = supplies.filter((item) => {
    const matchesStation = selectedStation === 'all' || item.stationId === selectedStation;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesStation && matchesCategory;
  });

  // Calculate stats
  const totalItems = supplies.length;
  const checkedItems = supplies.filter((s) => s.checked).length;
  const percentage = Math.round((checkedItems / totalItems) * 100);

  const p1Total = supplies.filter((s) => s.stationId === '1').length;
  const p1Checked = supplies.filter((s) => s.stationId === '1' && s.checked).length;

  const p2Total = supplies.filter((s) => s.stationId === '2').length;
  const p2Checked = supplies.filter((s) => s.stationId === '2' && s.checked).length;

  const p3Total = supplies.filter((s) => s.stationId === '3').length;
  const p3Checked = supplies.filter((s) => s.stationId === '3' && s.checked).length;

  return (
    <div className="w-full max-w-2xl mx-auto px-3.5 sm:px-4 pt-20 pb-24 space-y-4">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="neu-card p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold font-mono animate-fadeIn flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)}>
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* 1. Header Progress Bar & Visual Telemetry Card */}
      <section className="neu-card p-4 sm:p-5 rounded-3xl border border-white/80 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl neu-circle flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-lg">water_drop</span>
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
                Control de Avituallamientos
              </h1>
              <p className="text-[10px] font-mono font-bold text-slate-500">
                RIDER TÉCNICO PÁG. 24-26 · 3 PUESTOS
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-lg font-black text-blue-600 font-mono">
              {checkedItems}/{totalItems}
            </span>
            <span className="text-[10px] font-mono text-slate-500 block font-bold">
              {percentage}% VERIFICADO
            </span>
          </div>
        </div>

        {/* Global Progress Line */}
        <div className="w-full neu-inset h-2.5 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {/* 3 Quick Status Cards */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={() => setSelectedStation('1')}
            className={`p-2 rounded-2xl text-left transition-all ${
              selectedStation === '1'
                ? 'neu-pill-active text-white shadow-xs'
                : 'neu-card hover:bg-white/80'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-0.5">
              <span>P1 MIRAMAR</span>
              <span>{p1Checked}/{p1Total}</span>
            </div>
            <p className="text-[10px] opacity-80 truncate">Km 0.8 / Vueltas</p>
            <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100/80 text-emerald-800">
              LISTO
            </span>
          </button>

          <button
            onClick={() => setSelectedStation('2')}
            className={`p-2 rounded-2xl text-left transition-all ${
              selectedStation === '2'
                ? 'bg-amber-600 text-white shadow-md'
                : 'neu-card hover:bg-white/80'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-0.5">
              <span>P2 S'ABEUREDETA</span>
              <span>{p2Checked}/{p2Total}</span>
            </div>
            <p className="text-[10px] opacity-80 truncate">Intermedio Bike/Run</p>
            <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-100 text-amber-900">
              ATENCIÓN
            </span>
          </button>

          <button
            onClick={() => setSelectedStation('3')}
            className={`p-2 rounded-2xl text-left transition-all ${
              selectedStation === '3'
                ? 'neu-pill-active text-white shadow-xs'
                : 'neu-card hover:bg-white/80'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-0.5">
              <span>P3 META</span>
              <span>{p3Checked}/{p3Total}</span>
            </div>
            <p className="text-[10px] opacity-80 truncate">Arco de Llegada</p>
            <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-100 text-blue-900">
              OPERATIVO
            </span>
          </button>
        </div>
      </section>

      {/* 2. Station Selector Bar */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedStation('all')}
            className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-bold tracking-wider transition-all ${
              selectedStation === 'all'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'neu-btn text-slate-700'
            }`}
          >
            TODOS ({totalItems})
          </button>
          <button
            onClick={() => setSelectedStation('1')}
            className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-bold tracking-wider transition-all ${
              selectedStation === '1'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'neu-btn text-slate-700'
            }`}
          >
            P1: MIRAMAR
          </button>
          <button
            onClick={() => setSelectedStation('2')}
            className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-bold tracking-wider transition-all ${
              selectedStation === '2'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'neu-btn text-slate-700'
            }`}
          >
            P2: S'ABEUREDETA
          </button>
          <button
            onClick={() => setSelectedStation('3')}
            className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-bold tracking-wider transition-all ${
              selectedStation === '3'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'neu-btn text-slate-700'
            }`}
          >
            P3: META
          </button>
        </div>

        {/* Action to Mark/Unmark station */}
        {selectedStation !== 'all' && (
          <button
            onClick={() => handleMarkAll(selectedStation, true)}
            className="text-[10px] font-mono font-bold text-blue-600 hover:text-blue-800 shrink-0 underline decoration-blue-400 pl-2"
          >
            Verificar todo P{selectedStation}
          </button>
        )}
      </div>

      {/* 3. Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 text-xs">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-2.5 py-1 rounded-xl font-mono text-[10px] font-bold flex items-center gap-1 shrink-0 ${
            selectedCategory === 'all' ? 'neu-inset text-blue-600 font-black' : 'neu-btn text-slate-600'
          }`}
        >
          <span>Todos los tipos</span>
        </button>
        <button
          onClick={() => setSelectedCategory('hidratacion')}
          className={`px-2.5 py-1 rounded-xl font-mono text-[10px] font-bold flex items-center gap-1 shrink-0 ${
            selectedCategory === 'hidratacion' ? 'neu-inset text-blue-600 font-black' : 'neu-btn text-slate-600'
          }`}
        >
          <span className="material-symbols-outlined text-xs">water_drop</span>
          <span>Hidratación</span>
        </button>
        <button
          onClick={() => setSelectedCategory('nutricion')}
          className={`px-2.5 py-1 rounded-xl font-mono text-[10px] font-bold flex items-center gap-1 shrink-0 ${
            selectedCategory === 'nutricion' ? 'neu-inset text-amber-600 font-black' : 'neu-btn text-slate-600'
          }`}
        >
          <span className="material-symbols-outlined text-xs">nutrition</span>
          <span>Fruta & Sólidos</span>
        </button>
        <button
          onClick={() => setSelectedCategory('mobiliario')}
          className={`px-2.5 py-1 rounded-xl font-mono text-[10px] font-bold flex items-center gap-1 shrink-0 ${
            selectedCategory === 'mobiliario' ? 'neu-inset text-indigo-600 font-black' : 'neu-btn text-slate-600'
          }`}
        >
          <span className="material-symbols-outlined text-xs">chair</span>
          <span>Mobiliario</span>
        </button>
        <button
          onClick={() => setSelectedCategory('residuos')}
          className={`px-2.5 py-1 rounded-xl font-mono text-[10px] font-bold flex items-center gap-1 shrink-0 ${
            selectedCategory === 'residuos' ? 'neu-inset text-emerald-600 font-black' : 'neu-btn text-slate-600'
          }`}
        >
          <span className="material-symbols-outlined text-xs">delete</span>
          <span>Residuos & Staff</span>
        </button>
      </div>

      {/* 4. Critical Warning Notice if on Station 2 */}
      {(selectedStation === 'all' || selectedStation === '2') && (
        <div className="neu-card p-3 sm:p-3.5 rounded-2xl bg-amber-50/70 border border-amber-300 text-amber-900 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold font-mono text-[11px] text-amber-800">
            <span className="material-symbols-outlined text-base text-amber-600">priority_high</span>
            <span>INSTRUCCIÓN LOGÍSTICA PUESTO 2 (S'ABEUREDETA):</span>
          </div>
          <p className="text-[12px] leading-relaxed text-slate-800">
            Separar <strong className="text-amber-900">4 cajas de botellines para S'Avaradero</strong>. Ratio de enfriamiento:{' '}
            <strong className="text-amber-900">1.5 garrafas por cubo</strong>. Furgón 2 en camino con las 8 botellas de isotónico pendientes.
          </p>
        </div>
      )}

      {/* 5. Clear, Visual & Intuitive Checklist of Items */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
            CHECKLIST DEL MATERIAL ({filteredSupplies.length} ITEMS)
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            Toca para marcar / verificar
          </span>
        </div>

        <div className="space-y-2">
          {filteredSupplies.map((item) => {
            const stationBadge =
              item.stationId === '1'
                ? { label: 'P1 MIRAMAR', color: 'bg-blue-100 text-blue-800' }
                : item.stationId === '2'
                ? { label: 'P2 S\'ABEUREDETA', color: 'bg-amber-100 text-amber-900' }
                : { label: 'P3 META', color: 'bg-emerald-100 text-emerald-800' };

            const categoryIcon =
              item.category === 'hidratacion'
                ? 'water_drop'
                : item.category === 'nutricion'
                ? 'nutrition'
                : item.category === 'mobiliario'
                ? 'chair'
                : 'recycling';

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`neu-card p-3 rounded-2xl flex items-start gap-3 transition-all cursor-pointer border ${
                  item.checked
                    ? 'border-emerald-200/80 bg-white/95'
                    : 'border-white/80 hover:bg-white'
                }`}
              >
                {/* Visual Checkbox */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    item.checked
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'neu-inset text-slate-300 hover:text-slate-400'
                  }`}
                >
                  <span className="material-symbols-outlined text-base font-bold">
                    {item.checked ? 'check' : ''}
                  </span>
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                    {selectedStation === 'all' && (
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${stationBadge.color}`}>
                        {stationBadge.label}
                      </span>
                    )}
                    <span className="text-[9px] font-mono font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[11px]">{categoryIcon}</span>
                      {item.supplier}
                    </span>
                  </div>

                  <h3
                    className={`text-[13px] font-bold leading-tight ${
                      item.checked ? 'text-slate-900' : 'text-slate-800'
                    }`}
                  >
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between gap-2 mt-1">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                      {item.quantity}
                    </span>

                    {item.statusText && (
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          item.statusVariant === 'alert'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : item.statusVariant === 'warning'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
                        }`}
                      >
                        {item.statusText}
                      </span>
                    )}
                  </div>

                  {item.note && (
                    <div className="mt-1.5 text-[11px] text-amber-800 bg-amber-50/80 px-2 py-1 rounded-lg border border-amber-200/60 font-medium">
                      ⚠️ {item.note}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Quick Action Buttons */}
      <section className="space-y-2.5 pt-2">
        <button
          onClick={() => setShowStockModal(true)}
          className="w-full py-3.5 neu-btn-primary text-white text-xs font-extrabold uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          <span>Registrar Reposición de Hielo / Bebida</span>
        </button>

        <button
          onClick={onOpenReportModal}
          className="w-full py-3 neu-btn text-amber-800 text-xs font-bold uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all border border-amber-200"
        >
          <span className="material-symbols-outlined text-lg text-amber-600">report_problem</span>
          <span>Reportar Incidencia o Falta de Stock</span>
        </button>
      </section>

      {/* Stock Replenish Modal */}
      {showStockModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="neu-card rounded-3xl p-5 w-full max-w-md space-y-4 border border-white/80">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="font-bold text-sm uppercase text-slate-900">
                Registrar Reposición de Stock
              </h3>
              <button
                onClick={() => setShowStockModal(false)}
                className="w-8 h-8 rounded-full neu-circle flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleReplenishSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  Punto de Avituallamiento
                </label>
                <div className="neu-inset rounded-xl px-3 py-1.5">
                  <select
                    value={replenishData.point}
                    onChange={(e) => setReplenishData({ ...replenishData, point: e.target.value })}
                    className="w-full bg-transparent border-0 font-bold text-slate-800 focus:ring-0 py-1"
                  >
                    <option value="1">1. Av. Miramar (Km 0.8)</option>
                    <option value="2">2. S'Abeuredeta (Intermedio)</option>
                    <option value="3">3. Meta &amp; Recuperación</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  Producto a Reponer
                </label>
                <div className="neu-inset rounded-xl px-3 py-1.5">
                  <select
                    value={replenishData.product}
                    onChange={(e) => setReplenishData({ ...replenishData, product: e.target.value })}
                    className="w-full bg-transparent border-0 font-bold text-slate-800 focus:ring-0 py-1"
                  >
                    <option value="hielo">Sacos de Hielo (Lorenzo Vidal)</option>
                    <option value="agua">Cajas Botellines Font Vella 0.5L</option>
                    <option value="isotonico">Botellas Isotónico Coca-Cola 1.5L</option>
                    <option value="vasos">Vasos Limfor</option>
                    <option value="fruta">Fruta fresca cortada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">
                  Cantidad Repuesta
                </label>
                <div className="neu-inset rounded-xl px-3 py-1.5">
                  <input
                    type="number"
                    value={replenishData.qty}
                    onChange={(e) => setReplenishData({ ...replenishData, qty: e.target.value })}
                    className="w-full bg-transparent border-0 font-mono font-bold text-slate-800 focus:ring-0 py-1"
                    min="1"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowStockModal(false)}
                  className="flex-1 py-2.5 neu-btn rounded-xl font-bold uppercase text-slate-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 neu-btn-primary rounded-xl font-bold uppercase text-white"
                >
                  Guardar Entrada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
