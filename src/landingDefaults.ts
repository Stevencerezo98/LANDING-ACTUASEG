import { LandingConfig } from './types';

export const DEFAULT_LANDING_CONFIG: LandingConfig = {
  id: 'landing-config-actuaseg',
  updatedAt: new Date().toISOString(),
  branding: {
    name: 'ACTUASEG',
    tagline: 'Actuarios Seguros',
    logoUrl: '',
    primaryColor: '#002855',
    accentColor: '#A11E22',
    showLogo: true,
    logoSize: 42,
    logoShape: 'rounded',
    logoFit: 'contain',
    logoBackground: 'transparent',
    logoPadding: 0,
    showName: true,
    fontFamily: 'Space Grotesk',
    textColor: '#002855',
    textSize: 'xl',
    fontWeight: 'black',
    letterSpacing: 'tight',
    textTransform: 'uppercase',
    showTagline: true,
    taglineColor: '#A11E22',
    taglineSize: 'tiny',
    taglineWeight: 'black',
    layoutPosition: 'logo-left',
    alignment: 'center',
    gap: 12
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

/**
 * Normalizes any incoming configuration object to guarantee that all nested objects,
 * arrays, and title/badge properties exist without throwing undefined errors.
 */
export function normalizeLandingConfig(raw: any): LandingConfig {
  if (!raw || typeof raw !== 'object') {
    return JSON.parse(JSON.stringify(DEFAULT_LANDING_CONFIG));
  }

  const def = DEFAULT_LANDING_CONFIG;

  return {
    id: raw.id || def.id,
    updatedAt: raw.updatedAt || new Date().toISOString(),
    branding: {
      name: raw.branding?.name ?? def.branding.name,
      tagline: raw.branding?.tagline ?? def.branding.tagline,
      logoUrl: raw.branding?.logoUrl ?? def.branding.logoUrl,
      primaryColor: raw.branding?.primaryColor ?? def.branding.primaryColor,
      accentColor: raw.branding?.accentColor ?? def.branding.accentColor,
      showLogo: raw.branding?.showLogo ?? def.branding.showLogo,
      logoSize: typeof raw.branding?.logoSize === 'number' ? raw.branding.logoSize : def.branding.logoSize,
      logoShape: raw.branding?.logoShape ?? def.branding.logoShape,
      logoFit: raw.branding?.logoFit ?? def.branding.logoFit,
      logoBackground: raw.branding?.logoBackground ?? def.branding.logoBackground,
      logoPadding: typeof raw.branding?.logoPadding === 'number' ? raw.branding.logoPadding : def.branding.logoPadding,
      showName: raw.branding?.showName ?? def.branding.showName,
      fontFamily: raw.branding?.fontFamily ?? def.branding.fontFamily,
      textColor: raw.branding?.textColor ?? (raw.branding?.primaryColor ?? def.branding.textColor),
      textSize: raw.branding?.textSize ?? def.branding.textSize,
      fontWeight: raw.branding?.fontWeight ?? def.branding.fontWeight,
      letterSpacing: raw.branding?.letterSpacing ?? def.branding.letterSpacing,
      textTransform: raw.branding?.textTransform ?? def.branding.textTransform,
      showTagline: raw.branding?.showTagline ?? def.branding.showTagline,
      taglineColor: raw.branding?.taglineColor ?? (raw.branding?.accentColor ?? def.branding.taglineColor),
      taglineSize: raw.branding?.taglineSize ?? def.branding.taglineSize,
      taglineWeight: raw.branding?.taglineWeight ?? def.branding.taglineWeight,
      layoutPosition: raw.branding?.layoutPosition ?? def.branding.layoutPosition,
      alignment: raw.branding?.alignment ?? def.branding.alignment,
      gap: typeof raw.branding?.gap === 'number' ? raw.branding.gap : def.branding.gap,
    },
    header: {
      navLinks: Array.isArray(raw.header?.navLinks) ? raw.header.navLinks : def.header.navLinks,
      externalSystemButton: {
        enabled: raw.header?.externalSystemButton?.enabled ?? def.header.externalSystemButton.enabled,
        label: raw.header?.externalSystemButton?.label ?? def.header.externalSystemButton.label,
        url: raw.header?.externalSystemButton?.url ?? def.header.externalSystemButton.url,
        openInNewTab: raw.header?.externalSystemButton?.openInNewTab ?? def.header.externalSystemButton.openInNewTab,
        icon: raw.header?.externalSystemButton?.icon ?? def.header.externalSystemButton.icon,
        styleVariant: raw.header?.externalSystemButton?.styleVariant ?? def.header.externalSystemButton.styleVariant,
      },
      additionalButtons: Array.isArray(raw.header?.additionalButtons) ? raw.header.additionalButtons : def.header.additionalButtons,
    },
    hero: {
      badgeText: raw.hero?.badgeText ?? def.hero.badgeText,
      headlineMain: raw.hero?.headlineMain ?? (raw.hero?.title ?? def.hero.headlineMain),
      headlineHighlight: raw.hero?.headlineHighlight ?? def.hero.headlineHighlight,
      description: raw.hero?.description ?? (raw.hero?.subtitle ?? def.hero.description),
      ctaPrimary: {
        label: raw.hero?.ctaPrimary?.label ?? (raw.hero?.ctaPrimaryText ?? def.hero.ctaPrimary.label),
        url: raw.hero?.ctaPrimary?.url ?? (raw.hero?.ctaPrimaryUrl ?? def.hero.ctaPrimary.url),
        isExternal: raw.hero?.ctaPrimary?.isExternal ?? false,
      },
      ctaSecondary: {
        label: raw.hero?.ctaSecondary?.label ?? (raw.hero?.ctaSecondaryText ?? def.hero.ctaSecondary.label),
        url: raw.hero?.ctaSecondary?.url ?? (raw.hero?.ctaSecondaryUrl ?? def.hero.ctaSecondary.url),
        isExternal: raw.hero?.ctaSecondary?.isExternal ?? false,
      },
      sideCard: {
        badge: raw.hero?.sideCard?.badge ?? (raw.hero?.floatingCard?.badge ?? def.hero.sideCard.badge),
        title: raw.hero?.sideCard?.title ?? (raw.hero?.floatingCard?.title ?? def.hero.sideCard.title),
        subtitle: raw.hero?.sideCard?.subtitle ?? (raw.hero?.floatingCard?.subtitle ?? def.hero.sideCard.subtitle),
        metric1Label: raw.hero?.sideCard?.metric1Label ?? (raw.hero?.floatingCard?.metric1Label ?? def.hero.sideCard.metric1Label),
        metric1Value: raw.hero?.sideCard?.metric1Value ?? (raw.hero?.floatingCard?.metric1Value ?? def.hero.sideCard.metric1Value),
        metric2Label: raw.hero?.sideCard?.metric2Label ?? (raw.hero?.floatingCard?.metric2Label ?? def.hero.sideCard.metric2Label),
        metric2Value: raw.hero?.sideCard?.metric2Value ?? (raw.hero?.floatingCard?.metric2Value ?? def.hero.sideCard.metric2Value),
        metric3Label: raw.hero?.sideCard?.metric3Label ?? (raw.hero?.floatingCard?.metric3Label ?? def.hero.sideCard.metric3Label),
        metric3Value: raw.hero?.sideCard?.metric3Value ?? (raw.hero?.floatingCard?.metric3Value ?? def.hero.sideCard.metric3Value),
      }
    },
    servicesSection: {
      badge: raw.servicesSection?.badge ?? (raw.servicesSection?.subtitle ?? def.servicesSection.badge),
      title: raw.servicesSection?.title ?? def.servicesSection.title,
      description: raw.servicesSection?.description ?? def.servicesSection.description,
      services: Array.isArray(raw.servicesSection?.services) ? raw.servicesSection.services : def.servicesSection.services,
    },
    presupuestoSection: {
      badge: raw.presupuestoSection?.badge ?? def.presupuestoSection.badge,
      title: raw.presupuestoSection?.title ?? def.presupuestoSection.title,
      requirementBadge: raw.presupuestoSection?.requirementBadge ?? (raw.presupuestoSection?.subtitle ?? def.presupuestoSection.requirementBadge),
      description: raw.presupuestoSection?.description ?? def.presupuestoSection.description,
      whatsappNumber: raw.presupuestoSection?.whatsappNumber ?? def.presupuestoSection.whatsappNumber,
      whatsappRawNumber: raw.presupuestoSection?.whatsappRawNumber ?? def.presupuestoSection.whatsappRawNumber,
      whatsappDefaultMessage: raw.presupuestoSection?.whatsappDefaultMessage ?? def.presupuestoSection.whatsappDefaultMessage,
      callNumber: raw.presupuestoSection?.callNumber ?? def.presupuestoSection.callNumber,
      callDisplayNumber: raw.presupuestoSection?.callDisplayNumber ?? (raw.presupuestoSection?.callDirectText ?? def.presupuestoSection.callDisplayNumber),
      customCtaNote: raw.presupuestoSection?.customCtaNote ?? (raw.presupuestoSection?.requirementsText ?? def.presupuestoSection.customCtaNote),
    },
    ventajasSection: {
      badge: raw.ventajasSection?.badge ?? (raw.ventajasSection?.subtitle ?? def.ventajasSection.badge),
      title: raw.ventajasSection?.title ?? def.ventajasSection.title,
      description: raw.ventajasSection?.description ?? def.ventajasSection.description,
      advantages: Array.isArray(raw.ventajasSection?.advantages) ? raw.ventajasSection.advantages : def.ventajasSection.advantages,
    },
    externalLinksSection: {
      enabled: raw.externalLinksSection?.enabled ?? def.externalLinksSection.enabled,
      title: raw.externalLinksSection?.title ?? def.externalLinksSection.title,
      description: raw.externalLinksSection?.description ?? def.externalLinksSection.description,
      buttons: Array.isArray(raw.externalLinksSection?.buttons) ? raw.externalLinksSection.buttons : def.externalLinksSection.buttons,
    },
    footer: {
      companyName: raw.footer?.companyName ?? def.footer.companyName,
      description: raw.footer?.description ?? def.footer.description,
      servicesList: Array.isArray(raw.footer?.servicesList) ? raw.footer.servicesList : def.footer.servicesList,
      location: raw.footer?.location ?? def.footer.location,
      contactEmail: raw.footer?.contactEmail ?? def.footer.contactEmail,
      contactPhone: raw.footer?.contactPhone ?? def.footer.contactPhone,
      systemTag1: raw.footer?.systemTag1 ?? def.footer.systemTag1,
      systemTag2: raw.footer?.systemTag2 ?? def.footer.systemTag2,
      copyrightText: raw.footer?.copyrightText ?? def.footer.copyrightText,
    }
  };
}
