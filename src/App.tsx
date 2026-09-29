/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FormenteraSection, MainTab, UserProfile } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginView } from './components/views/LoginView';
import { HubView } from './components/views/HubView';
import { EventosView } from './components/views/EventosView';
import { AvituallamientosView } from './components/views/AvituallamientosView';
import { CircuitosView } from './components/views/CircuitosView';
import { BrandingView } from './components/views/BrandingView';
import { LogisticaView } from './components/views/LogisticaView';
import { MontajeView } from './components/views/MontajeView';
import { CalendarioView } from './components/views/CalendarioView';
import { AvisosView } from './components/views/AvisosView';
import { AlmacenView } from './components/views/AlmacenView';
import { EmergenciasView } from './components/views/EmergenciasView';
import { ImageZoomModal } from './components/modals/ImageZoomModal';
import { ReportIncidentModal } from './components/modals/ReportIncidentModal';
import { PrintRiderModal } from './components/modals/PrintRiderModal';
import { BroadcastAlertModal } from './components/modals/BroadcastAlertModal';
import { TruckChecklistModal } from './components/modals/TruckChecklistModal';

export default function App() {
  // Authentication State:
  // Requires user login to enter the application / Inicio page
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('raceops_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Navigation State:
  // Root navigation tabs: 'eventos' (Inicio) | 'calendario' | 'almacen' | 'avisos'
  const [currentMainTab, setCurrentMainTab] = useState<MainTab>('eventos');

  // Active Event Context:
  // When null: Displays master event list (Inicio)
  // When 'formentera': Displays Triatló Formentera operations hub and sub-modules
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Sub-sections inside Formentera event workspace
  const [formenteraSection, setFormenteraSection] = useState<FormenteraSection>('hub');

  // Modal States
  const [zoomModal, setZoomModal] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
    subtitle?: string;
  }>({
    isOpen: false,
    url: '',
    title: '',
    subtitle: ''
  });

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [truckModalOpen, setTruckModalOpen] = useState(false);
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setGlobalToast(msg);
    setTimeout(() => setGlobalToast(null), 3500);
  };

  const handleLogin = (userData: UserProfile) => {
    setCurrentUser(userData);
    localStorage.setItem('raceops_auth_user', JSON.stringify(userData));
    setCurrentMainTab('eventos');
    setSelectedEvent(null);
    showToast(`Sesión iniciada: ${userData.name} (${userData.role})`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('raceops_auth_user');
    setSelectedEvent(null);
    setCurrentMainTab('eventos');
    showToast('Sesión cerrada correctamente');
  };

  const handleOpenZoom = (url: string, title: string, subtitle?: string) => {
    setZoomModal({
      isOpen: true,
      url,
      title,
      subtitle
    });
  };

  const handleReportSubmit = (incident: {
    bib: string;
    location: string;
    severity: string;
    description: string;
  }) => {
    showToast(`Incidencia registrada: Atleta #${incident.bib} (${incident.severity}) en ${incident.location}`);
  };

  const handleBroadcastSend = (message: string, priority: string) => {
    showToast(`Alerta general (${priority.toUpperCase()}) enviada a técnicos: "${message.slice(0, 45)}..."`);
  };

  const handleOpenFormentera = (initialSection: FormenteraSection = 'hub') => {
    setCurrentMainTab('eventos');
    setSelectedEvent('formentera');
    setFormenteraSection(initialSection);
  };

  const handleExitEvent = () => {
    setSelectedEvent(null);
  };

  // If user is not authenticated, render Login Page
  if (!currentUser) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#ebf0f8] text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Global Toast Notification */}
      {globalToast && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 neu-card px-4 py-2.5 rounded-2xl bg-white border border-blue-300 text-blue-900 text-xs font-bold font-mono shadow-xl flex items-center gap-2 animate-fadeIn max-w-md w-[90%]">
          <span className="material-symbols-outlined text-blue-600 text-base">notifications_active</span>
          <span className="flex-1 truncate">{globalToast}</span>
          <button onClick={() => setGlobalToast(null)} className="text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Top Header with User profile and Logout */}
      <Header
        currentMainTab={currentMainTab}
        selectedEvent={currentMainTab === 'eventos' ? selectedEvent : null}
        formenteraSection={formenteraSection}
        onSelectFormenteraSection={(section) => setFormenteraSection(section)}
        onExitEvent={handleExitEvent}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* Global Root Tab: Calendario */}
        {currentMainTab === 'calendario' && (
          <CalendarioView
            onOpenFormentera={() => handleOpenFormentera('hub')}
          />
        )}

        {/* Global Root Tab: Almacén */}
        {currentMainTab === 'almacen' && (
          <AlmacenView onOpenTruckModal={() => setTruckModalOpen(true)} />
        )}

        {/* Global Root Tab: Avisos */}
        {currentMainTab === 'avisos' && (
          <AvisosView onOpenBroadcastModal={() => setBroadcastModalOpen(true)} />
        )}

        {/* Global Root Tab: Eventos (Página de Inicio) */}
        {currentMainTab === 'eventos' && (
          <>
            {/* If no event is selected: Master Event List (Inicio) */}
            {selectedEvent === null && (
              <EventosView
                onOpenFormentera={() => handleOpenFormentera('hub')}
                onNavigateTab={(tab) => setCurrentMainTab(tab)}
              />
            )}

            {/* If Formentera is active: Inside Event Workspace */}
            {selectedEvent === 'formentera' && (
              <>
                {formenteraSection === 'hub' && (
                  <HubView
                    onSelectSection={(sec) => setFormenteraSection(sec)}
                    onNavigateGlobalTab={(tab) => {
                      setSelectedEvent(null);
                      setCurrentMainTab(tab);
                    }}
                    onOpenReportModal={() => setReportModalOpen(true)}
                    onOpenPrintModal={() => setPrintModalOpen(true)}
                  />
                )}

                {formenteraSection === 'montaje' && (
                  <MontajeView
                    onZoomImage={handleOpenZoom}
                    onOpenReportModal={() => setReportModalOpen(true)}
                  />
                )}

                {formenteraSection === 'avituallamiento' && (
                  <AvituallamientosView onOpenReportModal={() => setReportModalOpen(true)} />
                )}

                {formenteraSection === 'circuitos' && (
                  <CircuitosView onZoomImage={handleOpenZoom} />
                )}

                {formenteraSection === 'lonas' && (
                  <BrandingView
                    onZoomImage={handleOpenZoom}
                    onOpenReportModal={() => setReportModalOpen(true)}
                  />
                )}

                {formenteraSection === 'logistica' && (
                  <LogisticaView onOpenReportModal={() => setReportModalOpen(true)} />
                )}

                {formenteraSection === 'emergencias' && (
                  <EmergenciasView onOpenBroadcastModal={() => setBroadcastModalOpen(true)} />
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Bottom Navigation Dock: switches between global tabs and event modules */}
      <BottomNav
        currentMainTab={currentMainTab}
        onSelectMainTab={(tab) => {
          setCurrentMainTab(tab);
        }}
        selectedEvent={currentMainTab === 'eventos' ? selectedEvent : null}
        formenteraSection={formenteraSection}
        onSelectFormenteraSection={(section) => setFormenteraSection(section)}
        onExitEvent={handleExitEvent}
        unreadCount={3}
      />

      {/* Interactive Modals */}
      <ImageZoomModal
        isOpen={zoomModal.isOpen}
        onClose={() => setZoomModal({ ...zoomModal, isOpen: false })}
        imageUrl={zoomModal.url}
        title={zoomModal.title}
        subtitle={zoomModal.subtitle}
      />

      <ReportIncidentModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onSubmit={handleReportSubmit}
      />

      <PrintRiderModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
      />

      <BroadcastAlertModal
        isOpen={broadcastModalOpen}
        onClose={() => setBroadcastModalOpen(false)}
        onSend={handleBroadcastSend}
      />

      <TruckChecklistModal
        isOpen={truckModalOpen}
        onClose={() => setTruckModalOpen(false)}
      />
    </div>
  );
}
