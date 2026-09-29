import React, { useState } from 'react';

interface BroadcastAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string, priority: 'normal' | 'alta' | 'urgente') => void;
}

export const BroadcastAlertModal: React.FC<BroadcastAlertModalProps> = ({
  isOpen,
  onClose,
  onSend
}) => {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'normal' | 'alta' | 'urgente'>('alta');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message, priority);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="neu-card rounded-3xl p-5 sm:p-6 w-full max-w-lg space-y-4 border border-white/80">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl neu-circle flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-2xl">broadcast_on_personal</span>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-800 uppercase tracking-tight">
                Emitir Aviso a Toda la Cuadrilla
              </h3>
              <p className="text-[11px] font-mono text-slate-500">Notificación Push Prioritaria • 34 Técnicos Activos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full neu-circle flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {sent ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h4 className="font-bold text-base text-slate-900">¡Aviso Emitido Correctamente!</h4>
            <p className="text-xs text-slate-500 font-mono">Dispositivos móviles y walkies sincronizados en campo.</p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Nivel de Prioridad de Transmisión
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPriority('normal')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    priority === 'normal'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'neu-btn text-slate-700'
                  }`}
                >
                  Informativo
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('alta')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    priority === 'alta'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'neu-btn text-slate-700'
                  }`}
                >
                  Prioridad Alta
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('urgente')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    priority === 'urgente'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'neu-btn text-slate-700'
                  }`}
                >
                  Urgente / Stop
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Mensaje para la Cuadrilla
              </label>
              <div className="neu-inset rounded-2xl p-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  required
                  placeholder="Ej. Cambio de horario corte PM-820 a las 09:15h. Todos los marshals a sus puestos..."
                  className="w-full bg-transparent border-0 text-xs text-slate-800 focus:ring-0 resize-none p-0"
                />
              </div>
            </div>

            <div className="neu-subcard p-3 rounded-2xl text-[11px] text-slate-600 flex items-center gap-2 border border-slate-200">
              <span className="material-symbols-outlined text-base text-blue-600">volume_up</span>
              <span>Sonará una señal acústica en los terminales de los jefes de sector.</span>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 neu-btn rounded-2xl text-xs font-bold uppercase tracking-wider text-slate-600"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl neu-btn-primary flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">campaign</span>
                <span>Difundir a 34 Técnicos</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
