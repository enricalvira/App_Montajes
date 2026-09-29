export type MainTab = 'eventos' | 'calendario' | 'almacen' | 'avisos';

export type FormenteraSection =
  | 'hub'
  | 'montaje'
  | 'avituallamiento'
  | 'logistica'
  | 'lonas'
  | 'circuitos'
  | 'emergencias';

export type ActiveTab = MainTab | FormenteraSection;

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  badge?: string;
}

export interface ChecklistItem {
  id: string;
  sectorId: string;
  title: string;
  subtitle?: string;
  details?: string;
  requested?: string;
  responsible: string;
  status: 'verified' | 'in_progress' | 'pending' | 'revision';
  statusText?: string;
}

export interface Sector {
  id: string;
  title: string;
  code: string;
  verifiedCount: number;
  totalCount: number;
  badge?: string;
}

export interface SupplierPickup {
  id: string;
  name: string;
  date: string;
  route: string;
  address: string;
  contactPerson: string;
  contactPhone: string;
  status: 'en_ruta' | 'entregado' | 'confirmado' | 'completo' | 'despachado' | 'verificado';
  statusText: string;
  notice?: string;
  observations: string;
  items: { name: string; quantity: string; checked: boolean }[];
  isLocalFleet?: boolean;
}

export interface IncidentReport {
  id: string;
  time: string;
  bib: string;
  location: string;
  severity: 'LEVE' | 'MEDIA' | 'CRÍTICA';
  description: string;
  timestamp: Date;
}

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  phone2?: string;
  category: 'DIR' | 'SEGURIDAD' | 'POLICIA' | 'MEDICO' | 'PROTECCION' | 'VOLUNTARIOS' | 'AGUA';
  isOfficial?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  dates: string;
  month: string;
  monthIndex: number;
  category: string;
  tag?: string;
  description: string;
  isActiveOperation?: boolean;
  pages?: number;
  completionPercent?: number;
  location: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  stockAvailable: number;
  totalStock: number;
  unit: string;
  committedText: string;
  status: 'en_nave' | 'cargado' | 'mantenimiento';
  statusText: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  author: string;
  role: string;
  timeAgo: string;
  category: 'urgente' | 'transporte' | 'proveedor' | 'walkie' | 'oficial';
  eventTitle: string;
  ackReceived: boolean;
  isRead: boolean;
}
