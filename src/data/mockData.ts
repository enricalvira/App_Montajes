import { EmergencyContact, EventItem, InventoryItem, NotificationItem, SupplierPickup } from '../types';

export const ASSETS = {
  CIRCUITO_MAP: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeclCY9RfJa1JvW6Le7N06-WVxP35nvhw3lCK055bFdaJpBwvKXSqVP7ydi1XqWSx5q-umH-cwYh5IDlTx7QlWUzgQVfijX73OvptQywU_cDrGQHb_BPMaG2q2PFmJ2g72ZGq7RR45xRzoxAX8M-yaq7OVyA_5u2cHlNr2q7qdAiJ6nBsylLfxJQYyqE6aWmgkqFqbbmmrjw6KfDSUqAOQNilh5GeCiKs7gbK3pxp9WuTMKrTuAv2oCUiIl0Mx9hltR84',
  NATACION_MAP: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxdrUYfcHmVsv09Rld21RkPhonSX7vr_V6F8sxmi52dOH6VWGe6dl-eupTXZe0ATGD7l2oR6EriFTToU2CDjEAa8T8bUVupi1PdYFN2Z71J_9mwiMK7PzlQziwn8qjOPaL2A6n53d0MahzSxJU9Cq6TAkfBkWal-PcWjjd06RomVhfnZKC37jbc5HzdOo98QBcW9V21GVOmRCe8LguFs5nt2uJAGi_lwFXJc2aevBLqkv88Jw0KcnrWjYbQwdABkbD7Wk',
  CICLISMO_MAP: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwg8VKKTqTKU7Ohf1xE1-W5VbQrAK80M8nUXD00lCOd3EIicbSYA-NIlZFj1V90UFpgzz8s1g3UN84B11BHXAqlpOcuQdDqPHKcYNoSSQIClWlUX8U-rK7hwZfjnVa_R5yKrsSue8odzka8i5FZi08KCTALpm8Sfng1ZGdT3m0x5XGFYXGYvQG2-X--jCfeC5lxOI0_I54xDdCis2bQRRHsWQAqCAj7G6WgMZTuJooj7wGsbCHj8o4w61IGegZzW2C01o',
  CARRERA_MAP: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChz4GRnPQCjupOCpc1nRQpiA0VaagxAZtrxo0PLyI1mbW6QbtG0HC24h-cSKkhOhXvPAIJD0WpTjblBhf9oa2cj6TKEvuMpQQgI-Ju8cbUV9rqwoODG2jEfE0OYko8o621qUjAhbk9DrvxTiCTB5RkhTeFqnAcdAwoVT-Hx1_RFp22G9g10_phllgPxnDyNDJYkOZPsCMsl8rejH0QoFdSK9Hfw5wRSUNDqV4K0Dqp8rvIdRWqLvYBCYOj8MdXqRNZxJQ',
  BRANDING_MAP: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX578-gxH7aVfeQ76w-fI5tEM1maWnYzw8-0UfXiRkXrLVXNX5hbu1MxLeLOLD7RiD0635fhCGoC9k3gUUyqqtd5ATFrK1XVCrFLmMKfZX2leKxPwMpoxytezYjE4yyRN3oFzYvJcBdtiVB0i-n4BhM_cMvTbWM-1U1zsRj0G61DIXRwG_it8GC9nBbSLdw_fQLIGfQBskK42CmLzjppghSB0l7gjhj6Q1sVHhhkEoL9a5mwW-MtZSCkpuRy1CG2uaORY',
  MONTAJE_META_MAP: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5iNsaU-Uu_6cvL1t37fxgnF8L4RM-3hHnD92P3IKx8Et3MWs02YJn-AiPCrAudWJajCtYaaOvjLucR7HC2IM1bX12hV-TLN4ZzF8wTsakKtwI7L9WeurvgCza4XeG7N6Asut0MBlpESQfvoA_aPWe6dB-8K1FiI4SJSFwYNT4EarPwEjTLq2eB89AvQzJCFuPLCcEy1ecJVx2cmABPqtSDbeDj-zjuO9s_JfDk9Z2-c7CdPkLo9gjH4K70GNqecZ3lOk'
};

export const MASTER_EVENTS: EventItem[] = [
  {
    id: 'evt-01',
    title: 'SUPERCOPA FUTBOL SALA',
    dates: '2-3',
    month: 'ENE',
    monthIndex: 0,
    category: 'Sala / Torneo Federado',
    tag: 'Completado',
    description: 'Palma Arena • Pista Central y Logística vallas',
    location: 'Palma Arena'
  },
  {
    id: 'evt-02',
    title: 'CABALGATA DE REYES',
    dates: '5',
    month: 'ENE',
    monthIndex: 0,
    category: 'Institucional / Logística Vallas',
    description: 'Recorrido oficial de Palma • 1.200m vallas',
    location: 'Palma Centro'
  },
  {
    id: 'evt-03',
    title: 'DIADA CICLISTA',
    dates: '20',
    month: 'ENE',
    monthIndex: 0,
    category: 'Ciclismo Popular Palma',
    description: 'Salida Plaza España • Control de accesos',
    location: 'Palma de Mallorca'
  },
  {
    id: 'evt-04',
    title: 'CHALLENGE FEMENINA',
    dates: '24-26',
    month: 'ENE',
    monthIndex: 0,
    category: 'Ciclismo Profesional UCI',
    tag: 'UCI PRO',
    description: 'Trofeos Calvià, Felanitx y Palma',
    location: 'Mallorca Global'
  },
  {
    id: 'evt-05',
    title: 'CHALLENGE A MALLORCA',
    dates: '28-1',
    month: 'ENE',
    monthIndex: 0,
    category: 'Ciclismo Internacional 5 Trofeos',
    description: '5 Trofeos UCI ProSeries • Pódium camión y arcos',
    location: 'Mallorca'
  },
  {
    id: 'evt-06',
    title: 'MONTAJE VOLTA CICLOTURISTA',
    dates: '1',
    month: 'MAR',
    monthIndex: 2,
    category: 'Cicloturismo Carretera',
    description: 'Salida Can Picafort',
    location: 'Can Picafort'
  },
  {
    id: 'evt-07',
    title: 'GALATZÓ TRAIL',
    dates: '7-8',
    month: 'MAR',
    monthIndex: 2,
    category: 'Trail running Calvià / Salida & Meta',
    tag: 'MONTAJE PARA MITO',
    description: 'Finca Pública Galatzó • Balizamiento de montaña',
    location: 'Calvià'
  },
  {
    id: 'evt-08',
    title: 'CARRERA HERBALIFE',
    dates: '28',
    month: 'MAR',
    monthIndex: 2,
    category: 'Running Urbano & Familiar',
    description: 'Paseo Marítimo de Palma',
    location: 'Palma'
  },
  {
    id: 'evt-09',
    title: '1/2 MARATÓN CALA RAJADA',
    dates: '11',
    month: 'ABR',
    monthIndex: 3,
    category: 'Medio Maratón Costero',
    description: 'Capdepera y Cala Rajada',
    location: 'Cala Rajada'
  },
  {
    id: 'evt-10',
    title: 'IBIZA MARATÓN',
    dates: '18',
    month: 'ABR',
    monthIndex: 3,
    category: 'Maratón Ruta & Logística Pitiusas',
    tag: 'MONTAJE PARA MITO',
    description: 'Santa Eulària des Riu • Pódium y avituallamientos',
    location: 'Ibiza'
  },
  {
    id: 'evt-11',
    title: 'FIRA DE LA GENT GRAN',
    dates: '25',
    month: 'ABR',
    monthIndex: 3,
    category: 'Feria & Logística Institucional',
    description: 'Parc de Ses Estacions',
    location: 'Palma'
  },
  {
    id: 'evt-12',
    title: 'BE PALMA',
    dates: '29-3',
    month: 'ABR',
    monthIndex: 3,
    category: 'Evento Deportivo & Ocio Urbano',
    description: 'Parc de la Riera',
    location: 'Palma'
  },
  {
    id: 'evt-13',
    title: 'CAMÍ DE CAVALLS',
    dates: '1-3',
    month: 'MAY',
    monthIndex: 4,
    category: 'Ultra Trail Menorca 185KM',
    tag: 'MONTAJE PARA MITO',
    description: '15 Puntos de paso • Ciutadella y Maó',
    location: 'Menorca'
  },
  {
    id: 'evt-14',
    title: 'FORMENTERA 4 X 10K',
    dates: '9',
    month: 'MAY',
    monthIndex: 4,
    category: 'Atletismo por Equipos',
    description: 'Faro de la Mola - Sant Francesc',
    location: 'Formentera'
  },
  {
    id: 'evt-15',
    title: '1/2 MARATÓN FORMENTERA',
    dates: '16',
    month: 'MAY',
    monthIndex: 4,
    category: 'Gran Evento Atletismo Balear',
    description: 'La Savina a Faro de la Mola • 3.500 corredores',
    location: 'Formentera'
  },
  {
    id: 'evt-16',
    title: 'CHALLENGE PLA DE MALLORCA',
    dates: '23-31',
    month: 'MAY',
    monthIndex: 4,
    category: 'Ciclismo Contrarreloj CRI y Ruta',
    description: 'Sineu, Montuïri, Porreres',
    location: 'Pla de Mallorca'
  },
  {
    id: 'evt-17',
    title: 'FIRA DEL ESPORT',
    dates: '18-19',
    month: 'SEP',
    monthIndex: 8,
    category: 'Feria Municipal Institucional Palma',
    description: 'Son Moix',
    location: 'Palma'
  },
  {
    id: 'evt-18',
    title: 'TRIATLÓN DE FORMENTERA',
    dates: '3',
    month: 'OCT',
    monthIndex: 9,
    category: 'Triatlón Sprint & Olímpico',
    tag: 'ACTIVO // EN CURSO',
    description: 'Rider Técnico 26 Págs // Es Pujols · Ses Salines',
    location: 'Es Pujols (Formentera)',
    isActiveOperation: true,
    pages: 26,
    completionPercent: 78
  },
  {
    id: 'evt-19',
    title: 'MOSTRA DE LA LLAMPUGA',
    dates: '9-11',
    month: 'OCT',
    monthIndex: 9,
    category: 'Gastronomía & Logística Cala Rajada',
    tag: 'MONTAJES MITO',
    description: 'Puerto Pesquero Cala Rajada • Carpas y cuadros eléctricos',
    location: 'Cala Rajada'
  },
  {
    id: 'evt-20',
    title: 'SEMANA INTERNACIONAL MASTERS',
    dates: '13-18',
    month: 'OCT',
    monthIndex: 9,
    category: 'Ciclismo Masters Mallorca',
    description: '6 Etapas • Playa de Muro, Port de Pollença',
    location: 'Platja de Muro'
  },
  {
    id: 'evt-21',
    title: 'AECC MALLORCA EN MARCHA',
    dates: '25',
    month: 'OCT',
    monthIndex: 9,
    category: 'Marcha Solidaria Palma',
    description: 'Parc de la Mar • Escenario y sonido 10kW',
    location: 'Palma'
  },
  {
    id: 'evt-22',
    title: 'MONTAJE VALLAS UTMB',
    dates: '30-2',
    month: 'OCT',
    monthIndex: 9,
    category: 'Ultra Trail Running Vallas Perimetrales',
    description: 'Sóller / Puerto de Sóller • 1.200m vallas',
    location: 'Sóller'
  },
  {
    id: 'evt-23',
    title: 'BAILE EN LÍNEA',
    dates: '7',
    month: 'NOV',
    monthIndex: 10,
    category: 'Encuentro Deportivo Palma',
    description: 'Polideportivo Son Moix',
    location: 'Palma'
  },
  {
    id: 'evt-24',
    title: 'MARCHA NORDIC WALKING IME',
    dates: '22',
    month: 'NOV',
    monthIndex: 10,
    category: 'Nordic Walking Palma Litoral',
    description: 'Paseo Marítimo Ciudad Jardín',
    location: 'Palma'
  },
  {
    id: 'evt-25',
    title: 'CARRERA SOLIDARIA DISCAPACIDAD',
    dates: '29',
    month: 'NOV',
    monthIndex: 10,
    category: 'Carrera Inclusiva Municipal',
    description: 'Castell de Bellver',
    location: 'Palma'
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'c-01',
    name: 'Manuel Hernández',
    role: 'Dirección General & Operaciones',
    phone: '+34 629 575 140',
    category: 'DIR'
  },
  {
    id: 'c-02',
    name: 'Xavi Enguix',
    role: 'Coordinación General & Tráfico',
    phone: '+34 630 083 230',
    category: 'DIR'
  },
  {
    id: 'c-03',
    name: 'Guardia Civil Formentera',
    role: 'Seguridad Ciudadana (Puesto La Savina)',
    phone: '+34 649 983 389',
    phone2: '+34 665 872 206',
    category: 'SEGURIDAD',
    isOfficial: true
  },
  {
    id: 'c-04',
    name: 'Policía Local Formentera',
    role: 'Tráfico & Cortes de Carretera PM-820',
    phone: '+34 673 250 058',
    category: 'POLICIA',
    isOfficial: true
  },
  {
    id: 'c-05',
    name: 'Dr. Pedro de Ureta',
    role: 'Puesto Médico Avanzado (PMA-01) & SVB',
    phone: '+34 656 319 397',
    category: 'MEDICO'
  },
  {
    id: 'c-06',
    name: 'Francis Moyà',
    role: 'Protección Civil Formentera',
    phone: '+34 633 64 09 86',
    category: 'PROTECCION'
  },
  {
    id: 'c-07',
    name: 'Jaume Thomas',
    role: 'Dirección de Carrera & Homologación',
    phone: '+34 607 482 629',
    category: 'DIR'
  },
  {
    id: 'c-08',
    name: 'Norbey Andrade',
    role: 'Dirección de Carrera & Cronometraje',
    phone: '+34 669 755 573',
    category: 'DIR'
  },
  {
    id: 'c-09',
    name: 'Luís Elcacho',
    role: 'Coordinador de Voluntarios & Prezero',
    phone: '+34 670 60 77 60',
    category: 'VOLUNTARIOS'
  },
  {
    id: 'c-10',
    name: 'Lorenzo Vidal',
    role: 'Avituallamientos, Hielo & Vasos',
    phone: '+34 619 19 66 19',
    category: 'VOLUNTARIOS'
  },
  {
    id: 'c-11',
    name: 'Joan Mayans',
    role: 'Seguridad en Agua / Salvamento Náutico',
    phone: '+34 616 630 523',
    category: 'AGUA'
  }
];

export const SUPPLIERS: SupplierPickup[] = [
  {
    id: 'sup-01',
    name: 'COCA-COLA IBIZA',
    date: 'VIE 2 OCT',
    route: 'IBIZA // RUTA 01',
    address: 'C/ Pou De Na Maciana, 117 Pol. Montecristo 07816 Sant Rafael (Ibiza)',
    contactPerson: 'Sara Morales',
    contactPhone: '+34 618 188 545',
    status: 'en_ruta',
    statusText: 'PROGRAMADO // EN RUTA',
    notice: 'El isotónico lo entrega Coca-Cola directamente en la plaza de Es Pujols el viernes 2.',
    observations: 'Chofer asignado en furgón 3. Carga en nave central Montecristo.',
    items: [
      { name: '1 Carpa 6x3m', quantity: '1 ud', checked: true },
      { name: '2 Mostradores frontales', quantity: '2 uds', checked: true },
      { name: '2 Neveras técnicas', quantity: '2 uds', checked: false },
      { name: '5 Pancartas oficiales', quantity: '5 uds', checked: false },
      { name: '4 Fly Banners lágrima', quantity: '4 uds', checked: false },
      { name: '39 Cajas Isotónico (351L)', quantity: '39 cajas', checked: false }
    ]
  },
  {
    id: 'sup-02',
    name: 'TRASMED (Muelle)',
    date: 'VIE 25 SEP',
    route: 'MARÍTIMO // ENRIC',
    address: 'Moll vell de Palma (Ferry Conexión Illes)',
    contactPerson: 'Toni Gómez (Resp: Enric)',
    contactPhone: '+34 677 50 93 79',
    status: 'entregado',
    statusText: 'ENTREGADO EN MUELLE',
    notice: 'Se devuelve después de los másters debidamente embalado.',
    observations: 'Embalaje verificado en muelle por Toni. Listos para estiba de retorno.',
    items: [
      { name: 'Arco hinchable Trasmed', quantity: '1 ud', checked: true },
      { name: 'Rollos lona perimetral', quantity: '6 rollos', checked: true },
      { name: 'Fly banners con mástil', quantity: '4 uds', checked: true }
    ]
  },
  {
    id: 'sup-03',
    name: 'TRASMAPI',
    date: 'LUN 28 OCT',
    route: 'FORMENTERA LOCAL',
    address: 'FORMENTERA - Estación marítima',
    contactPerson: 'David Prior',
    contactPhone: '+34 674 67 63 87',
    status: 'confirmado',
    statusText: 'CONFIRMADO // ESTACIÓN MARÍTIMA',
    notice: 'Devolución estipulada: Domingo 4 en el mismo lugar de atraque.',
    observations: 'Equipo embarcado en buque Castaví Jet. Conexión puerto La Savina.',
    items: [
      { name: '8 Fly Banners 4.2m Trasmapi', quantity: '8 uds', checked: true },
      { name: 'Bases de hormigón 81cm', quantity: '4 uds', checked: true },
      { name: 'Lonas arco de meta', quantity: '2 uds', checked: true }
    ]
  },
  {
    id: 'sup-04',
    name: 'RECLAM',
    date: 'MAR 29 SEP',
    route: 'TEXTIL & SEÑALÉTICA',
    address: 'Polígono de Marratxí (Contacto: Matias)',
    contactPerson: 'Matias',
    contactPhone: '+34 611 223 344',
    status: 'completo',
    statusText: 'COMPLETO // RECOGIDO',
    notice: 'Autorizat Cotxos. Puente Meta: 2 Lonas lat. • Arco Salida: 2 Lonas • Escenario: 1 Lona',
    observations: 'Material embolsado y clasificado por tallas.',
    items: [
      { name: '500 Bolsas del corredor', quantity: '500 uds', checked: true },
      { name: '500 Camisetes tècniques', quantity: '500 uds', checked: true },
      { name: 'Gorros natació numerats', quantity: '450 uds', checked: true },
      { name: '250 Vasos alumini reciclable', quantity: '250 uds', checked: true }
    ]
  },
  {
    id: 'sup-05',
    name: 'ELITECHIP',
    date: 'MIE 30 SEP',
    route: 'CRONO & BOXES',
    address: 'Gremi des Fusters 21, Nord, Palma (Ignasi Colom)',
    contactPerson: 'Ignasi Colom',
    contactPhone: '+34 647 729 042',
    status: 'despachado',
    statusText: 'DESPACHADO',
    observations: '80 Barras apoyabicis + 90 pies. Puente Meta: 2,20m luz / 0,80m pata.',
    items: [
      { name: 'Barras de boxes 3m', quantity: '80 barras', checked: true },
      { name: 'Pies de soporte reforzados', quantity: '90 pies', checked: true },
      { name: 'Cestas individuales transición', quantity: '450 cestas', checked: true },
      { name: 'Torre crono reloj LED doble cara', quantity: '1 ud', checked: true }
    ]
  },
  {
    id: 'sup-06',
    name: '3 GLOPS',
    date: 'JUE 01 OCT',
    route: 'BINISSALEM - CENTRAL',
    address: 'BINISSALEM - Almacén Central (29 Sep)',
    contactPerson: 'Coordinador Flotas',
    contactPhone: '+34 699 888 777',
    status: 'verificado',
    statusText: 'VERIFICADO',
    observations: 'Rack retorno devuelto (8 unidades). 20 garrafas cargadas.',
    items: [
      { name: 'Garrafas agua mineral 18.9L', quantity: '20 garrafas', checked: true },
      { name: 'Pinchos dispensadores y soportes', quantity: '5 kits', checked: true }
    ]
  },
  {
    id: 'sup-07',
    name: 'Rent a Car - Sector La Savina',
    date: 'VIE 02 OCT',
    route: 'FLOTA LOCAL PUERTO',
    address: 'La Savina (4 puntos de recogida coordinados)',
    contactPerson: 'David / Coordinador Flota',
    contactPhone: '+34 655 443 322',
    status: 'confirmado',
    statusText: '4 PUNTOS CONSOLIDADOS',
    observations: 'Pujols (Av. Mediterrània 112), Formotor (Almadrava 34), La Mola Rent (Puerto local 11), Pro Auto (Almadrava 6).',
    isLocalFleet: true,
    items: [
      { name: 'Lonas Pujols Rent a Car', quantity: '4 lonas', checked: true },
      { name: 'Lonas + 2 Banners Formotor', quantity: '2 lonas + 2 banners', checked: true },
      { name: 'Lonas + 3 Banners La Mola Rent', quantity: '2 lonas + 3 banners', checked: true },
      { name: '5 Banners Pro Auto', quantity: '5 banners', checked: true }
    ]
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    title: "Faltan 3 sillas en Avituallamiento 2 (S'Abeuredeta)",
    message: "Reclamado formalmente al Consell. Cuadrilla B esperando vehículo de reposición para abrir zona de sombra.",
    author: 'Cuadrilla B - Avituallamiento',
    role: 'Puesto Intermedio',
    timeAgo: 'Hace 6 min',
    category: 'urgente',
    eventTitle: 'Triatló Formentera',
    ackReceived: false,
    isRead: false
  },
  {
    id: 'notif-02',
    title: "Ajuste en camión: 4 cajas de agua hacia S'Avaradero",
    message: "Sobrecupo detectado en furgón 3. El chófer debe desviarse 2 km antes del primer corte de carretera.",
    author: 'Logística de Transporte',
    role: 'Chofer Furgón 3',
    timeAgo: 'Hace 18 min',
    category: 'transporte',
    eventTitle: 'Triatló Formentera',
    ackReceived: true,
    isRead: false
  },
  {
    id: 'notif-03',
    title: 'Trasmed confirma entrega de lonas en Moll Vell',
    message: 'Pallet #408 disponible en Palma para recogida inmediata de estiba. Se requiere firma de albarán.',
    author: 'Toni Gómez',
    role: 'Estiba Trasmed Muelle',
    timeAgo: 'Hace 34 min',
    category: 'proveedor',
    eventTitle: 'Triatló Formentera',
    ackReceived: true,
    isRead: false
  },
  {
    id: 'notif-04',
    title: 'Verificación del Arco de Meta y tomas trifásicas',
    message: 'Jaume Thomas ha confirmado la revisión del arco de meta. Lastres de 250kg anclados y tomas trifásicas con prueba de carga OK.',
    author: 'Manuel Hernández',
    role: 'Jefe de Montaje',
    timeAgo: 'Hace 12 min',
    category: 'walkie',
    eventTitle: 'Triatló Formentera',
    ackReceived: true,
    isRead: true
  },
  {
    id: 'notif-05',
    title: 'Descarga de Isotónico en plaza Es Pujols',
    message: 'Nota en Coca-Cola: El isotónico se entrega en la plaza de Es Pujols el viernes antes de las 14:00h. Se requiere toro mecánico o rampa.',
    author: 'Norbey Andrade',
    role: 'Resp. Logística & Suministros',
    timeAgo: 'Hace 28 min',
    category: 'proveedor',
    eventTitle: 'Triatló Formentera',
    ackReceived: false,
    isRead: true
  },
  {
    id: 'notif-06',
    title: 'Corte PM-820 autorizado desde las 09:15h',
    message: 'Corte PM-820 autorizado desde las 09:15h por Policía Local. Balizamiento completado en sector Sant Ferran con apoyo de Protección Civil.',
    author: 'Xavi Enguix',
    role: 'Dirección de Seguridad Vial',
    timeAgo: 'Hace 45 min',
    category: 'oficial',
    eventTitle: 'Triatló Formentera',
    ackReceived: true,
    isRead: true
  }
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'inv-01',
    name: 'Barras de apoyo bicicletas (Pies y barras - Elitechip)',
    category: 'Estructuras & Vallas',
    location: 'Pasillo A-02 / E-04',
    stockAvailable: 180,
    totalStock: 430,
    unit: 'módulos',
    committedText: '250 comprometidas: Triatló Formentera 2026',
    status: 'en_nave',
    statusText: 'En Nave'
  },
  {
    id: 'inv-02',
    name: 'Lonas Institucionales (Consell, Govern & Sponsors)',
    category: 'Branding & Lonas',
    location: 'Palet L-12 / Muelle B',
    stockAvailable: 140,
    totalStock: 320,
    unit: 'uds',
    committedText: '180 asignadas: En ruta hacia Puerto de Dénia',
    status: 'cargado',
    statusText: 'Cargado Camión #03'
  },
  {
    id: 'inv-03',
    name: 'Carpas Plegables 3x3m & Mostradores Coca-Cola',
    category: 'Estructuras & Vallas',
    location: 'Pasillo B-01 / Rack 2',
    stockAvailable: 12,
    totalStock: 16,
    unit: 'carpas',
    committedText: '4 asignadas: Carrera Sant Ferran 2026',
    status: 'en_nave',
    statusText: 'En Nave'
  },
  {
    id: 'inv-04',
    name: 'Garrafas de Agua 3 Glops & Grifos Dosificadores',
    category: 'Fluidos & Avituallamiento',
    location: 'Zona Fría / Palet F-01',
    stockAvailable: 65,
    totalStock: 120,
    unit: 'garrafas',
    committedText: '55 asignadas: Avituallamiento Mitja Marató',
    status: 'en_nave',
    statusText: 'En Nave'
  },
  {
    id: 'inv-05',
    name: 'Bombos de Cable y Alargos Eléctricos (50m)',
    category: 'Electricidad & Audio',
    location: 'Taller Técnico / Box T',
    stockAvailable: 14,
    totalStock: 22,
    unit: 'uds',
    committedText: '4 en revisión: Sustitución de clavijas Schuko',
    status: 'mantenimiento',
    statusText: 'En Mantenimiento'
  },
  {
    id: 'inv-06',
    name: 'Balizas, Conos Reflectantes (75cm) & Flechas',
    category: 'Balizamiento & Flechas',
    location: 'Pasillo C-03 / Box 9',
    stockAvailable: 320,
    totalStock: 500,
    unit: 'uds',
    committedText: '180 asignadas: Tramo Faro de La Mola',
    status: 'en_nave',
    statusText: 'En Nave'
  },
  {
    id: 'inv-07',
    name: 'Vallas Altas Perimetrales 2.00m',
    category: 'Estructuras & Vallas',
    location: 'Exterior Patio 1',
    stockAvailable: 420,
    totalStock: 600,
    unit: 'vallas',
    committedText: '180 comprometidas: Meta Formentera',
    status: 'en_nave',
    statusText: 'En Nave'
  },
  {
    id: 'inv-08',
    name: 'Vallas Bajas Peatonales 1.00m',
    category: 'Estructuras & Vallas',
    location: 'Exterior Patio 2',
    stockAvailable: 430,
    totalStock: 600,
    unit: 'vallas',
    committedText: '140 comprometidas: Pasillo servicio',
    status: 'en_nave',
    statusText: 'En Nave'
  },
  {
    id: 'inv-09',
    name: 'Rollos de Moqueta Azul Oficial (200cm ancho)',
    category: 'Branding & Lonas',
    location: 'Nave Central R-04',
    stockAvailable: 24,
    totalStock: 30,
    unit: 'rollos (50m/u)',
    committedText: '6 rollos asignados a Meta Es Pujols',
    status: 'en_nave',
    statusText: 'En Nave'
  }
];

export const INITIAL_INCIDENTS = [
  {
    id: 'inc-01',
    time: '11:24',
    bib: '084',
    location: 'T1 - Salida agua Es Pujols',
    severity: 'LEVE' as const,
    description: 'Salida de agua con mareo // Atendido en PMA Meta',
    timestamp: new Date()
  },
  {
    id: 'inc-02',
    time: '10:58',
    bib: '219',
    location: 'Km 8 Ciclismo - Sa Roqueta',
    severity: 'LEVE' as const,
    description: 'Pinchazo doble Km 8 // Retirada voluntaria',
    timestamp: new Date()
  }
];
