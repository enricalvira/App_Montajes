import React, { useState } from 'react';

interface LoginViewProps {
  onLogin: (userData: { name: string; email: string; role: string }) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('enric.alvira@unisportconsulting.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'director' | 'logistica' | 'cronometraje'>('director');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const roleProfiles = {
    director: {
      name: 'Enric Alvira',
      email: 'enric.alvira@unisportconsulting.com',
      role: 'Director Técnico // Unisport Balears',
      badge: 'DIR. TÉCNICA'
    },
    logistica: {
      name: 'Coordinador de Logística',
      email: 'logistica@unisportconsulting.com',
      role: 'Jefe de Operaciones de Campo',
      badge: 'LOGÍSTICA'
    },
    cronometraje: {
      name: 'Operador Elitechip',
      email: 'timing@elitechip.net',
      role: 'Responsable de Crono y Tránsitos',
      badge: 'CRONO / ELITECHIP'
    }
  };

  const handleRoleSelect = (roleKey: 'director' | 'logistica' | 'cronometraje') => {
    setSelectedRole(roleKey);
    setEmail(roleProfiles[roleKey].email);
    setPassword('••••••••••••');
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Por favor introduce tu correo electrónico o identificador de técnico.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    // Simulate authenticating against the secure race operations gateway
    setTimeout(() => {
      setIsLoading(false);
      const profile = roleProfiles[selectedRole] || {
        name: email.split('@')[0],
        email: email,
        role: 'Técnico de Operaciones // Unisport',
        badge: 'OPERACIONES'
      };
      onLogin(profile);
    }, 600);
  };

  const handleQuickDemoAccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(roleProfiles.director);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#ebf0f8] flex flex-col justify-between items-center px-4 py-8 relative selection:bg-blue-600 selection:text-white">
      {/* Background Ambience Elements */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Identity */}
      <header className="w-full max-w-md flex flex-col items-center text-center space-y-2 pt-2 z-10">
        <div className="w-14 h-14 neu-card rounded-2xl flex items-center justify-center text-blue-600 shadow-md border border-white/80">
          <span className="material-symbols-outlined text-3xl font-bold">sensors</span>
        </div>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 live-pulse"></span>
            RACEOPS // CLOUD GATEWAY
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
            Unisport Balears
          </h1>
          <p className="text-xs font-semibold text-slate-500 max-w-xs mx-auto">
            Plataforma de Control Operativo, Montaje y Logística de Eventos
          </p>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="w-full max-w-md my-6 z-10">
        <div className="neu-card p-6 sm:p-8 rounded-3xl border border-white/80 space-y-5 shadow-xl">
          {/* Card Title */}
          <div className="border-b border-slate-200/70 pb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-lg">lock</span>
                Acceso Técnico
              </h2>
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                SSL 256-BIT
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Introduce tus credenciales para acceder a la lista de eventos y centro de mando.
            </p>
          </div>

          {/* Role Quick Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
              Seleccionar Perfil Operativo:
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              {(['director', 'logistica', 'cronometraje'] as const).map((rk) => (
                <button
                  key={rk}
                  type="button"
                  onClick={() => handleRoleSelect(rk)}
                  className={`py-2 px-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all ${
                    selectedRole === rk
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'neu-btn text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {roleProfiles[rk].badge}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block font-mono font-bold text-[11px] uppercase tracking-wider text-slate-600">
                Usuario / Correo Corporativo
              </label>
              <div className="neu-inset rounded-2xl flex items-center px-3 py-2.5 border border-white/40 focus-within:ring-2 focus-within:ring-blue-500">
                <span className="material-symbols-outlined text-slate-400 text-lg mr-2">mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@unisportconsulting.com"
                  className="w-full bg-transparent border-0 font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden text-xs"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block font-mono font-bold text-[11px] uppercase tracking-wider text-slate-600">
                  Contraseña de Operaciones
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] font-mono font-bold text-blue-600 hover:text-blue-800"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <div className="neu-inset rounded-2xl flex items-center px-3 py-2.5 border border-white/40 focus-within:ring-2 focus-within:ring-blue-500">
                <span className="material-symbols-outlined text-slate-400 text-lg mr-2">key</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-transparent border-0 font-mono text-slate-800 placeholder-slate-400 focus:outline-hidden text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-base">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me & Help */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-0 w-3.5 h-3.5"
                />
                <span className="text-[11px] text-slate-600 font-medium">Recordar sesión</span>
              </label>

              <span className="text-[10px] font-mono text-slate-400">
                Cifrado AES-256
              </span>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="neu-card p-2.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-[11px] font-mono flex items-center gap-1.5 animate-fadeIn">
                <span className="material-symbols-outlined text-sm text-rose-600">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 neu-btn-primary rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md disabled:opacity-75 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                  <span>AUTENTICANDO...</span>
                </>
              ) : (
                <>
                  <span>ACCEDER AL SISTEMA</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </>
              )}
            </button>

            {/* 1-Click Fast Pass Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleQuickDemoAccess}
                className="w-full py-2.5 neu-btn rounded-2xl text-[11px] font-mono font-bold text-slate-700 hover:text-blue-700 border border-white flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-amber-500 text-base">bolt</span>
                <span>Acceso Rápido Inmediato (1 Clic)</span>
              </button>
            </div>
          </form>

          {/* System Security Notice */}
          <div className="neu-inset p-3 rounded-2xl space-y-1">
            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-600 uppercase">
              <span className="material-symbols-outlined text-xs text-blue-600">verified_user</span>
              <span>Canal Técnico Restringido</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Uso exclusivo para personal técnico autorizado de Unisport Consulting S.L. y colaboradores oficiales de las pruebas.
            </p>
          </div>
        </div>
      </main>

      {/* Footer Support Info */}
      <footer className="w-full max-w-md text-center space-y-1 z-10 pb-2">
        <p className="text-[10px] font-mono text-slate-500">
          RACEOPS v4.2 · GESTIÓN BALEAR DE TRIATLÓN &amp; CICLISMO
        </p>
        <p className="text-[9px] text-slate-400">
          © {new Date().getFullYear()} Unisport Consulting S.L. · Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
};
