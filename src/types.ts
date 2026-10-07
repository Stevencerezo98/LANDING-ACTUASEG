/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavLink {
  id: string;
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface ExternalButtonConfig {
  enabled: boolean;
  label: string;
  url: string;
  openInNewTab: boolean;
  icon: 'shield' | 'external-link' | 'lock' | 'arrow-right' | 'key' | 'database';
  styleVariant: 'primary' | 'accent' | 'outline' | 'emerald';
}

export interface CustomButton {
  id: string;
  label: string;
  url: string;
  openInNewTab: boolean;
  styleVariant: 'primary' | 'accent' | 'outline' | 'emerald';
}

export interface ServiceItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  isExternalUrl?: boolean;
  icon: 'layers' | 'briefcase' | 'activity' | 'users' | 'shield' | 'trending-up' | 'file-text' | 'award';
}

export interface AdvantageItem {
  id: string;
  title: string;
  description: string;
  icon: 'award' | 'shield' | 'refresh' | 'check' | 'users' | 'activity';
}

export interface HeroCardMetric {
  title: string;
  value: string;
  highlight?: boolean;
}

export interface BrandingConfig {
  name: string;
  tagline: string;
  logoUrl?: string; // Optional image URL or base64 data URL
  primaryColor: string; // e.g. #002855
  accentColor: string; // e.g. #A11E22

  // Logo customization
  showLogo?: boolean;
  logoSize?: number; // size in px, e.g. 42 (range 24 - 100)
  logoShape?: 'square' | 'rounded' | 'circle';
  logoFit?: 'contain' | 'cover';
  logoBackground?: string; // e.g. 'transparent', '#ffffff'
  logoPadding?: number; // px padding

  // Brand text / Typography customization
  showName?: boolean;
  fontFamily?: 'Space Grotesk' | 'Inter' | 'Montserrat' | 'Poppins' | 'Plus Jakarta Sans' | 'Playfair Display' | 'Oswald' | 'JetBrains Mono' | 'system';
  textColor?: string;
  textSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  fontWeight?: 'normal' | 'semibold' | 'bold' | 'extrabold' | 'black';
  letterSpacing?: 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
  textTransform?: 'uppercase' | 'capitalize' | 'none';

  // Tagline customization
  showTagline?: boolean;
  taglineColor?: string;
  taglineSize?: 'tiny' | 'xs' | 'sm';
  taglineWeight?: 'normal' | 'semibold' | 'bold' | 'black';

  // Positions and Layout
  layoutPosition?: 'logo-left' | 'logo-right' | 'logo-top' | 'logo-bottom';
  alignment?: 'start' | 'center' | 'end';
  gap?: number; // spacing in px
}

export interface LandingConfig {
  id: string;
  updatedAt: string;
  branding: BrandingConfig;
  header: {
    navLinks: NavLink[];
    externalSystemButton: ExternalButtonConfig;
    additionalButtons?: CustomButton[];
  };
  hero: {
    badgeText: string;
    headlineMain: string;
    headlineHighlight: string;
    description: string;
    ctaPrimary: {
      label: string;
      url: string;
      isExternal?: boolean;
    };
    ctaSecondary: {
      label: string;
      url: string;
      isExternal?: boolean;
    };
    sideCard: {
      badge: string;
      title: string;
      subtitle: string;
      metric1Label: string;
      metric1Value: string;
      metric2Label: string;
      metric2Value: string;
      metric3Label: string;
      metric3Value: string;
    };
  };
  servicesSection: {
    badge: string;
    title: string;
    description: string;
    services: ServiceItem[];
  };
  presupuestoSection: {
    badge: string;
    title: string;
    requirementBadge: string;
    description: string;
    whatsappNumber: string; // e.g. "+593 98 820 4349"
    whatsappRawNumber: string; // e.g. "593988204349"
    whatsappDefaultMessage: string;
    callNumber: string;
    callDisplayNumber: string;
    customCtaNote?: string;
  };
  ventajasSection: {
    badge: string;
    title: string;
    description?: string;
    advantages: AdvantageItem[];
  };
  externalLinksSection: {
    enabled: boolean;
    title: string;
    description: string;
    buttons: CustomButton[];
  };
  footer: {
    companyName: string;
    description: string;
    servicesList: Array<{ label: string; url: string }>;
    location: string;
    contactEmail: string;
    contactPhone: string;
    systemTag1: string;
    systemTag2: string;
    copyrightText: string;
  };
}
