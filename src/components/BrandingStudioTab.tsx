import React, { useRef, useState } from 'react';
import { 
  Upload, 
  Trash2, 
  Sparkles, 
  Sliders, 
  Type, 
  Move, 
  Image as ImageIcon, 
  RotateCcw, 
  Check, 
  AlertCircle,
  Eye
} from 'lucide-react';
import { LandingConfig, BrandingConfig } from '../types';
import { BrandLogo } from './BrandLogo';

interface Props {
  formData: LandingConfig;
  setFormData: React.Dispatch<React.SetStateAction<LandingConfig>>;
  isDark: boolean;
  inputClass: string;
  labelClass: string;
  subCardClass: string;
  helperTextClass: string;
}

const FONT_PRESETS: Array<{ label: string; value: BrandingConfig['fontFamily']; sample: string }> = [
  { label: 'Space Grotesk (Tech / Corporativo)', value: 'Space Grotesk', sample: 'ACTUASEG' },
  { label: 'Inter (Limpio & Universal)', value: 'Inter', sample: 'ACTUASEG' },
  { label: 'Montserrat (Geométrico Corporativo)', value: 'Montserrat', sample: 'ACTUASEG' },
  { label: 'Poppins (Moderno & Amigable)', value: 'Poppins', sample: 'ACTUASEG' },
  { label: 'Plus Jakarta Sans (Fintech Elegante)', value: 'Plus Jakarta Sans', sample: 'ACTUASEG' },
  { label: 'Playfair Display (Serif Distinguido)', value: 'Playfair Display', sample: 'ACTUASEG' },
  { label: 'Oswald (Impactante & Audaz)', value: 'Oswald', sample: 'ACTUASEG' },
  { label: 'JetBrains Mono (Técnico Actuarial)', value: 'JetBrains Mono', sample: 'ACTUASEG' },
  { label: 'Sistema / Sans-serif Estándar', value: 'system', sample: 'ACTUASEG' }
];

const COLOR_PRESETS = [
  { name: 'Azul ActuaSeg', hex: '#002855' },
  { name: 'Rojo Acento', hex: '#A11E22' },
  { name: 'Negro Profundo', hex: '#0f172a' },
  { name: 'Azul Marino', hex: '#1e3a8a' },
  { name: 'Verde Esmeralda', hex: '#047857' },
  { name: 'Índigo Real', hex: '#4338ca' },
  { name: 'Pizarra Neutro', hex: '#334155' },
  { name: 'Blanco Puro', hex: '#ffffff' }
];

export const BrandingStudioTab: React.FC<Props> = ({
  formData,
  setFormData,
  isDark,
  inputClass,
  labelClass,
  subCardClass,
  helperTextClass
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const branding = formData.branding;

  const updateBranding = (patch: Partial<BrandingConfig>) => {
    setFormData(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        ...patch
      }
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 4.5MB)
    if (file.size > 4.5 * 1024 * 1024) {
      setUploadError('El archivo es demasiado pesado (máximo 4.5 MB). Elija una imagen optimizada.');
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateBranding({ logoUrl: reader.result });
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    };
    reader.onerror = () => {
      setUploadError('Ocurrió un error al procesar la imagen seleccionada.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCustomLogo = () => {
    updateBranding({ logoUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleResetToOfficialDefaults = () => {
    updateBranding({
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
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className={`pb-4 border-b-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
        isDark ? 'border-[#1f2937]' : 'border-slate-200'
      }`}>
        <div>
          <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Personalización de Logo & Tipografía de Marca
          </h2>
          <p className={helperTextClass}>
            Suba su propio logo en imagen, configure la tipografía de "ACTUASEG", colores, tamaños y posiciones en tiempo real.
          </p>
        </div>
        <button
          type="button"
          onClick={handleResetToOfficialDefaults}
          className={`px-3 py-2 text-xs font-bold rounded-lg border-2 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto ${
            isDark 
              ? 'bg-[#1e293b] hover:bg-[#334155] text-slate-200 border-[#334155]' 
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs'
          }`}
          title="Restablecer estilo oficial de ACTUASEG"
        >
          <RotateCcw className="w-3.5 h-3.5 text-indigo-500" />
          <span>Restablecer Identidad</span>
        </button>
      </div>

      {/* LIVE PREVIEW BOX - Highly visible and responsive */}
      <div className={`p-5 rounded-2xl border-2 space-y-4 shadow-sm ${
        isDark ? 'bg-[#0f172a] border-indigo-900/60' : 'bg-indigo-50/40 border-indigo-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              Vista Previa en Vivo del Logotipo & Marca
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Se actualiza automáticamente al cambiar controles
          </span>
        </div>

        {/* 2 Preview Scenarios: Light Header & Dark Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Header Preview (Light) */}
          <div className="p-4 bg-white rounded-xl border-2 border-slate-200 shadow-xs space-y-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Barra Superior del Sitio (Header Claro)
            </div>
            <div className="py-3 px-2 flex items-center justify-start min-h-[70px] overflow-hidden">
              <BrandLogo branding={branding} theme="light" />
            </div>
          </div>

          {/* Footer Preview (Dark) */}
          <div className="p-4 bg-[#001730] rounded-xl border-2 border-[#002855] shadow-xs space-y-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Pie de Página (Footer Oscuro)
            </div>
            <div className="py-3 px-2 flex items-center justify-start min-h-[70px] overflow-hidden">
              <BrandLogo branding={branding} theme="dark" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: LOGO IMAGE UPLOAD & CONTROLS */}
      <div className={subCardClass}>
        <div className={`flex items-center justify-between pb-3 border-b-2 ${
          isDark ? 'border-[#1f2937]' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-indigo-600" />
            <h3 className={`text-xs font-black uppercase tracking-wider ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              1. Imagen del Logo
            </h3>
          </div>
          <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
            <input 
              type="checkbox"
              checked={branding.showLogo !== false}
              onChange={(e) => updateBranding({ showLogo: e.target.checked })}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
            <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>Mostrar Logo</span>
          </label>
        </div>

        {/* Upload Zone */}
        <div className="space-y-4">
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png,image/jpeg,image/svg+xml,image/webp,image/gif"
            className="hidden"
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Visual Logo Thumbnail */}
            <div className="md:col-span-3 flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-[#1e293b] min-h-[120px]">
              {branding.logoUrl ? (
                <div className="relative group flex items-center justify-center">
                  <img 
                    src={branding.logoUrl} 
                    alt="Logo actual" 
                    className="max-h-20 max-w-full object-contain rounded"
                  />
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-2 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Imagen Personalizada
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center text-slate-400">
                    <BrandLogo branding={branding} />
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold">
                    Logo Oficial por Defecto
                  </div>
                </div>
              )}
            </div>

            {/* Upload Action Buttons */}
            <div className="md:col-span-9 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>Subir Mi Propia Imagen de Logo (PNG, SVG, JPG)</span>
                </button>

                {branding.logoUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveCustomLogo}
                    className="px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-900 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar Imagen y Usar Emblema Original</span>
                  </button>
                )}
              </div>

              {uploadSuccess && (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <Check className="w-4 h-4" />
                  <span>¡Imagen de logo subida y aplicada con éxito!</span>
                </div>
              )}

              {uploadError && (
                <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Alternative URL Input */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                  O ingrese una URL directa de imagen web (opcional):
                </label>
                <input 
                  type="text"
                  placeholder="https://su-empresa.com/logo.png"
                  value={branding.logoUrl || ''}
                  onChange={(e) => updateBranding({ logoUrl: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Logo Sizing, Shape, and Fitting Controls */}
          <div className="pt-3 border-t-2 border-slate-200 dark:border-[#1f2937] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Logo Size */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={labelClass}>Tamaño del Logo</label>
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  {branding.logoSize || 42}px
                </span>
              </div>
              <input 
                type="range"
                min="24"
                max="90"
                step="2"
                value={branding.logoSize || 42}
                onChange={(e) => updateBranding({ logoSize: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>24px (Compacto)</span>
                <span>90px (Grande)</span>
              </div>
            </div>

            {/* Logo Shape */}
            <div>
              <label className={labelClass}>Forma / Bordes</label>
              <select
                value={branding.logoShape || 'rounded'}
                onChange={(e) => updateBranding({ logoShape: e.target.value as any })}
                className={inputClass}
              >
                <option value="rounded">Esquinas Suaves (Redondeado)</option>
                <option value="square">Cuadrado Recto (Sin curvas)</option>
                <option value="circle">Circular Completo (Redondo)</option>
              </select>
            </div>

            {/* Logo Fit */}
            <div>
              <label className={labelClass}>Ajuste de Imagen (Fit)</label>
              <select
                value={branding.logoFit || 'contain'}
                onChange={(e) => updateBranding({ logoFit: e.target.value as any })}
                className={inputClass}
              >
                <option value="contain">Contener (Contain - Proporción Original)</option>
                <option value="cover">Cubrir (Cover - Rellena todo el cuadro)</option>
              </select>
            </div>

            {/* Logo Padding */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={labelClass}>Margen Interno (Padding)</label>
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  {branding.logoPadding || 0}px
                </span>
              </div>
              <input 
                type="range"
                min="0"
                max="16"
                step="1"
                value={branding.logoPadding || 0}
                onChange={(e) => updateBranding({ logoPadding: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: BRAND NAME TEXT & TYPOGRAPHY ("ACTUASEG") */}
      <div className={subCardClass}>
        <div className={`flex items-center justify-between pb-3 border-b-2 ${
          isDark ? 'border-[#1f2937]' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-indigo-600" />
            <h3 className={`text-xs font-black uppercase tracking-wider ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              2. Texto de la Marca ("ACTUASEG") & Tipografía
            </h3>
          </div>
          <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
            <input 
              type="checkbox"
              checked={branding.showName !== false}
              onChange={(e) => updateBranding({ showName: e.target.checked })}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
            <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>Mostrar Texto</span>
          </label>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Brand Name Input */}
            <div>
              <label className={labelClass}>Nombre de la Marca o Empresa</label>
              <input 
                type="text"
                value={branding.name}
                onChange={(e) => updateBranding({ name: e.target.value })}
                className={inputClass}
                placeholder="ACTUASEG"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Puede conservar ACTUASEG o personalizarlo como desee.
              </span>
            </div>

            {/* Font Family Selector */}
            <div>
              <label className={labelClass}>Tipo de Fuente (Font Family)</label>
              <select
                value={branding.fontFamily || 'Space Grotesk'}
                onChange={(e) => updateBranding({ fontFamily: e.target.value as any })}
                className={inputClass}
              >
                {FONT_PRESETS.map(font => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Color & Size Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Text Color */}
            <div>
              <label className={labelClass}>Color del Texto</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color"
                  value={branding.textColor || branding.primaryColor || '#002855'}
                  onChange={(e) => updateBranding({ textColor: e.target.value })}
                  className="w-10 h-10 rounded border-2 border-slate-300 dark:border-slate-600 cursor-pointer shrink-0"
                />
                <input 
                  type="text"
                  value={branding.textColor || branding.primaryColor || '#002855'}
                  onChange={(e) => updateBranding({ textColor: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Text Size */}
            <div>
              <label className={labelClass}>Tamaño del Texto</label>
              <select
                value={branding.textSize || 'xl'}
                onChange={(e) => updateBranding({ textSize: e.target.value as any })}
                className={inputClass}
              >
                <option value="sm">Pequeño (14px)</option>
                <option value="base">Mediano (16px)</option>
                <option value="lg">Grande (18px)</option>
                <option value="xl">Extra Grande (20px - Estándar)</option>
                <option value="2xl">2X Grande (24px)</option>
                <option value="3xl">3X Grande (30px)</option>
              </select>
            </div>

            {/* Font Weight */}
            <div>
              <label className={labelClass}>Grosor de Fuente (Weight)</label>
              <select
                value={branding.fontWeight || 'black'}
                onChange={(e) => updateBranding({ fontWeight: e.target.value as any })}
                className={inputClass}
              >
                <option value="normal">Normal (400)</option>
                <option value="semibold">Semi-Negrita (600)</option>
                <option value="bold">Negrita (700)</option>
                <option value="extrabold">Extra-Negrita (800)</option>
                <option value="black">Ultra-Negrita (900 - Black)</option>
              </select>
            </div>

            {/* Letter Spacing */}
            <div>
              <label className={labelClass}>Espaciado Entre Letras</label>
              <select
                value={branding.letterSpacing || 'tight'}
                onChange={(e) => updateBranding({ letterSpacing: e.target.value as any })}
                className={inputClass}
              >
                <option value="tight">Apretado (-0.025em)</option>
                <option value="normal">Normal (0em)</option>
                <option value="wide">Separado (+0.04em)</option>
                <option value="wider">Muy Separado (+0.1em)</option>
                <option value="widest">Extendido (+0.22em)</option>
              </select>
            </div>
          </div>

          {/* Quick Color Presets */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">
              Paleta Rápida de Colores Sugeridos para el Nombre:
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {COLOR_PRESETS.map((col) => (
                <button
                  key={col.hex}
                  type="button"
                  onClick={() => updateBranding({ textColor: col.hex })}
                  className="px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                    borderColor: branding.textColor === col.hex ? '#4f46e5' : '#cbd5e1'
                  }}
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: col.hex }} />
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{col.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: TAGLINE / SUBTITLE ("Actuarios Seguros") */}
      <div className={subCardClass}>
        <div className={`flex items-center justify-between pb-3 border-b-2 ${
          isDark ? 'border-[#1f2937]' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className={`text-xs font-black uppercase tracking-wider ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              3. Subtítulo / Eslogan ("Actuarios Seguros")
            </h3>
          </div>
          <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
            <input 
              type="checkbox"
              checked={branding.showTagline !== false}
              onChange={(e) => updateBranding({ showTagline: e.target.checked })}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
            <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>Mostrar Subtítulo</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tagline Text */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Texto del Subtítulo</label>
            <input 
              type="text"
              value={branding.tagline}
              onChange={(e) => updateBranding({ tagline: e.target.value })}
              className={inputClass}
              placeholder="Actuarios Seguros"
            />
          </div>

          {/* Tagline Color */}
          <div>
            <label className={labelClass}>Color del Subtítulo</label>
            <div className="flex items-center gap-2">
              <input 
                type="color"
                value={branding.taglineColor || branding.accentColor || '#A11E22'}
                onChange={(e) => updateBranding({ taglineColor: e.target.value })}
                className="w-10 h-10 rounded border-2 border-slate-300 dark:border-slate-600 cursor-pointer shrink-0"
              />
              <input 
                type="text"
                value={branding.taglineColor || branding.accentColor || '#A11E22'}
                onChange={(e) => updateBranding({ taglineColor: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Tagline Size */}
          <div>
            <label className={labelClass}>Tamaño del Subtítulo</label>
            <select
              value={branding.taglineSize || 'tiny'}
              onChange={(e) => updateBranding({ taglineSize: e.target.value as any })}
              className={inputClass}
            >
              <option value="tiny">Diminuto (8px - Estilo Oficial)</option>
              <option value="xs">Extra Pequeño (10px)</option>
              <option value="sm">Pequeño (12px)</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 4: POSICIONES, ALINEACIÓN Y DISTRIBUCIÓN */}
      <div className={subCardClass}>
        <div className={`flex items-center gap-2 pb-3 border-b-2 ${
          isDark ? 'border-[#1f2937]' : 'border-slate-200'
        }`}>
          <Move className="w-4 h-4 text-indigo-600" />
          <h3 className={`text-xs font-black uppercase tracking-wider ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            4. Posición, Distribución y Separación
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Layout Direction */}
          <div>
            <label className={labelClass}>Posición del Logo Respecto al Texto</label>
            <select
              value={branding.layoutPosition || 'logo-left'}
              onChange={(e) => updateBranding({ layoutPosition: e.target.value as any })}
              className={inputClass}
            >
              <option value="logo-left">Logo a la Izquierda (Estándar)</option>
              <option value="logo-right">Logo a la Derecha</option>
              <option value="logo-top">Logo Arriba (Vertical Centrado)</option>
              <option value="logo-bottom">Logo Abajo (Vertical)</option>
            </select>
          </div>

          {/* Alignment */}
          <div>
            <label className={labelClass}>Alineación</label>
            <select
              value={branding.alignment || 'center'}
              onChange={(e) => updateBranding({ alignment: e.target.value as any })}
              className={inputClass}
            >
              <option value="center">Centrado (Recomendado)</option>
              <option value="start">Alineado al Inicio / Superior</option>
              <option value="end">Alineado al Final / Inferior</option>
            </select>
          </div>

          {/* Spacing / Gap */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={labelClass}>Separación (Espacio)</label>
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 font-mono">
                {branding.gap || 12}px
              </span>
            </div>
            <input 
              type="range"
              min="4"
              max="36"
              step="2"
              value={branding.gap || 12}
              onChange={(e) => updateBranding({ gap: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>4px (Junto)</span>
              <span>36px (Separado)</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: CORPORATE THEME COLORS */}
      <div className={subCardClass}>
        <div className={`flex items-center gap-2 pb-3 border-b-2 ${
          isDark ? 'border-[#1f2937]' : 'border-slate-200'
        }`}>
          <Sliders className="w-4 h-4 text-indigo-600" />
          <h3 className={`text-xs font-black uppercase tracking-wider ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            5. Colores Maestros de Identidad Visual (Primario & Acento)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Color Primario de la Plataforma (Hex)</label>
            <div className="flex items-center gap-2">
              <input 
                type="color"
                value={branding.primaryColor || '#002855'}
                onChange={(e) => updateBranding({ primaryColor: e.target.value })}
                className="w-10 h-10 rounded border-2 border-slate-300 dark:border-slate-600 cursor-pointer shrink-0"
              />
              <input 
                type="text"
                value={branding.primaryColor || '#002855'}
                onChange={(e) => updateBranding({ primaryColor: e.target.value })}
                className={inputClass}
              />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Afecta botones principales, emblema vectorial y elementos de énfasis institucional.
            </span>
          </div>

          <div>
            <label className={labelClass}>Color de Acento (Hex)</label>
            <div className="flex items-center gap-2">
              <input 
                type="color"
                value={branding.accentColor || '#A11E22'}
                onChange={(e) => updateBranding({ accentColor: e.target.value })}
                className="w-10 h-10 rounded border-2 border-slate-300 dark:border-slate-600 cursor-pointer shrink-0"
              />
              <input 
                type="text"
                value={branding.accentColor || '#A11E22'}
                onChange={(e) => updateBranding({ accentColor: e.target.value })}
                className={inputClass}
              />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Afecta distintivos, curvas del emblema, bordes destacados y alertas.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
