import React, { useState } from 'react';
import { NOTIFICATIONS } from '../../data/mockData';
import { NotificationItem } from '../../types';

interface AvisosViewProps {
  onOpenBroadcastModal: () => void;
}

export const AvisosView: React.FC<AvisosViewProps> = ({ onOpenBroadcastModal }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'urgente' | 'logistica' | 'rider'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleAck = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ackReceived: !n.ackReceived, isRead: true } : n))
    );
    setToastMessage('Acuse de recibo (ACK) transmitido por radio walkie.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setToastMessage('Todas las notificaciones marcadas como leídas.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filtered = notifications.filter((n) => {
    if (activeFilter === 'urgente') return n.category === 'urgente';
    if (activeFilter === 'logistica') return n.category === 'transporte' || n.category === 'proveedor';
    if (activeFilter === 'rider') return n.category === 'walkie' || n.category === 'oficial';
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-20 pb-20 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="neu-card p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold font-mono animate-fadeIn flex items-center justify-between">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)}>
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Subheader Status Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Centro de Notificaciones</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-200">
                {unreadCount} NO LEÍDOS
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Canal de radio walkie digital, incidencias y logística en tiempo real
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          className="neu-btn px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700"
        >
          <span className="material-symbols-outlined text-sm">done_all</span>
          <span className="hidden sm:inline">Marcar Leídos</span>
        </button>
      </div>

      {/* Tab Filter Selector */}
      <section className="neu-inset p-1.5 rounded-2xl flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-xs">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
            activeFilter === 'all'
              ? 'neu-pill-active text-white shadow-sm'
              : 'neu-btn text-slate-600 hover:text-blue-600'
          }`}
        >
          <span className="material-symbols-outlined text-base">inbox</span>
          <span>Todas</span>
          <span className="bg-white/20 px-1.5 py-0.2 rounded-full text-[10px] font-bold">12</span>
        </button>

        <button
          onClick={() => setActiveFilter('urgente')}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
            activeFilter === 'urgente'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'neu-btn text-slate-600 hover:text-rose-600'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span>Urgentes</span>
          <span className="bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-full text-[10px] font-bold">3</span>
        </button>

        <button
          onClick={() => setActiveFilter('logistica')}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
            activeFilter === 'logistica'
              ? 'neu-pill-active text-white shadow-sm'
              : 'neu-btn text-slate-600 hover:text-blue-600'
          }`}
        >
          <span className="material-symbols-outlined text-base">inventory_2</span>
          <span>Logística</span>
          <span className="bg-slate-200 px-1.5 py-0.2 rounded-full text-[10px] font-bold text-slate-700">5</span>
        </button>

        <button
          onClick={() => setActiveFilter('rider')}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
            activeFilter === 'rider'
              ? 'neu-pill-active text-white shadow-sm'
              : 'neu-btn text-slate-600 hover:text-blue-600'
          }`}
        >
          <span className="material-symbols-outlined text-base">directions_bike</span>
          <span>Cambios de Rider</span>
          <span className="bg-slate-200 px-1.5 py-0.2 rounded-full text-[10px] font-bold text-slate-700">4</span>
        </button>
      </section>

      {/* SECTION: AVISOS CRÍTICOS / INCIDENCIAS ACTIVAS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-600 text-xl fill-icon">warning</span>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">
              Avisos Críticos / Incidencias Activas
            </h3>
          </div>
          <span className="text-[10px] font-mono text-rose-700 font-bold uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
            3 Prioritarias
          </span>
        </div>

        {/* Bento Grid for Critical Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Alerta 1 */}
          <article className="neu-card-white p-4 rounded-2xl flex flex-col justify-between border-l-4 border-l-rose-600 relative space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1.5 font-mono">
                <span className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-800 text-[10px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">crisis_alert</span>
                  URGENTE
                </span>
                <span className="text-[10px] text-slate-400">Hace 6 min</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                Faltan 3 sillas en Avituallamiento 2 (S'Abeuredeta)
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                Reclamado formalmente al Consell. Cuadrilla B esperando vehículo de reposición para abrir sombra.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="text-[10px] font-bold text-slate-500">Triatló Formentera</span>
              <button
                onClick={() => alert('ACK confirmado y transmitido al Consell.')}
                className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-bold flex items-center gap-1 active:scale-95 transition-all text-[11px]"
              >
                <span className="material-symbols-outlined text-xs font-bold">check_circle</span>
                <span>ACK</span>
              </button>
            </div>
          </article>

          {/* Alerta 2 */}
          <article className="neu-card-white p-4 rounded-2xl flex flex-col justify-between border-l-4 border-l-amber-500 relative space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1.5 font-mono">
                <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">local_shipping</span>
                  TRANSPORTE
                </span>
                <span className="text-[10px] text-slate-400">Hace 18 min</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                Ajuste en camión: 4 cajas de agua hacia S'Avaradero
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                Sobrecupo detectado en furgón 3. El chófer debe desviarse 2 km antes del primer corte.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="text-[10px] font-bold text-slate-500">Galatzó Trail</span>
              <a
                href="tel:+34618188545"
                className="px-2.5 py-1 rounded-xl neu-btn text-amber-800 font-bold flex items-center gap-1 text-[11px]"
              >
                <span className="material-symbols-outlined text-xs">call</span>
                <span>Chófer</span>
              </a>
            </div>
          </article>

          {/* Alerta 3 */}
          <article className="neu-card-white p-4 rounded-2xl flex flex-col justify-between border-l-4 border-l-blue-600 relative space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1.5 font-mono">
                <span className="px-2 py-0.5 rounded-lg bg-blue-100 text-blue-900 text-[10px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">directions_boat</span>
                  PROVEEDOR
                </span>
                <span className="text-[10px] text-slate-400">Hace 34 min</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                Trasmed confirma entrega de lonas en Moll Vell
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                Pallet #408 disponible en Palma para recogida inmediata de estiba. Se requiere firma.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
              <span className="text-[10px] font-bold text-slate-500">Triatló Formentera</span>
              <button
                onClick={() => alert('Mostrando Albarán digital de Trasmed #408.')}
                className="px-2.5 py-1 rounded-xl neu-btn text-blue-700 font-bold flex items-center gap-1 text-[11px]"
              >
                <span className="material-symbols-outlined text-xs">description</span>
                <span>Albarán</span>
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION: FEED DE NOTIFICACIONES Y ACTUALIZACIONES */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between pt-2 px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-lg">dynamic_feed</span>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">
              Notificaciones Recientes &amp; Cuadrillas
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {filtered.length} actualizaciones
          </span>
        </div>

        <div className="space-y-3">
          {filtered.map((item) => (
            <article
              key={item.id}
              className={`neu-card-white p-4 sm:p-5 rounded-3xl space-y-3 transition-transform hover:-translate-y-0.5 border ${
                item.isRead ? 'border-slate-200' : 'border-blue-300 shadow-md'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined text-xl">
                      {item.category === 'walkie'
                        ? 'settings_voice'
                        : item.category === 'oficial'
                        ? 'traffic'
                        : 'storefront'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">{item.author}</span>
                      <span className="text-[11px] text-slate-500">· {item.role}</span>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {item.timeAgo} · Transmitido vía Walkie Digital / App
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] neu-inset text-slate-700 font-semibold">
                    {item.eventTitle}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold ${
                      item.ackReceived
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.ackReceived ? 'ACK RECIBIDO' : 'PENDIENTE ACK'}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl neu-inset text-xs font-sans text-slate-800 border border-white/60 leading-relaxed">
                "{item.message}"
              </div>

              {/* Action Cluster */}
              <div className="flex flex-wrap items-center justify-end gap-2 pt-1 font-mono text-xs">
                <button
                  onClick={() => alert(`Detalle: ${item.message}`)}
                  className="px-3 py-1.5 rounded-xl neu-btn text-slate-700 hover:text-blue-600 flex items-center gap-1 font-bold text-[11px]"
                >
                  <span className="material-symbols-outlined text-xs">visibility</span>
                  <span>VER DETALLE</span>
                </button>
                <button
                  onClick={() => alert(`Abriendo canal de respuesta directa con ${item.author}...`)}
                  className="px-3 py-1.5 rounded-xl neu-btn text-slate-700 hover:text-blue-600 flex items-center gap-1 font-bold text-[11px]"
                >
                  <span className="material-symbols-outlined text-xs">reply</span>
                  <span>RESPONDER</span>
                </button>
                <button
                  onClick={() => toggleAck(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1 font-bold text-[11px] transition-all ${
                    item.ackReceived
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'neu-btn text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">
                    {item.ackReceived ? 'check' : 'task_alt'}
                  </span>
                  <span>{item.ackReceived ? 'ACK CONFIRMADO' : 'DAR ACUSE RECIBO / ACK'}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Prominent CTA */}
      <div className="pt-2">
        <button
          onClick={onOpenBroadcastModal}
          className="w-full py-4 px-6 rounded-2xl neu-btn-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-xl">broadcast_on_personal</span>
          <span>ENVIAR AVISO A TODA LA CUADRILLA</span>
        </button>
        <p className="text-center font-mono text-[10px] text-slate-400 mt-2">
          Emitirá notificación push con sonido prioritario a 34 técnicos en campo
        </p>
      </div>
    </div>
  );
};
