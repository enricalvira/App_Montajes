import React, { useState } from 'react';
import { EMERGENCY_CONTACTS, INITIAL_INCIDENTS } from '../../data/mockData';
import { IncidentReport } from '../../types';

interface EmergenciasViewProps {
  onOpenBroadcastModal: () => void;
}

export const EmergenciasView: React.FC<EmergenciasViewProps> = ({ onOpenBroadcastModal }) => {
  const [contactsFilter, setContactsFilter] = useState('');
  const [incidents, setIncidents] = useState<IncidentReport[]>(INITIAL_INCIDENTS);
  const [bib, setBib] = useState('');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState<'LEVE' | 'MEDIA' | 'CRÍTICA'>('LEVE');
  const [isPttActive, setIsPttActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredContacts = EMERGENCY_CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(contactsFilter.toLowerCase()) ||
      c.role.toLowerCase().includes(contactsFilter.toLowerCase()) ||
      c.phone.includes(contactsFilter)
  );

  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bib || !location) return;

    const now = new Date();
    const timeStr =
      String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

    const newReport: IncidentReport = {
      id: `inc-${Date.now()}`,
      time: timeStr,
      bib: bib,
      location: location,
      severity: severity,
      description: `${location} // ${severity === 'LEVE' ? 'Retiro voluntario' : severity === 'MEDIA' ? 'Atención en posta médica' : 'Evacuación SVB requerida'}`,
      timestamp: now
    };

    setIncidents([newReport, ...incidents]);
    setToastMessage(`Incidencia Atleta #${bib} transmitida a Crono y PMA.`);
    setBib('');
    setLocation('');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePttPress = () => {
    setIsPttActive(true);
  };

  const handlePttRelease = () => {
    setIsPttActive(false);
    setToastMessage('Mensaje de voz transmitido en VHF CH 09.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-20 pb-24 space-y-5">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="neu-card p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold font-mono animate-fadeIn flex items-center justify-between">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)}>
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* 1. Banner Estado Operativo de Seguridad & VHF CH 09 */}
      <section className="neu-card rounded-3xl p-5 border border-white/70 relative overflow-hidden space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/70">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              SYS-ONLINE
            </span>
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-mono">
              RIDER TÉCNICO SEG-01
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-blue-700 bg-white/70 px-2.5 py-1 rounded-full shadow-xs">
            11:42:08 UTC+2
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
            <p className="text-sm font-black text-emerald-800 tracking-tight uppercase">
              PROTOCOLO RACE OPS ACTIVO
            </p>
          </div>
          <p className="text-xs font-medium text-slate-600 leading-relaxed pl-9">
            DISPOSITIVO MÉDICO Y NÁUTICO 100% OPERATIVO EN CALA SAONA, LA SAVINA Y ES PUJOLS
          </p>
        </div>

        {/* Quick Action VHF & SOS Broadcast */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-200/70">
          {/* Frecuencia Directa Box */}
          <div className="neu-inset rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-xs transition-all ${
                  isPttActive ? 'bg-emerald-600 text-white animate-pulse' : 'bg-white text-blue-600'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isPttActive ? 'mic' : 'radio'}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase font-mono">
                  {isPttActive ? 'TRANSMITIENDO...' : 'FRECUENCIA DIRECTA'}
                </p>
                <p className="font-mono text-xs font-bold text-blue-700">VHF CH 09 // 156.450 MHz</p>
              </div>
            </div>
            <button
              onMouseDown={handlePttPress}
              onMouseUp={handlePttRelease}
              onTouchStart={handlePttPress}
              onTouchEnd={handlePttRelease}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all select-none ${
                isPttActive
                  ? 'bg-emerald-600 text-white shadow-inner scale-95'
                  : 'neu-btn bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
              type="button"
            >
              {isPttActive ? 'HABLANDO' : 'PTT COM'}
            </button>
          </div>

          {/* SOS Broadcast Button */}
          <button
            onClick={onOpenBroadcastModal}
            className="neu-btn-sos rounded-2xl p-3 flex items-center justify-center space-x-2 text-white font-black text-xs uppercase tracking-wider cursor-pointer active:scale-98 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">campaign</span>
            <span>BROADCAST SOS EN CARRERA</span>
          </button>
        </div>
      </section>

      {/* 2. Recursos Desplegados */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-blue-600 text-lg">health_and_safety</span>
            <span>Recursos Desplegados</span>
          </h3>
          <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
            3 UNIDADES // 14 ACTIVOS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* SVB Ambulancias */}
          <div className="neu-card rounded-2xl p-3.5 border border-white/60 relative flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider font-mono">
                  MÓVILES SVB
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[10px] font-bold">
                  2 UNID
                </span>
              </div>
              <p className="text-sm font-bold text-slate-900">2 Ambulancias SVB</p>
              <p className="text-xs text-slate-500 mt-1">Av. Miramar &amp; Es Pujols rotación activa</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-semibold text-slate-500 font-mono">
              <span>GUARDIA</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>GPS OK</span>
              </span>
            </div>
          </div>

          {/* Puesto Médico Avanzado */}
          <div className="neu-card rounded-2xl p-3.5 border border-white/60 relative flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider font-mono">
                  BASE META
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[10px] font-bold">
                  PMA-01
                </span>
              </div>
              <p className="text-sm font-bold text-slate-900">Puesto Médico Avanzado</p>
              <p className="text-xs text-slate-500 mt-1">Carpa 3x3m en zona de meta con triaje</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-semibold text-slate-500 font-mono">
              <span className="truncate pr-1">DR. PEDRO DE URETA</span>
              <span className="text-emerald-700 font-bold whitespace-nowrap">OPERATIVO</span>
            </div>
          </div>

          {/* Náutico / Salvamento */}
          <div className="neu-card rounded-2xl p-3.5 border border-white/60 relative flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-extrabold text-sky-700 uppercase tracking-wider font-mono">
                  AGUAS ABIERTAS
                </span>
                <span className="px-2 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[10px] font-bold">
                  FLOTA MAR
                </span>
              </div>
              <p className="text-sm font-bold text-slate-900">Salvamento Náutico</p>
              <p className="text-xs text-slate-500 mt-1">3 Zodiacs motorizadas, 10 Kayaks y 1 Moto GEAS</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-semibold text-slate-500 font-mono">
              <span>CALA SAONA</span>
              <span className="text-blue-700 font-bold">14 EMBARC.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Directorio de Contactos de Emergencia (11 Contactos) */}
      <section className="neu-card rounded-3xl p-5 border border-white/70 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-blue-600 text-lg">contact_phone</span>
              <span>Contactos de Emergencia // Rider Oficial</span>
            </h3>
            <p className="text-[11px] font-medium text-slate-500">Marcación táctica directa de 1 toque</p>
          </div>
          <span className="px-3 py-1 bg-white rounded-full font-mono text-xs font-bold text-slate-700 shadow-xs">
            11 CONTACTOS
          </span>
        </div>

        {/* Search input */}
        <div className="neu-inset rounded-2xl p-1.5 flex items-center px-3 gap-2">
          <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
          <input
            type="text"
            value={contactsFilter}
            onChange={(e) => setContactsFilter(e.target.value)}
            className="w-full bg-transparent border-0 text-slate-700 font-semibold text-xs placeholder:text-slate-400 focus:ring-0 py-1.5"
            placeholder="FILTRAR POR CARGO, NOMBRE O TELÉFONO..."
          />
          {contactsFilter && (
            <button onClick={() => setContactsFilter('')} className="text-slate-400">
              <span className="material-symbols-outlined text-sm">cancel</span>
            </button>
          )}
        </div>

        {/* Contacts list */}
        <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`neu-card-sm rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-white/60 ${
                contact.category === 'MEDICO' ? 'border-2 border-emerald-500/30 bg-emerald-50/20' : ''
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider font-mono ${
                      contact.category === 'MEDICO'
                        ? 'text-emerald-700'
                        : contact.category === 'SEGURIDAD' || contact.category === 'POLICIA'
                        ? 'text-amber-800'
                        : 'text-blue-700'
                    }`}
                  >
                    {contact.role}
                  </span>
                  {contact.isOfficial && (
                    <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[9px] font-bold rounded-full font-mono">
                      OFICIAL
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-slate-900">{contact.name}</p>
                <p className="font-mono text-xs font-semibold text-slate-500">
                  {contact.phone} {contact.phone2 && `// ${contact.phone2}`}
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className={`px-4 py-2.5 rounded-xl font-bold tracking-wider uppercase text-xs flex items-center space-x-1.5 transition-all active:scale-95 ${
                    contact.category === 'MEDICO'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                      : 'neu-btn-primary text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {contact.category === 'MEDICO' ? 'emergency' : 'call'}
                  </span>
                  <span>{contact.category === 'MEDICO' ? 'MÉDICO' : 'LLAMAR'}</span>
                </a>

                {contact.phone2 && (
                  <a
                    href={`tel:${contact.phone2.replace(/\s+/g, '')}`}
                    className="neu-btn px-3 py-2 rounded-xl text-blue-700 font-mono text-xs font-bold flex items-center space-x-1"
                  >
                    <span className="material-symbols-outlined text-xs">call</span>
                    <span>LÍNEA 2</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Registro Rápido de Incidencias & Historial */}
      <section className="neu-card rounded-3xl p-5 border border-white/70 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-orange-600 text-lg">report</span>
              <span>Registro Incidencia Sanitaria / Retirado</span>
            </h3>
            <p className="text-[11px] font-medium text-slate-500 font-mono">
              Anotación de campo con transmisión inmediata a Crono &amp; PMA
            </p>
          </div>
        </div>

        <form onSubmit={handleAddIncident} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Dorsal Atleta
              </label>
              <div className="neu-inset rounded-2xl px-3 py-1">
                <input
                  type="text"
                  value={bib}
                  onChange={(e) => setBib(e.target.value)}
                  placeholder="Ej. 142"
                  required
                  className="w-full bg-transparent border-0 font-mono text-sm font-bold text-slate-800 focus:ring-0 py-1.5"
                />
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
                  placeholder="Ej. Km 14.5 Bike - La Savina"
                  required
                  className="w-full bg-transparent border-0 text-xs font-medium text-slate-800 focus:ring-0 py-1.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Nivel Gravedad
              </label>
              <div className="neu-inset rounded-2xl px-3 py-1">
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full bg-transparent border-0 text-xs font-medium text-slate-800 focus:ring-0 py-1.5 cursor-pointer"
                >
                  <option value="LEVE">LEVE // Retirado voluntario</option>
                  <option value="MEDIA">MEDIA // Atención en posta</option>
                  <option value="CRÍTICA">CRÍTICA // Evacuación inmediata</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 neu-btn-sos rounded-2xl text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all active:scale-98 shadow-md"
          >
            <span className="material-symbols-outlined text-[19px]">assignment_late</span>
            <span>TRANSMITIR A DIRECCIÓN DE CARRERA &amp; MÉDICOS</span>
          </button>
        </form>

        {/* Historial de Incidentes del Turno */}
        <div className="pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mb-2.5 font-mono">
            <span className="text-slate-500">Últimas transmisiones de turno</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              SYNC OPERATIVO
            </span>
          </div>

          <div className="space-y-2">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                className="neu-inset rounded-2xl p-2.5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold text-[10px] font-mono ${
                      inc.severity === 'CRÍTICA'
                        ? 'bg-rose-100 text-rose-800'
                        : inc.severity === 'MEDIA'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {inc.severity}
                  </span>
                  <span className="font-mono font-bold text-slate-900">BIB #{inc.bib}</span>
                  <span className="text-slate-600 text-[11px]">{inc.description}</span>
                </div>
                <span className="font-mono text-xs text-slate-500 font-semibold">{inc.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
