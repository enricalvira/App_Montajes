import React, { useState } from 'react';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  subtitle?: string;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  subtitle
}) => {
  const [scale, setScale] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Top Header */}
      <div className="w-full max-w-4xl flex items-center justify-between pb-3 text-white">
        <div>
          <h3 className="font-bold text-sm sm:text-base uppercase tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-slate-300 font-mono mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <button
            onClick={() => setScale((s) => Math.max(0.6, s - 0.25))}
            className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all"
            title="Alejar"
          >
            <span className="material-symbols-outlined text-lg">zoom_out</span>
          </button>
          <button
            onClick={() => setScale(1)}
            className="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-mono font-bold text-white transition-all"
            title="Restablecer"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={() => setScale((s) => Math.min(2.5, s + 0.25))}
            className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all"
            title="Acercar"
          >
            <span className="material-symbols-outlined text-lg">zoom_in</span>
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition-all ml-2"
            title="Cerrar"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>

      {/* Image Viewport */}
      <div className="w-full max-w-4xl flex-1 max-h-[82vh] overflow-auto rounded-3xl bg-slate-900 border border-white/20 p-2 sm:p-4 flex items-center justify-center relative">
        <img
          src={imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          className="max-w-none transition-transform duration-200 select-none rounded-xl"
          style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
        />
      </div>

      {/* Footer hint */}
      <div className="w-full max-w-4xl pt-2 flex items-center justify-between text-slate-400 text-[11px] font-mono">
        <span>PLANO TÉCNICO OFICIAL RIDER FORMENTERA</span>
        <button
          onClick={() => {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.target = '_blank';
            link.rel = 'noreferrer';
            link.click();
          }}
          className="hover:text-blue-400 underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          <span>Abrir original en pestaña</span>
        </button>
      </div>
    </div>
  );
};
