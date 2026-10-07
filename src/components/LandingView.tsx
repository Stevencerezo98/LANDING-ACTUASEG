import React, { useState } from 'react';
import { 
  Shield, 
  ExternalLink, 
  Lock, 
  Key, 
  ArrowRight, 
  Database,
  Layers,
  Briefcase,
  Activity,
  Users,
  Award,
  RefreshCw,
  Phone,
  MessageSquare,
  MapPin,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingConfig } from '../types';
import { normalizeLandingConfig } from '../landingDefaults';
import { BrandLogo } from './BrandLogo';

interface Props {
  config: LandingConfig;
  onOpenDashboard: () => void;
}

export const LandingView: React.FC<Props> = ({ config: rawConfig, onOpenDashboard }) => {
  const config = normalizeLandingConfig(rawConfig);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to render icon for services
  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'briefcase': return <Briefcase className="w-5 h-5" />;
      case 'activity': return <Activity className="w-5 h-5" />;
      case 'users': return <Users className="w-5 h-5" />;
      case 'shield': return <Shield className="w-5 h-5" />;
      case 'award': return <Award className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  // Helper to render icon for advantages
  const renderAdvantageIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield': return <Shield className="w-6 h-6" />;
      case 'refresh': return <RefreshCw className="w-6 h-6" />;
      case 'users': return <Users className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  // Helper to render icon for external button
  const renderButtonIcon = (iconName: string) => {
    switch (iconName) {
      case 'external-link': return <ExternalLink className="w-4 h-4" />;
      case 'lock': return <Lock className="w-4 h-4" />;
      case 'key': return <Key className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'arrow-right': return <ArrowRight className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  // Helper for button classes
  const getButtonClass = (variant: string) => {
    switch (variant) {
      case 'accent':
        return 'bg-[#A11E22] hover:bg-[#83161a] text-white shadow-md shadow-[#A11E22]/15';
      case 'outline':
        return 'bg-transparent border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50';
      case 'emerald':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/15';
      default:
        return 'bg-[#002855] hover:bg-[#001c3d] text-white shadow-md shadow-[#002855]/15';
    }
  };

  const whatsappLink = `https://wa.me/${config.presupuestoSection.whatsappRawNumber}?text=${encodeURIComponent(config.presupuestoSection.whatsappDefaultMessage)}`;

  return (
    <div id="landing-root" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#002855] selection:text-white">
      {/* Header Bar - Pure Solid Client Presentation (NO blur/glass) */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 md:px-12 py-3.5 flex items-center justify-between shadow-xs">
        {/* Brand Logo & Name */}
        <BrandLogo branding={config.branding} />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-600">
          {config.header.navLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target={link.isExternal ? '_blank' : undefined}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
              className="hover:text-[#002855] hover:border-b-2 hover:border-[#A11E22] py-1 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Header Buttons (External System Button + Additional Custom Buttons + Dashboard Access) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Main Configurable External System Link Button */}
          {config.header.externalSystemButton.enabled && (
            <a
              href={config.header.externalSystemButton.url}
              target={config.header.externalSystemButton.openInNewTab ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${getButtonClass(config.header.externalSystemButton.styleVariant)}`}
            >
              {renderButtonIcon(config.header.externalSystemButton.icon)}
              <span>{config.header.externalSystemButton.label}</span>
            </a>
          )}

          {/* Additional Custom Buttons in Header */}
          {config.header.additionalButtons?.map((btn) => (
            <a
              key={btn.id}
              href={btn.url}
              target={btn.openInNewTab ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className={`px-3.5 py-2 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${getButtonClass(btn.styleVariant)}`}
            >
              <span>{btn.label}</span>
            </a>
          ))}

        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-[#002855] rounded-lg border border-slate-200"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 flex flex-col gap-3.5 text-center shadow-lg"
          >
            {config.header.navLinks.map((link) => (
              <a 
                key={link.id} 
                href={link.url}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm text-slate-700 font-semibold hover:text-[#002855]"
              >
                {link.label}
              </a>
            ))}

            {config.header.externalSystemButton.enabled && (
              <a
                href={config.header.externalSystemButton.url}
                target={config.header.externalSystemButton.openInNewTab ? '_blank' : '_self'}
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-2 ${getButtonClass(config.header.externalSystemButton.styleVariant)}`}
              >
                {renderButtonIcon(config.header.externalSystemButton.icon)}
                <span>{config.header.externalSystemButton.label}</span>
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#A11E22]/10 px-4 py-1.5 rounded-full border border-[#A11E22]/25">
              <span className="w-2 h-2 rounded-full bg-[#A11E22] animate-pulse"></span>
              <span className="text-[10px] uppercase font-bold text-[#A11E22] tracking-widest">
                {config.hero.badgeText}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-display text-[#002855] tracking-tight leading-tight">
              {config.hero.headlineMain} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002855] via-[#2a568b] to-[#A11E22]">
                {config.hero.headlineHighlight}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              {config.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <a 
                href={config.hero.ctaPrimary.url}
                target={config.hero.ctaPrimary.isExternal ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#002855] hover:bg-[#001f44] text-white font-bold text-xs uppercase tracking-wider rounded-lg text-center shadow-md transition-all font-sans"
              >
                {config.hero.ctaPrimary.label}
              </a>
              <a 
                href={config.hero.ctaSecondary.url}
                target={config.hero.ctaSecondary.isExternal ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-lg text-center transition-all font-sans"
              >
                {config.hero.ctaSecondary.label}
              </a>
            </div>
          </div>

          {/* Hero Side Graphic Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#002855]" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">{config.hero.sideCard.title}</h3>
                    <p className="text-[9px] text-slate-500">{config.hero.sideCard.subtitle}</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase tracking-wider">
                  {config.hero.sideCard.badge}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                  <span>Cumplimiento Actuarial NIIF / NIC 19</span>
                  <span className="font-mono text-[#002855] font-bold">100% Auditado</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#002855] to-[#A11E22] rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px] border-t border-slate-100 pt-3">
                <div>
                  <p className="text-slate-500">{config.hero.sideCard.metric1Label}</p>
                  <p className="text-xs font-bold text-slate-800">{config.hero.sideCard.metric1Value}</p>
                </div>
                <div>
                  <p className="text-slate-500">{config.hero.sideCard.metric2Label}</p>
                  <p className="text-xs font-bold text-[#002855]">{config.hero.sideCard.metric2Value}</p>
                </div>
                <div>
                  <p className="text-slate-500">{config.hero.sideCard.metric3Label}</p>
                  <p className="text-xs font-bold text-emerald-600">{config.hero.sideCard.metric3Value}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="servicios" className="px-6 md:px-12 py-16 bg-slate-100/60 border-y border-slate-200/60 scroll-mt-16">
          <div className="max-w-7xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs uppercase font-bold text-[#A11E22] tracking-widest block">
              {config.servicesSection.badge}
            </span>
            <h2 className="text-2xl md:text-3xl font-black font-display text-[#002855]">
              {config.servicesSection.title}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-xs md:text-sm">
              {config.servicesSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {config.servicesSection.services.map((srv) => (
              <div key={srv.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-[#A11E22]/40 transition-all">
                <div className="space-y-3 text-left">
                  <div className="w-10 h-10 bg-[#002855]/5 rounded-xl flex items-center justify-center text-[#A11E22]">
                    {renderServiceIcon(srv.icon)}
                  </div>
                  <h3 className="text-base font-bold text-[#002855] font-display">{srv.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {srv.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-[10px] text-[#002855] font-extrabold uppercase">{srv.tag}</span>
                  <a 
                    href={srv.buttonUrl} 
                    target={srv.isExternalUrl ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-[#002855] hover:text-[#A11E22] text-xs font-bold flex items-center gap-1"
                  >
                    <span>{srv.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRESUPUESTO SECTION */}
        <section id="presupuesto" className="px-6 md:px-12 py-16 max-w-4xl mx-auto scroll-mt-16 text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold text-[#A11E22] tracking-widest block">
              {config.presupuestoSection.badge}
            </span>
            <h2 className="text-2xl md:text-3xl font-black font-display text-[#002855]">
              {config.presupuestoSection.title}
            </h2>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-[#002855] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
              <Users className="w-4 h-4 text-[#A11E22]" />
              <span>{config.presupuestoSection.requirementBadge}</span>
            </div>
            <p className="text-slate-600 max-w-xl mx-auto text-xs md:text-sm">
              {config.presupuestoSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* WhatsApp Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between items-center text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#002855]">WhatsApp Actuarial</h3>
                <p className="text-xs text-slate-500 mt-1">Escríbanos indicando el número de personas a evaluar.</p>
              </div>
              <div className="font-mono text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                {config.presupuestoSection.whatsappNumber}
              </div>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enviar por WhatsApp</span>
              </a>
            </div>

            {/* Direct Phone Call Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between items-center text-center space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-[#002855] rounded-2xl flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#002855]">Llamada Directa</h3>
                <p className="text-xs text-slate-500 mt-1">Atención telefónica directa con actuarios certificados.</p>
              </div>
              <div className="font-mono text-sm font-bold text-[#002855] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                {config.presupuestoSection.callDisplayNumber}
              </div>
              <a 
                href={`tel:${config.presupuestoSection.callNumber}`}
                className="w-full py-3 bg-[#002855] hover:bg-[#001f44] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#002855]/10 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar Ahora</span>
              </a>
            </div>
          </div>

          {config.presupuestoSection.customCtaNote && (
            <p className="text-[11px] text-slate-500 italic max-w-md mx-auto">
              {config.presupuestoSection.customCtaNote}
            </p>
          )}
        </section>

        {/* VENTAJAS SECTION */}
        <section id="ventajas" className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-t border-slate-200/60">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase font-bold text-[#A11E22] tracking-widest block">
              {config.ventajasSection.badge}
            </span>
            <h2 className="text-2xl md:text-3xl font-black font-display text-[#002855]">
              {config.ventajasSection.title}
            </h2>
            {config.ventajasSection.description && (
              <p className="text-slate-600 max-w-2xl mx-auto text-xs md:text-sm">
                {config.ventajasSection.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.ventajasSection.advantages.map((adv) => (
              <div key={adv.id} className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 text-left shadow-xs">
                <div className="text-[#A11E22]">
                  {renderAdvantageIcon(adv.icon)}
                </div>
                <h3 className="text-base font-bold text-[#002855]">{adv.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* EXTERNAL LINKS SECTION (IF CONFIGURED) */}
        {config.externalLinksSection?.enabled && config.externalLinksSection.buttons.length > 0 && (
          <section className="px-6 md:px-12 py-12 bg-slate-900 text-white">
            <div className="max-w-5xl mx-auto text-center space-y-4">
              <span className="text-xs uppercase font-bold text-indigo-400 tracking-widest block">
                Accesos Directos
              </span>
              <h3 className="text-xl md:text-2xl font-black font-display">
                {config.externalLinksSection.title}
              </h3>
              <p className="text-slate-400 text-xs max-w-xl mx-auto">
                {config.externalLinksSection.description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                {config.externalLinksSection.buttons.map((btn) => (
                  <a
                    key={btn.id}
                    href={btn.url}
                    target={btn.openInNewTab ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold tracking-wide uppercase transition-all shadow-md flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{btn.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer id="contacto" className="mt-auto bg-[#001730] border-t border-[#002855]/40 text-slate-300 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-xs mb-8">
          <div className="space-y-3">
            <BrandLogo branding={config.branding} theme="dark" />
            <p className="text-slate-400 leading-relaxed">{config.footer.description}</p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Servicios Principales</h4>
            <ul className="space-y-2 text-slate-400">
              {config.footer.servicesList.map((item, idx) => (
                <li key={idx}><a href={item.url} className="hover:text-white transition-colors">{item.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Contacto Corporativo</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#A11E22]" /> <span>{config.footer.location}</span></li>
              <li className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> <span>{config.footer.contactPhone}</span></li>
              <li className="flex items-center gap-1.5 font-mono text-[11px]"><span>{config.footer.contactEmail}</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider">Enlaces a Sistemas</h4>
            {config.header.externalSystemButton.enabled && (
              <a
                href={config.header.externalSystemButton.url}
                target={config.header.externalSystemButton.openInNewTab ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#A11E22] hover:bg-[#85161a] text-white font-bold rounded-lg text-xs text-center transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {renderButtonIcon(config.header.externalSystemButton.icon)}
                <span>{config.header.externalSystemButton.label}</span>
              </a>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500">
          <div className="flex gap-4">
            <span>{config.footer.systemTag1}</span>
            <span>{config.footer.systemTag2}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>&copy; {new Date().getFullYear()} {config.footer.companyName}. {config.footer.copyrightText}</span>
            <span className="text-slate-700">|</span>
            {/* Subtle administration portal access link for administrators */}
            <button
              onClick={onOpenDashboard}
              className="text-slate-600 hover:text-slate-400 transition-colors flex items-center gap-1 cursor-pointer"
              title="Acceso exclusivo administración"
            >
              <Lock className="w-3 h-3" />
              <span>Administración</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
