import React, { useState } from 'react';

interface PrintRiderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintRiderModal: React.FC<PrintRiderModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<'resumen' | 'planos' | 'inventario' | 'seguridad'>('resumen');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="neu-card rounded-3xl p-5 sm:p-6 w-full max-w-2xl max-h-[90vh] flex flex-col space-y-4 border border-white/80">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl neu-circle flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-2xl">print</span>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-800 uppercase tracking-tight">
                Rider Técnico Oficial // Triatló Illa de Formentera 2026
              </h3>
              <p className="text-[11px] font-mono text-slate-500">Documento Técnico Maestro • 26 Páginas • Edición FETRI 2026</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full neu-circle flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Section selector */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar shrink-0 pb-1">
          <button
            onClick={() => setActiveSection('resumen')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
              activeSection === 'resumen' ? 'neu-pill-active text-white' : 'neu-btn text-slate-600'
            }`}
          >
            1. Resumen Ejecutivo
          </button>
          <button
            onClick={() => setActiveSection('planos')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
              activeSection === 'planos' ? 'neu-pill-active text-white' : 'neu-btn text-slate-600'
            }`}
          >
            2. Planos &amp; Acotaciones
          </button>
          <button
            onClick={() => setActiveSection('inventario')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
              activeSection === 'inventario' ? 'neu-pill-active text-white' : 'neu-btn text-slate-600'
            }`}
          >
            3. Inventario &amp; Logística
          </button>
          <button
            onClick={() => setActiveSection('seguridad')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
              activeSection === 'seguridad' ? 'neu-pill-active text-white' : 'neu-btn text-slate-600'
            }`}
          >
            4. Protocolo Emergencia
          </button>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 overflow-y-auto neu-inset rounded-2xl p-4 text-xs space-y-3 font-sans leading-relaxed text-slate-700">
          {activeSection === 'resumen' && (
            <div className="space-y-3">
              <div className="neu-card p-3 rounded-xl bg-white/70">
                <span className="font-mono text-[10px] text-blue-700 font-bold block">DATOS CLAVE DEL EVENTO</span>
                <p className="font-bold text-sm text-slate-900 mt-0.5">Triatló Illa de Formentera 2026 (12ª Edición)</p>
                <p className="text-slate-600 text-xs mt-1">
                  <strong>Fecha:</strong> 3 de Octubre de 2026 | <strong>Lugar:</strong> Es Pujols - Ses Salines
                </p>
                <p className="text-slate-600 text-xs">
                  <strong>Modalidades:</strong> Sprint (750m / 20km / 5km) y Olímpico (1.500m / 40km / 10km)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="neu-card p-2.5 rounded-xl bg-white/60">
                  <span className="text-slate-500 block">Atletas Inscritos:</span>
                  <span className="font-bold text-blue-600 text-sm">450 Atletas</span>
                </div>
                <div className="neu-card p-2.5 rounded-xl bg-white/60">
                  <span className="text-slate-500 block">Personal Técnico:</span>
                  <span className="font-bold text-emerald-600 text-sm">34 Operarios + 40 Voluntarios</span>
                </div>
              </div>

              <p className="text-slate-600">
                Este manual operativo estipula las directrices obligatorias de montaje para las infraestructuras de Es Pujols,
                zona de transición de boxes, pasillo de moqueta de 60 metros, balizamiento marítimo en playa y arco de meta con
                lastres homologados de 250kg contra vientos de rachas superiores a 40 nudos.
              </p>
            </div>
          )}

          {activeSection === 'planos' && (
            <div className="space-y-3">
              <div className="neu-card p-3 rounded-xl bg-white/70">
                <h4 className="font-bold text-slate-900 text-xs uppercase mb-1">Acotaciones Espaciales de Meta (Pág. 20)</h4>
                <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-slate-600">
                  <li><strong>Pasillo Atletas:</strong> 200 cm de anchura libre sobre moqueta azul ignífuga.</li>
                  <li><strong>Pasillo de Servicio / Crono:</strong> 140 cm exclusivo para personal y ambulancia.</li>
                  <li><strong>Base Arcos:</strong> 81 cm/u de hormigón estructural contrapesado.</li>
                  <li><strong>Delimitación:</strong> 280 metros de valla peatonal alta (2.00m) y baja (1.00m).</li>
                </ul>
              </div>
              <p className="font-mono text-[11px] text-blue-700">
                • Ver planos CAD interactivos en los módulos "Circuitos &amp; Perfiles" y "Lonas &amp; Fly Banners".
              </p>
            </div>
          )}

          {activeSection === 'inventario' && (
            <div className="space-y-3">
              <div className="neu-card p-3 rounded-xl bg-white/70">
                <h4 className="font-bold text-slate-900 text-xs uppercase mb-1">Cuadro de Suministros Global</h4>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between border-b border-slate-200 py-0.5">
                    <span>Agua Font Vella 0.5L:</span>
                    <span className="font-bold text-slate-800">4.248L (177 cajas totales)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 py-0.5">
                    <span>Hielo Lorenzo Vidal:</span>
                    <span className="font-bold text-slate-800">22 sacos asignados</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 py-0.5">
                    <span>Isotónico Coca-Cola:</span>
                    <span className="font-bold text-slate-800">250L botellas 1.5L + Aquarius</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>Fruta fresca cortada:</span>
                    <span className="font-bold text-slate-800">400 bananas + 250 naranjas</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'seguridad' && (
            <div className="space-y-3">
              <div className="neu-card p-3 rounded-xl bg-white/70">
                <h4 className="font-bold text-rose-800 text-xs uppercase mb-1">Protocolo Sanitario &amp; Evacuaciones</h4>
                <p className="text-[11px] text-slate-600 mb-2">
                  Canal oficial de emergencias: <strong>VHF CH 09 // 156.450 MHz</strong>.
                  Teléfono de guardia Dr. Pedro de Ureta: <strong>+34 656 319 397</strong>.
                </p>
                <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-lg text-rose-900 font-mono text-[10px]">
                  Corte vial estricto en PM-820 desde las 09:15h coordinado con Policía Local y Guardia Civil.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between gap-3 pt-2 shrink-0">
          <span className="text-[11px] font-mono text-slate-500">
            Formato: <strong>PDF A4 Vectorial</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 neu-btn rounded-xl text-xs font-bold uppercase text-slate-600"
            >
              Cerrar
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 neu-btn-primary rounded-xl text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">print</span>
              <span>Imprimir / Guardar PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
