import React, { useState } from 'react';

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (incident: { bib: string; location: string; severity: 'LEVE' | 'MEDIA' | 'CRÍTICA'; description: string; photo?: string }) => void;
}

export const ReportIncidentModal: React.FC<ReportIncidentModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [bib, setBib] = useState('');
  const [location, setLocation] = useState('Paseo Es Pujols - Meta');
  const [severity, setSeverity] = useState<'LEVE' | 'MEDIA' | 'CRÍTICA'>('MEDIA');
  const [description, setDescription] = useState('');
  const [photoSelected, setPhotoSelected] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      bib: bib || 'S/D',
      location,
      severity,
      description: description || 'Incidencia comunicada desde campo vía RaceOps Mobile.',
      photo: photoSelected ? 'evidencia_foto_carrera.jpg' : undefined
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setBib('');
      setDescription('');
      setPhotoSelected(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="neu-card rounded-3xl p-5 sm:p-6 w-full max-w-lg space-y-4 border border-white/80">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl neu-circle flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-2xl">photo_camera</span>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-800 uppercase tracking-tight">
                Reportar Incidencia / Evidencia Fotográfica
              </h3>
              <p className="text-[11px] font-mono text-slate-500">Transmisión inmediata a Dirección de Carrera &amp; PMA</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full neu-circle flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h4 className="font-bold text-base text-slate-900">¡Incidencia Transmitida con Éxito!</h4>
            <p className="text-xs text-slate-500 font-mono">Notificación prioritaria enviada a Dirección y Cronometraje.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Dorsal / Referencia
                </label>
                <div className="neu-inset rounded-2xl px-3 py-1">
                  <input
                    type="text"
                    value={bib}
                    onChange={(e) => setBib(e.target.value)}
                    placeholder="Ej. #142 o Valla-08"
                    className="w-full bg-transparent border-0 font-mono text-xs font-bold text-slate-800 focus:ring-0 py-1.5"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Nivel de Gravedad
                </label>
                <div className="neu-inset rounded-2xl px-3 py-1">
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full bg-transparent border-0 text-xs font-bold text-slate-800 focus:ring-0 py-1.5 cursor-pointer"
                  >
                    <option value="LEVE">LEVE (Informativo / Stock)</option>
                    <option value="MEDIA">MEDIA (Atención requerida)</option>
                    <option value="CRÍTICA">CRÍTICA (Emergencia / Retirado)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Ubicación / Sector
              </label>
              <div className="neu-inset rounded-2xl px-3 py-1">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej. Av. Miramar, Boxes o Km 8 Ciclismo"
                  required
                  className="w-full bg-transparent border-0 text-xs font-semibold text-slate-800 focus:ring-0 py-1.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Descripción del Incidente / Estado de Material
              </label>
              <div className="neu-inset rounded-2xl p-2.5">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Detalla lo ocurrido, material afectado, personas o necesidades inmediatas..."
                  className="w-full bg-transparent border-0 text-xs text-slate-800 focus:ring-0 resize-none p-0"
                />
              </div>
            </div>

            {/* Photo capture section */}
            <div className="p-3 rounded-2xl neu-inset border border-white/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    photoSelected ? 'bg-emerald-600 text-white' : 'neu-circle text-blue-600'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {photoSelected ? 'check_circle' : 'add_a_photo'}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold block text-slate-800">
                    {photoSelected ? 'Evidencia fotográfica adjunta' : 'Adjuntar fotografía de campo'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {photoSelected ? '1 archivo JPG listo (1.4 MB)' : 'Captura con cámara o galería'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPhotoSelected(!photoSelected)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                  photoSelected ? 'bg-emerald-100 text-emerald-800' : 'neu-btn text-blue-600'
                }`}
              >
                {photoSelected ? 'Quitar' : 'Tomar Foto'}
              </button>
            </div>

            <div className="pt-2 flex items-center gap-2.5">
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
                <span className="material-symbols-outlined text-lg">send</span>
                <span>Transmitir Incidencia</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
