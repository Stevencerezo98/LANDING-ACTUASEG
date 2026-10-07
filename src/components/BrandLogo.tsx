import React from 'react';
import { BrandingConfig } from '../types';

interface Props {
  branding: BrandingConfig;
  theme?: 'light' | 'dark';
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<Props> = ({ branding, theme = 'light', className = '', onClick }) => {
  const showLogo = branding.showLogo !== false;
  const showName = branding.showName !== false;
  const showTagline = branding.showTagline !== false && Boolean(branding.tagline);

  // Fallbacks
  const primaryColor = branding.primaryColor || '#002855';
  const accentColor = branding.accentColor || '#A11E22';
  const textColor = theme === 'dark' ? '#ffffff' : (branding.textColor || primaryColor);
  const taglineColor = theme === 'dark' ? (branding.accentColor || '#f87171') : (branding.taglineColor || accentColor);
  const logoSize = branding.logoSize || 42;
  const gap = typeof branding.gap === 'number' ? branding.gap : 12;

  // Font family helper
  const getFontFamily = (font?: string) => {
    switch (font) {
      case 'Inter':
        return "'Inter', sans-serif";
      case 'Montserrat':
        return "'Montserrat', sans-serif";
      case 'Poppins':
        return "'Poppins', sans-serif";
      case 'Plus Jakarta Sans':
        return "'Plus Jakarta Sans', sans-serif";
      case 'Playfair Display':
        return "'Playfair Display', Georgia, serif";
      case 'Oswald':
        return "'Oswald', sans-serif";
      case 'JetBrains Mono':
        return "'JetBrains Mono', monospace";
      case 'system':
        return "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      case 'Space Grotesk':
      default:
        return "'Space Grotesk', sans-serif";
    }
  };

  // Font weight helper
  const getFontWeight = (weight?: string) => {
    switch (weight) {
      case 'normal': return 400;
      case 'semibold': return 600;
      case 'bold': return 700;
      case 'extrabold': return 800;
      case 'black':
      default: return 900;
    }
  };

  // Text size helper
  const getTextSizeClass = (size?: string) => {
    switch (size) {
      case 'sm': return 'text-sm leading-tight';
      case 'base': return 'text-base leading-tight';
      case 'lg': return 'text-lg leading-tight';
      case '2xl': return 'text-2xl leading-none';
      case '3xl': return 'text-3xl leading-none';
      case 'xl':
      default: return 'text-xl leading-none';
    }
  };

  // Letter spacing helper
  const getLetterSpacing = (spacing?: string) => {
    switch (spacing) {
      case 'wide': return '0.04em';
      case 'wider': return '0.1em';
      case 'widest': return '0.22em';
      case 'normal': return '0em';
      case 'tight':
      default: return '-0.025em';
    }
  };

  // Shape helper
  const getShapeClass = (shape?: string) => {
    switch (shape) {
      case 'square': return 'rounded-none';
      case 'circle': return 'rounded-full';
      case 'rounded':
      default: return 'rounded-lg';
    }
  };

  // Alignment helper
  const getAlignmentClass = (align?: string, layout?: string) => {
    const isCol = layout === 'logo-top' || layout === 'logo-bottom';
    if (isCol) {
      switch (align) {
        case 'start': return 'items-start text-left';
        case 'end': return 'items-end text-right';
        case 'center':
        default: return 'items-center text-center';
      }
    } else {
      switch (align) {
        case 'start': return 'items-start text-left';
        case 'end': return 'items-end text-left';
        case 'center':
        default: return 'items-center text-left';
      }
    }
  };

  // Direction class
  const getLayoutClass = (layout?: string) => {
    switch (layout) {
      case 'logo-right': return 'flex-row-reverse';
      case 'logo-top': return 'flex-col';
      case 'logo-bottom': return 'flex-col-reverse';
      case 'logo-left':
      default: return 'flex-row';
    }
  };

  const layoutPos = branding.layoutPosition || 'logo-left';
  const isVertical = layoutPos === 'logo-top' || layoutPos === 'logo-bottom';

  return (
    <div
      onClick={onClick}
      className={`inline-flex transition-all select-none ${getLayoutClass(layoutPos)} ${getAlignmentClass(branding.alignment, layoutPos)} ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {/* LOGO ICON / IMAGE */}
      {showLogo && (
        <div
          className={`shrink-0 overflow-hidden flex items-center justify-center transition-transform ${getShapeClass(branding.logoShape)}`}
          style={{
            width: `${logoSize}px`,
            height: `${logoSize}px`,
            backgroundColor: branding.logoBackground && branding.logoBackground !== 'transparent' ? branding.logoBackground : undefined,
            padding: branding.logoPadding ? `${branding.logoPadding}px` : undefined,
          }}
        >
          {branding.logoUrl ? (
            <img
              src={branding.logoUrl}
              alt={branding.name || 'Logo'}
              className="w-full h-full"
              style={{
                objectFit: branding.logoFit || 'contain',
              }}
            />
          ) : (
            /* Default Actuarial Geometric Emblem */
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 14 L20 84 H35 L41 64 H59 L65 84 H80 Z"
                fill={theme === 'dark' ? '#ffffff' : primaryColor}
              />
              <path
                d="M68 32 C68 18, 44 14, 38 26 C30 38, 70 42, 62 62 C54 78, 30 74, 32 58"
                stroke={accentColor}
                strokeWidth="10.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M41 64 H59"
                stroke={theme === 'dark' ? '#ffffff' : primaryColor}
                strokeWidth="6"
              />
            </svg>
          )}
        </div>
      )}

      {/* BRAND TEXT & TAGLINE */}
      {(showName || showTagline) && (
        <div className={`flex flex-col ${isVertical && (!branding.alignment || branding.alignment === 'center') ? 'items-center text-center' : 'items-start text-left'}`}>
          {showName && (
            <span
              className={`tracking-tight transition-colors ${getTextSizeClass(branding.textSize)}`}
              style={{
                fontFamily: getFontFamily(branding.fontFamily),
                fontWeight: getFontWeight(branding.fontWeight),
                color: textColor,
                letterSpacing: getLetterSpacing(branding.letterSpacing),
                textTransform: (branding.textTransform || 'uppercase') as any,
              }}
            >
              {branding.name || 'ACTUASEG'}
            </span>
          )}

          {showTagline && (
            <span
              className={`uppercase tracking-[0.25em] font-black leading-none mt-1 transition-colors ${
                branding.taglineSize === 'sm' ? 'text-[11px]' : branding.taglineSize === 'xs' ? 'text-[9px]' : 'text-[8px]'
              }`}
              style={{
                color: taglineColor,
                fontWeight: getFontWeight(branding.taglineWeight || 'black'),
              }}
            >
              {branding.tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
