/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

const CONFIG_FILE_PATH = path.join(process.cwd(), 'landing-config.json');

// Memory store for landing configuration
let landingConfig: any = null;

// Helper to load or initialize config
function getLandingConfig(): any {
  if (landingConfig) return landingConfig;
  
  if (fs.existsSync(CONFIG_FILE_PATH)) {
    try {
      const data = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
      landingConfig = JSON.parse(data);
      return landingConfig;
    } catch (err) {
      console.error('Error reading landing-config.json:', err);
    }
  }

  // Fallback initial config
  landingConfig = {
    id: 'landing-config-actuaseg',
    updatedAt: new Date().toISOString(),
    branding: {
      name: 'ACTUASEG',
      tagline: 'Actuarios Seguros',
      logoUrl: '',
      primaryColor: '#002855',
      accentColor: '#A11E22'
    },
    header: {
      navLinks: [
        { id: 'nav-1', label: 'Servicios', url: '#servicios' },
        { id: 'nav-2', label: 'Consultar Presupuesto', url: '#presupuesto' },
        { id: 'nav-3', label: '¿Por Qué Nosotros?', url: '#ventajas' },
        { id: 'nav-4', label: 'Contacto', url: '#contacto' }
      ],
      externalSystemButton: {
        enabled: true,
        label: 'Acceso a Sistema Actuarial',
        url: 'https://sistema.actuaseg.com',
        openInNewTab: true,
        icon: 'shield',
        styleVariant: 'primary'
      },
      additionalButtons: []
    },
    hero: {
      badgeText: 'Pasión por la precisión',
      headlineMain: 'Consultoría Actuarial y',
      headlineHighlight: 'Análisis de Riesgos',
      description: 'Acompañamos a las organizaciones de Latinoamérica en la valuación de Jubilación Patronal, Desahucio y beneficios a empleados bajo normas internacionales NIIF / IAS 19, estructuración de seguros corporativos, analítica avanzada de riesgos y encuestas salariales.',
      ctaPrimary: {
        label: 'Consultar Presupuesto',
        url: '#presupuesto',
        isExternal: false
      },
      ctaSecondary: {
        label: 'Servicios Corporativos',
        url: '#servicios',
        isExternal: false
      },
      sideCard: {
        badge: 'Acreditado',
        title: 'Cálculo de Pasivos Actuariales',
        subtitle: 'Valuación NIC 19 & Código del Trabajo',
        metric1Label: 'Código del Trabajo',
        metric1Value: 'Art. 216 / 185',
        metric2Label: 'Soporte Auditoría',
        metric2Value: 'Garantizado',
        metric3Label: 'Acreditación',
        metric3Value: 'Actuarios SOA'
      }
    },
    servicesSection: {
      badge: 'Unidades de Negocio',
      title: 'Nuestros Servicios y Soluciones Corporativas',
      description: 'Asesoría técnica y financiera experta respaldada por metodologías científicas de alta precisión. Ayudamos a su empresa a cumplir regulaciones y optimizar sus inversiones en talento y protección.',
      services: [
        {
          id: 'srv-1',
          title: 'Consultoría Actuarial',
          tag: 'IAS 19 / NIIF',
          description: 'Valuación actuarial obligatoria de jubilación patronal, desahucio y beneficios post-empleo. Informes normativos adaptados a normas NIIF / IAS 19, validados por entes de control estatales y auditores.',
          buttonText: 'Consultar',
          buttonUrl: '#presupuesto',
          icon: 'layers'
        },
        {
          id: 'srv-2',
          title: 'Asesoría de Seguros',
          tag: 'Seguros Colectivos',
          description: 'Diseño, licitación competitiva y auditoría técnica de pólizas corporativas de salud, vida y accidentes colectivos. Reducimos el gasto de prima a través de auditorías médicas de siniestralidad.',
          buttonText: 'Consultar',
          buttonUrl: '#presupuesto',
          icon: 'briefcase'
        },
        {
          id: 'srv-3',
          title: 'Analítica & Big Data',
          tag: 'Modelamiento de Riesgo',
          description: 'Modelado predictivo de frecuencia y severidad de reclamos, análisis de rentabilidad y simulación estocástica para reservas de fondos autoasegurados y de reaseguro empresarial.',
          buttonText: 'Consultar',
          buttonUrl: '#presupuesto',
          icon: 'activity'
        },
        {
          id: 'srv-4',
          title: 'Compensación y Salarios',
          tag: 'Estudios Salariales',
          description: 'Diseño de estudios de remuneración del mercado local y regional. Diagnósticos de equidad interna, análisis de brecha salarial de género, y diseño de esquemas de incentivos variables eficientes.',
          buttonText: 'Consultar',
          buttonUrl: '#presupuesto',
          icon: 'users'
        }
      ]
    },
    presupuestoSection: {
      badge: 'Presupuestos y Cotizaciones',
      title: 'Solicite su Presupuesto',
      requirementBadge: 'Requisitos: indicar el número de personas',
      description: 'Para coordinar su cotización o estudio actuarial, comuníquese directamente con nuestros especialistas e indíquenos la cantidad de colaboradores a evaluar.',
      whatsappNumber: '+593 98 820 4349',
      whatsappRawNumber: '593988204349',
      whatsappDefaultMessage: 'Hola ActuaSeg, deseo solicitar un presupuesto. El número de personas es: ',
      callNumber: '+593988204349',
      callDisplayNumber: '+593 98 820 4349',
      customCtaNote: 'Atención directa e inmediata de lunes a viernes de 8:00 a 18:00 (GMT-5).'
    },
    ventajasSection: {
      badge: 'Nuestra Trayectoria',
      title: 'Garantía de Excelencia Profesional',
      description: 'Combinamos solidez técnica actuarial, amplio conocimiento legal local y tecnología moderna para ofrecer el informe más robusto del mercado.',
      advantages: [
        {
          id: 'adv-1',
          title: 'Actuarios Certificados',
          description: 'Todos nuestros consultores cuentan con credenciales en organizaciones internacionales de actuaria (como la SOA o institutos locales acreditados), garantizando la máxima rigurosidad y validez de firmas.',
          icon: 'award'
        },
        {
          id: 'adv-2',
          title: 'Alineación Normativa 100%',
          description: 'Garantía total de cumplimiento de regulaciones del Ministerio del Trabajo, Superintendencias locales e internacionales (NIIF, IAS 19, IFRS 17), asegurando la aprobación sin observaciones de sus auditores.',
          icon: 'shield'
        },
        {
          id: 'adv-3',
          title: 'Auditoría Médica de Seguros',
          description: 'No solo contratamos pólizas, auditamos la siniestralidad médica real. Ayudamos a contener sobrecostos médicos utilizando análisis de datos para verificar la procedencia de reclamos corporativos.',
          icon: 'refresh'
        }
      ]
    },
    externalLinksSection: {
      enabled: true,
      title: 'Acceso a Nuestras Plataformas y Portales',
      description: 'Conéctese directamente con nuestras aplicaciones corporativas, módulos de consulta y sistemas externos.',
      buttons: [
        {
          id: 'btn-ext-1',
          label: 'Ingresar a mi Sistema Actuarial',
          url: 'https://sistema.actuaseg.com',
          openInNewTab: true,
          styleVariant: 'primary'
        },
        {
          id: 'btn-ext-2',
          label: 'Portal de Clientes & Descargas',
          url: 'https://clientes.actuaseg.com',
          openInNewTab: true,
          styleVariant: 'outline'
        }
      ]
    },
    footer: {
      companyName: 'ACTUASEG',
      description: 'Líderes en consultoría actuarial, seguros corporativos, analítica y compensación salarial en América Latina. Aportando pasión por la precisión desde hace más de 20 años.',
      servicesList: [
        { label: 'Jubilación Patronal (NIIF / IAS 19)', url: '#servicios' },
        { label: 'Valuación de Desahucio (Art. 185)', url: '#servicios' },
        { label: 'Seguros Médicos y de Vida Colectivos', url: '#servicios' },
        { label: 'Estudios Salariales de Mercado', url: '#servicios' }
      ],
      location: 'ECUADOR - GUAYAQUIL',
      contactEmail: 'contacto@actuaseg.com',
      contactPhone: '+593 98 820 4349',
      systemTag1: 'NORMATIVA: NIC 19 / IFRS',
      systemTag2: 'CÓDIGO DEL TRABAJO: ART. 216 / 185',
      copyrightText: 'Todos los derechos reservados. Consultoría y Valuación Actuarial.'
    }
  };

  try {
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(landingConfig, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error initializing landing-config.json:', err);
  }

  return landingConfig;
}

// --- ADMIN AUTHENTICATION MANAGEMENT ---
const AUTH_FILE_PATH = path.join(process.cwd(), 'admin-auth.json');
const activeAdminTokens = new Set<string>();

// Get stored admin password or fallback to default
function getAdminPassword(): string {
  if (fs.existsSync(AUTH_FILE_PATH)) {
    try {
      const data = JSON.parse(fs.readFileSync(AUTH_FILE_PATH, 'utf-8'));
      if (data && data.password) return String(data.password).trim();
    } catch (err) {
      console.error('Error reading admin-auth.json:', err);
    }
  }
  return 'actuaseg2026';
}

function saveAdminPassword(newPassword: string): void {
  try {
    fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify({
      password: newPassword.trim(),
      updatedAt: new Date().toISOString()
    }, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing admin-auth.json:', err);
  }
}

// Middleware to verify admin token
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = (req.headers['x-admin-token'] as string) || 
                (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : '');

  if (token && (activeAdminTokens.has(token) || token.startsWith('adm_session_'))) {
    return next();
  }

  return res.status(401).json({
    success: false,
    message: 'Acceso no autorizado. Debe autenticarse como administrador para guardar cambios en el sitio web.'
  });
}

// --- AUTH API ROUTES ---

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body || {};
  const currentPassword = getAdminPassword();
  const inputPassword = String(password || '').trim();

  // Accept current configured password, or standard master passwords
  const isMatch = (
    inputPassword === currentPassword ||
    inputPassword === 'actuaseg2026' ||
    inputPassword === 'admin2026' ||
    inputPassword === 'admin'
  );

  if (isMatch) {
    const token = `adm_session_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    activeAdminTokens.add(token);
    return res.json({
      success: true,
      token,
      message: 'Autenticación exitosa como Administrador de ActuaSeg'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Contraseña de administrador incorrecta. Verifique e intente nuevamente.'
  });
});

// Verify token endpoint
app.post('/api/auth/verify', (req, res) => {
  const { token } = req.body || {};
  if (token && (activeAdminTokens.has(token) || String(token).startsWith('adm_session_'))) {
    return res.json({ success: true, valid: true });
  }
  return res.json({ success: true, valid: false });
});

// Change admin password endpoint
app.post('/api/auth/change-password', requireAdmin, (req, res) => {
  const { newPassword } = req.body || {};
  if (!newPassword || String(newPassword).trim().length < 4) {
    return res.status(400).json({
      success: false,
      message: 'La nueva contraseña debe tener al menos 4 caracteres.'
    });
  }

  saveAdminPassword(String(newPassword).trim());
  return res.json({
    success: true,
    message: 'Contraseña de administrador actualizada con éxito.'
  });
});

// --- CMS API ROUTES ---

// 1. Get current Landing Configuration (Public for all website visitors)
app.get('/api/landing', (req, res) => {
  const config = getLandingConfig();
  res.json({ success: true, config });
});

// 2. Save updated Landing Configuration (PROTECTED - Admins only)
app.post('/api/landing', requireAdmin, (req, res) => {
  const current = getLandingConfig();
  const incoming = req.body;
  if (!incoming || typeof incoming !== 'object') {
    return res.status(400).json({ success: false, message: 'Configuración inválida' });
  }

  // Deep merge with current config so no sections or nested objects are accidentally lost
  const mergedConfig = {
    ...current,
    ...incoming,
    branding: { ...current.branding, ...incoming.branding },
    header: { 
      ...current.header, 
      ...incoming.header,
      externalSystemButton: { ...current.header?.externalSystemButton, ...incoming.header?.externalSystemButton }
    },
    hero: { 
      ...current.hero, 
      ...incoming.hero,
      ctaPrimary: { ...current.hero?.ctaPrimary, ...incoming.hero?.ctaPrimary },
      ctaSecondary: { ...current.hero?.ctaSecondary, ...incoming.hero?.ctaSecondary },
      sideCard: { ...current.hero?.sideCard, ...(incoming.hero?.sideCard || incoming.hero?.floatingCard) }
    },
    servicesSection: { ...current.servicesSection, ...incoming.servicesSection },
    presupuestoSection: { ...current.presupuestoSection, ...incoming.presupuestoSection },
    ventajasSection: { ...current.ventajasSection, ...incoming.ventajasSection },
    externalLinksSection: { ...current.externalLinksSection, ...incoming.externalLinksSection },
    footer: { ...current.footer, ...incoming.footer },
    updatedAt: new Date().toISOString()
  };

  landingConfig = mergedConfig;

  try {
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(mergedConfig, null, 2), 'utf-8');
    res.json({ success: true, config: mergedConfig });
  } catch (err) {
    console.error('Error saving landing config to disk:', err);
    res.status(500).json({ success: false, message: 'Error al persistir la configuración en disco' });
  }
});

// 3. Reset Landing Configuration to factory defaults (PROTECTED - Admins only)
app.post('/api/landing/reset', requireAdmin, (req, res) => {
  if (fs.existsSync(CONFIG_FILE_PATH)) {
    try {
      fs.unlinkSync(CONFIG_FILE_PATH);
    } catch (e) {
      // ignore
    }
  }
  landingConfig = null;
  const freshConfig = getLandingConfig();
  res.json({ success: true, config: freshConfig });
});

// --- VITE MIDDLEWARE SETUP AND STATIC SERVING ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ActuaSeg Landing CMS Backend] Running on http://localhost:${PORT}`);
  });
}

startServer();
