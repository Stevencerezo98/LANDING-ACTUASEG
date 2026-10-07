import React, { useState } from 'react';
import { 
  Save, 
  Eye, 
  RotateCcw, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Shield, 
  Check, 
  Layers, 
  MessageSquare, 
  Sparkles, 
  Sliders, 
  Palette, 
  Phone, 
  ArrowLeft,
  Sun,
  Moon,
  Info,
  CheckCircle2,
  LogOut,
  KeyRound,
  Lock,
  Image as ImageIcon
} from 'lucide-react';
import { LandingConfig, ServiceItem, AdvantageItem, CustomButton } from '../types';
import { normalizeLandingConfig } from '../landingDefaults';
import { LandingView } from './LandingView';
import { BrandingStudioTab } from './BrandingStudioTab';

interface Props {
  config: LandingConfig;
  onSave: (newConfig: LandingConfig) => Promise<void>;
  onReset: () => Promise<void>;
  onClose: () => void;
  onLogout: () => void;
  adminToken?: string | null;
  isSaving: boolean;
}

export const LandingDashboard: React.FC<Props> = ({
  config: initialConfig,
  onSave,
  onReset,
  onClose,
  onLogout,
  adminToken,
  isSaving
}) => {
  const [formData, setFormData] = useState<LandingConfig>(() => normalizeLandingConfig(initialConfig));
  const [activeTab, setActiveTab] = useState<'branding' | 'system-button' | 'hero' | 'services' | 'presupuesto' | 'ventajas' | 'footer' | 'security' | 'preview'>('branding');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);
  // Default to pure solid high-contrast Light mode for maximum visibility
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // Admin password change state
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  React.useEffect(() => {
    setFormData(normalizeLandingConfig(initialConfig));
  }, [initialConfig]);

  const isDark = themeMode === 'dark';

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await onSave(formData);
    setSaveSuccessMessage(true);
    setTimeout(() => setSaveSuccessMessage(false), 3500);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminPassword || newAdminPassword.trim().length < 4) {
      setPasswordChangeStatus({ type: 'error', message: 'La nueva contraseña debe tener al menos 4 caracteres.' });
      return;
    }
    if (newAdminPassword !== confirmAdminPassword) {
      setPasswordChangeStatus({ type: 'error', message: 'Las contraseñas no coinciden.' });
      return;
    }

    setIsChangingPassword(true);
    setPasswordChangeStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken || ''
        },
        body: JSON.stringify({ newPassword: newAdminPassword.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setPasswordChangeStatus({ type: 'success', message: '¡Contraseña de administrador actualizada con éxito!' });
        setNewAdminPassword('');
        setConfirmAdminPassword('');
        setTimeout(() => setPasswordChangeStatus({ type: '', message: '' }), 4000);
      } else {
        setPasswordChangeStatus({ type: 'error', message: data.message || 'Error al cambiar la contraseña.' });
      }
    } catch (err) {
      setPasswordChangeStatus({ type: 'error', message: 'Error de conexión con el servidor.' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Service helpers
  const handleAddService = () => {
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: 'Nuevo Servicio Actuarial',
      tag: 'IAS 19 / NIIF',
      description: 'Descripción detallada de la consultoría o estudio técnico brindado.',
      buttonText: 'Consultar',
      buttonUrl: '#presupuesto',
      icon: 'layers'
    };
    setFormData(prev => ({
      ...prev,
      servicesSection: {
        ...prev.servicesSection,
        services: [...prev.servicesSection.services, newService]
      }
    }));
  };

  const handleRemoveService = (id: string) => {
    setFormData(prev => ({
      ...prev,
      servicesSection: {
        ...prev.servicesSection,
        services: prev.servicesSection.services.filter(s => s.id !== id)
      }
    }));
  };

  const handleUpdateService = (id: string, field: keyof ServiceItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      servicesSection: {
        ...prev.servicesSection,
        services: prev.servicesSection.services.map(s => s.id === id ? { ...s, [field]: value } : s)
      }
    }));
  };

  // Advantage helpers
  const handleAddAdvantage = () => {
    const newAdv: AdvantageItem = {
      id: `adv-${Date.now()}`,
      title: 'Nueva Garantía o Acreditación',
      description: 'Explicación del beneficio y valor agregado para sus clientes.',
      icon: 'award'
    };
    setFormData(prev => ({
      ...prev,
      ventajasSection: {
        ...prev.ventajasSection,
        advantages: [...prev.ventajasSection.advantages, newAdv]
      }
    }));
  };

  const handleRemoveAdvantage = (id: string) => {
    setFormData(prev => ({
      ...prev,
      ventajasSection: {
        ...prev.ventajasSection,
        advantages: prev.ventajasSection.advantages.filter(a => a.id !== id)
      }
    }));
  };

  const handleUpdateAdvantage = (id: string, field: keyof AdvantageItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      ventajasSection: {
        ...prev.ventajasSection,
        advantages: prev.ventajasSection.advantages.map(a => a.id === id ? { ...a, [field]: value } : a)
      }
    }));
  };

  // Additional Button helpers
  const handleAddCustomButton = () => {
    const newBtn: CustomButton = {
      id: `btn-${Date.now()}`,
      label: 'Acceso a Portal',
      url: 'https://',
      openInNewTab: true,
      styleVariant: 'primary'
    };
    setFormData(prev => ({
      ...prev,
      header: {
        ...prev.header,
        additionalButtons: [...(prev.header.additionalButtons || []), newBtn]
      }
    }));
  };

  const handleRemoveCustomButton = (id: string) => {
    setFormData(prev => ({
      ...prev,
      header: {
        ...prev.header,
        additionalButtons: (prev.header.additionalButtons || []).filter(b => b.id !== id)
      }
    }));
  };

  const handleUpdateCustomButton = (id: string, field: keyof CustomButton, value: any) => {
    setFormData(prev => ({
      ...prev,
      header: {
        ...prev.header,
        additionalButtons: (prev.header.additionalButtons || []).map(b => b.id === id ? { ...b, [field]: value } : b)
      }
    }));
  };

  // High contrast solid input styles (Zero glass, 100% opaque, sharp contrast)
  const inputClass = isDark
    ? 'w-full px-3.5 py-2.5 bg-[#1e293b] border-2 border-[#334155] focus:border-indigo-400 focus:bg-[#0f172a] rounded-lg text-white font-semibold text-sm outline-none transition-colors'
    : 'w-full px-3.5 py-2.5 bg-white border-2 border-slate-300 focus:border-indigo-600 focus:bg-indigo-50/30 rounded-lg text-slate-900 font-semibold text-sm outline-none transition-colors shadow-xs';

  const labelClass = isDark
    ? 'block text-slate-200 uppercase font-black text-[11px] mb-1.5 tracking-wider'
    : 'block text-slate-800 uppercase font-black text-[11px] mb-1.5 tracking-wider';

  const subCardClass = isDark
    ? 'p-5 bg-[#0f172a] border-2 border-[#334155] rounded-xl space-y-4'
    : 'p-5 bg-slate-50 border-2 border-slate-200 rounded-xl space-y-4';

  const helperTextClass = isDark ? 'text-xs text-slate-400' : 'text-xs text-slate-600 font-medium';

  return (
    <div 
      id="dashboard-root" 
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Top Header for Dashboard - 100% Solid & High Contrast */}
      <header className={`sticky top-0 z-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b-2 shadow-sm ${
        isDark ? 'bg-[#111827] border-[#1f2937]' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-base font-black font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Panel Dashboard — CMS Editor
              </h1>
              <span className="text-[10px] uppercase font-black text-indigo-700 bg-indigo-100 border border-indigo-300 px-2 py-0.5 rounded-md">
                100% Editable
              </span>
            </div>
            <p className={helperTextClass}>
              Edite todos los textos, enlaces a su sistema y servicios del sitio web público
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          {/* Theme Mode Toggle (Light / Dark) */}
          <button
            type="button"
            onClick={() => setThemeMode(prev => prev === 'light' ? 'dark' : 'light')}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 border-2 transition-colors cursor-pointer ${
              isDark 
                ? 'bg-[#1e293b] border-[#334155] text-amber-300 hover:bg-[#334155]' 
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}
            title="Alternar entre modo claro de alta visibilidad y modo oscuro sólido"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            <span>{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>
          </button>

          {saveSuccessMessage && (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-black bg-emerald-100 px-3 py-2 rounded-lg border-2 border-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>¡Cambios Guardados con Éxito!</span>
            </span>
          )}

          <button
            type="button"
            onClick={onReset}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold border-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDark 
                ? 'bg-[#1e293b] hover:bg-[#334155] text-slate-200 border-[#334155]' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
            }`}
            title="Restablecer contenido a valores iniciales"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Restablecer</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-slate-300" />
            <span>Ver Sitio Público</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            title="Cerrar sesión de administrador"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Guardando...' : 'Guardar y Publicar'}</span>
          </button>
        </div>
      </header>

      {/* Main Body Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Tabs on Left (3 cols) */}
        <aside className="lg:col-span-3 space-y-2">
          <div className={`p-3 rounded-xl border-2 mb-3 text-xs flex items-start gap-2 ${
            isDark ? 'bg-[#111827] border-[#1f2937] text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-xs'
          }`}>
            <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>Seleccione una sección para editar su contenido directamente:</span>
          </div>

          <button
            onClick={() => setActiveTab('branding')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer border-2 ${
              activeTab === 'branding'
                ? 'bg-indigo-600 text-white shadow-md border-indigo-700'
                : isDark
                  ? 'bg-[#111827] text-slate-300 hover:text-white hover:bg-[#1f2937] border-[#1f2937]'
                  : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-300 shadow-xs'
            }`}
          >
            <ImageIcon className={`w-4 h-4 shrink-0 ${activeTab === 'branding' ? 'text-white' : 'text-indigo-600'}`} />
            <span>Logo, Tipografía & Marca</span>
          </button>

          <button
            onClick={() => setActiveTab('system-button')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer border-2 ${
              activeTab === 'system-button'
                ? 'bg-indigo-600 text-white shadow-md border-indigo-700'
                : isDark
                  ? 'bg-[#111827] text-slate-300 hover:text-white hover:bg-[#1f2937] border-[#1f2937]'
                  : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-300 shadow-xs'
            }`}
          >
            <ExternalLink className={`w-4 h-4 shrink-0 ${activeTab === 'system-button' ? 'text-white' : 'text-indigo-600'}`} />
            <span>Botón a mi Sistema & Header</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer border-2 ${
              activeTab === 'hero'
                ? 'bg-indigo-600 text-white shadow-md border-indigo-700'
                : isDark
                  ? 'bg-[#111827] text-slate-300 hover:text-white hover:bg-[#1f2937] border-[#1f2937]'
                  : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-300 shadow-xs'
            }`}
          >
            <Sparkles className={`w-4 h-4 shrink-0 ${activeTab === 'hero' ? 'text-white' : 'text-amber-500'}`} />
            <span>Hero & Portada</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer border-2 ${
              activeTab === 'services'
                ? 'bg-indigo-600 text-white shadow-md border-indigo-700'
                : isDark
                  ? 'bg-[#111827] text-slate-300 hover:text-white hover:bg-[#1f2937] border-[#1f2937]'
                  : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-300 shadow-xs'
            }`}
          >
            <Layers className={`w-4 h-4 shrink-0 ${activeTab === 'services' ? 'text-white' : 'text-blue-600'}`} />
            <span>Servicios ({formData.servicesSection.services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('presupuesto')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer border-2 ${
              activeTab === 'presupuesto'
                ? 'bg-indigo-600 text-white shadow-md border-indigo-700'
                : isDark
                  ? 'bg-[#111827] text-slate-300 hover:text-white hover:bg-[#1f2937] border-[#1f2937]'
                  : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-300 shadow-xs'
            }`}
          >
            <MessageSquare className={`w-4 h-4 shrink-0 ${activeTab === 'presupuesto' ? 'text-white' : 'text-emerald-600'}`} />
            <span>Presupuesto & WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('ventajas')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer border-2 ${
              activeTab === 'ventajas'
                ? 'bg-indigo-600 text-white shadow-md border-indigo-700'
                : isDark
                  ? 'bg-[#111827] text-slate-300 hover:text-white hover:bg-[#1f2937] border-[#1f2937]'
                  : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-300 shadow-xs'
            }`}
          >
            <Shield className={`w-4 h-4 shrink-0 ${activeTab === 'ventajas' ? 'text-white' : 'text-rose-600'}`} />
            <span>Ventajas ({formData.ventajasSection.advantages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('footer')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer border-2 ${
              activeTab === 'footer'
                ? 'bg-indigo-600 text-white shadow-md border-indigo-700'
                : isDark
                  ? 'bg-[#111827] text-slate-300 hover:text-white hover:bg-[#1f2937] border-[#1f2937]'
                  : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-300 shadow-xs'
            }`}
          >
            <Palette className={`w-4 h-4 shrink-0 ${activeTab === 'footer' ? 'text-white' : 'text-purple-600'}`} />
            <span>Identidad, Colores & Footer</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer border-2 ${
              activeTab === 'security'
                ? 'bg-indigo-600 text-white shadow-md border-indigo-700'
                : isDark
                  ? 'bg-[#111827] text-slate-300 hover:text-white hover:bg-[#1f2937] border-[#1f2937]'
                  : 'bg-white text-slate-800 hover:bg-slate-50 border-slate-300 shadow-xs'
            }`}
          >
            <KeyRound className={`w-4 h-4 shrink-0 ${activeTab === 'security' ? 'text-white' : 'text-amber-500'}`} />
            <span>Clave & Seguridad</span>
          </button>

          <div className="pt-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer border-2 ${
                activeTab === 'preview'
                  ? 'bg-indigo-600 text-white shadow-md border-indigo-700'
                  : isDark
                    ? 'bg-[#111827] text-indigo-400 hover:text-white hover:bg-[#1f2937] border-indigo-900'
                    : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border-indigo-300 shadow-xs'
              }`}
            >
              <Eye className="w-4 h-4 shrink-0 text-indigo-600" />
              <span>Vista Previa en Vivo</span>
            </button>
          </div>
        </aside>

        {/* Tab Content Form (9 cols) - Solid Card */}
        <main className={`lg:col-span-9 border-2 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm ${
          isDark ? 'bg-[#111827] border-[#1f2937]' : 'bg-white border-slate-200'
        }`}>
          {/* TAB 0: LOGO, BRANDING & TYPOGRAPHY */}
          {activeTab === 'branding' && (
            <BrandingStudioTab
              formData={formData}
              setFormData={setFormData}
              isDark={isDark}
              inputClass={inputClass}
              labelClass={labelClass}
              subCardClass={subCardClass}
              helperTextClass={helperTextClass}
            />
          )}

          {/* TAB 1: SYSTEM BUTTON & HEADER */}
          {activeTab === 'system-button' && (
            <div className="space-y-6">
              <div className={`pb-4 border-b-2 ${isDark ? 'border-[#1f2937]' : 'border-slate-200'}`}>
                <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Enlace a su Sistema Externo y Cabecera
                </h2>
                <p className={helperTextClass}>
                  Configure el botón principal que dirigirá a sus usuarios hacia su propio software o sistema actuarial.
                </p>
              </div>

              {/* External System Button Configuration Card */}
              <div className={subCardClass}>
                <div className={`flex items-center justify-between pb-3 border-b-2 ${isDark ? 'border-[#1f2937]' : 'border-slate-200'}`}>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-indigo-600" />
                    <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>
                      Botón de Enlace a su Sistema Externo
                    </h3>
                  </div>
                  <label className={`flex items-center gap-2 text-xs font-bold cursor-pointer ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    <input 
                      type="checkbox"
                      checked={formData.header.externalSystemButton.enabled}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        header: {
                          ...prev,
                          externalSystemButton: {
                            ...prev.header.externalSystemButton,
                            enabled: e.target.checked
                          }
                        }
                      }))}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-0"
                    />
                    <span>Habilitado y visible en el Landing</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className={labelClass}>Texto / Etiqueta del Botón</label>
                    <input 
                      type="text"
                      value={formData.header.externalSystemButton.label}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        header: {
                          ...prev.header,
                          externalSystemButton: {
                            ...prev.header.externalSystemButton,
                            label: e.target.value
                          }
                        }
                      }))}
                      placeholder="Ej: Ingresar a mi Sistema Actuarial"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Enlace / URL de Destino a su Sistema</label>
                    <input 
                      type="text"
                      value={formData.header.externalSystemButton.url}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        header: {
                          ...prev.header,
                          externalSystemButton: {
                            ...prev.header.externalSystemButton,
                            url: e.target.value
                          }
                        }
                      }))}
                      placeholder="https://mi-sistema-actuarial.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Color / Variante de Estilo</label>
                    <select
                      value={formData.header.externalSystemButton.styleVariant}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        header: {
                          ...prev.header,
                          externalSystemButton: {
                            ...prev.header.externalSystemButton,
                            styleVariant: e.target.value as any
                          }
                        }
                      }))}
                      className={inputClass}
                    >
                      <option value="primary">Azul Corporativo Profundo (#002855)</option>
                      <option value="accent">Rojo Carmesí (#A11E22)</option>
                      <option value="emerald">Verde Esmeralda</option>
                      <option value="outline">Borde Delicado</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Ícono del Botón</label>
                    <select
                      value={formData.header.externalSystemButton.icon}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        header: {
                          ...prev.header,
                          externalSystemButton: {
                            ...prev.header.externalSystemButton,
                            icon: e.target.value as any
                          }
                        }
                      }))}
                      className={inputClass}
                    >
                      <option value="shield">Escudo (Shield)</option>
                      <option value="external-link">Flecha Externa (External Link)</option>
                      <option value="lock">Candado (Lock)</option>
                      <option value="key">Llave (Key)</option>
                      <option value="database">Base de Datos (Database)</option>
                      <option value="arrow-right">Flecha Derecha</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <label className={`flex items-center gap-2 text-xs font-bold cursor-pointer ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    <input 
                      type="checkbox"
                      checked={formData.header.externalSystemButton.openInNewTab}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        header: {
                          ...prev.header,
                          externalSystemButton: {
                            ...prev.header.externalSystemButton,
                            openInNewTab: e.target.checked
                          }
                        }
                      }))}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-0"
                    />
                    <span>Abrir en una nueva pestaña (target="_blank")</span>
                  </label>
                </div>
              </div>

              {/* Additional Custom Buttons */}
              <div className={subCardClass}>
                <div className={`flex items-center justify-between pb-3 border-b-2 ${isDark ? 'border-[#1f2937]' : 'border-slate-200'}`}>
                  <div>
                    <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Botones Adicionales en Cabecera
                    </h3>
                    <p className={helperTextClass}>
                      Agregue otros enlaces a cotizadores, portales o sistemas complementarios
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCustomButton}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Botón</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(!formData.header.additionalButtons || formData.header.additionalButtons.length === 0) ? (
                    <p className={`text-xs italic py-2 text-center ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                      No hay botones adicionales en la cabecera. Pulse "+ Agregar Botón" para crear uno.
                    </p>
                  ) : (
                    formData.header.additionalButtons.map((btn) => (
                      <div key={btn.id} className={`p-4 rounded-lg border-2 flex flex-col md:flex-row items-start md:items-center gap-3 ${
                        isDark ? 'bg-[#111827] border-[#334155]' : 'bg-white border-slate-300'
                      }`}>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                          <div>
                            <label className={labelClass}>Etiqueta</label>
                            <input
                              type="text"
                              value={btn.label}
                              onChange={(e) => handleUpdateCustomButton(btn.id, 'label', e.target.value)}
                              placeholder="Texto del botón"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>URL de destino</label>
                            <input
                              type="text"
                              value={btn.url}
                              onChange={(e) => handleUpdateCustomButton(btn.id, 'url', e.target.value)}
                              placeholder="https://..."
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Estilo</label>
                            <select
                              value={btn.styleVariant}
                              onChange={(e) => handleUpdateCustomButton(btn.id, 'styleVariant', e.target.value)}
                              className={inputClass}
                            >
                              <option value="primary">Azul Corporativo</option>
                              <option value="accent">Rojo Carmesí</option>
                              <option value="emerald">Verde Esmeralda</option>
                              <option value="outline">Borde Delicado</option>
                            </select>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomButton(btn.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer self-end md:self-center"
                          title="Eliminar botón"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Branding and Logo */}
              <div className={subCardClass}>
                <h3 className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 ${
                  isDark ? 'text-white border-[#1f2937]' : 'text-slate-900 border-slate-200'
                }`}>
                  Nombre de la Marca y Logotipo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className={labelClass}>Nombre Comercial</label>
                    <input 
                      type="text"
                      value={formData.branding.name}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        branding: { ...prev.branding, name: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Lema / Eslogan</label>
                    <input 
                      type="text"
                      value={formData.branding.tagline}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        branding: { ...prev.branding, tagline: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>URL de Logotipo Imagen (Opcional, vacío usa isotipo vectorial ActuaSeg)</label>
                    <input 
                      type="text"
                      value={formData.branding.logoUrl || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        branding: { ...prev.branding, logoUrl: e.target.value }
                      }))}
                      placeholder="https://ejemplo.com/logo.png"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Menu Links */}
              <div className={subCardClass}>
                <div className={`flex items-center justify-between pb-3 border-b-2 ${isDark ? 'border-[#1f2937]' : 'border-slate-200'}`}>
                  <div>
                    <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Enlaces del Menú de Navegación
                    </h3>
                    <p className={helperTextClass}>
                      Ítems que aparecen en la barra superior (ej: #servicios, #presupuesto, #contacto)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newLink = { id: `nav-${Date.now()}`, label: 'Nuevo Enlace', url: '#seccion' };
                      setFormData(prev => ({
                        ...prev,
                        header: {
                          ...prev.header,
                          navLinks: [...prev.header.navLinks, newLink]
                        }
                      }));
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Enlace</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.header.navLinks.map((link, idx) => (
                    <div key={link.id || idx} className={`p-3 rounded-lg border-2 flex items-center gap-3 ${
                      isDark ? 'bg-[#111827] border-[#334155]' : 'bg-white border-slate-300'
                    }`}>
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelClass}>Etiqueta</label>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const updated = [...formData.header.navLinks];
                              updated[idx].label = e.target.value;
                              setFormData(prev => ({ ...prev, header: { ...prev.header, navLinks: updated } }));
                            }}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Destino (URL o #ancla)</label>
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) => {
                              const updated = [...formData.header.navLinks];
                              updated[idx].url = e.target.value;
                              setFormData(prev => ({ ...prev, header: { ...prev.header, navLinks: updated } }));
                            }}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            header: {
                              ...prev.header,
                              navLinks: prev.header.navLinks.filter((_, i) => i !== idx)
                            }
                          }));
                        }}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer self-end mb-1"
                        title="Eliminar enlace"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO & PORTADA */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className={`pb-4 border-b-2 ${isDark ? 'border-[#1f2937]' : 'border-slate-200'}`}>
                <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Sección Hero & Portada Principal
                </h2>
                <p className={helperTextClass}>
                  El mensaje de bienvenida y los llamados a la acción iniciales del sitio.
                </p>
              </div>

              <div className={subCardClass}>
                <h3 className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 ${
                  isDark ? 'text-white border-[#1f2937]' : 'text-slate-900 border-slate-200'
                }`}>
                  Textos Principales del Hero
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Distintivo Superior (Badge / Tag)</label>
                    <input 
                      type="text"
                      value={formData.hero.badgeText}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        hero: { ...prev.hero, badgeText: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Título Principal - Primera Línea</label>
                    <input 
                      type="text"
                      value={formData.hero.headlineMain}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        hero: { ...prev.hero, headlineMain: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Título Principal - Texto Destacado con Gradiente</label>
                    <input 
                      type="text"
                      value={formData.hero.headlineHighlight}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        hero: { ...prev.hero, headlineHighlight: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Descripción / Párrafo Explicativo</label>
                    <textarea 
                      rows={3}
                      value={formData.hero.description}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        hero: { ...prev.hero, description: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className={subCardClass}>
                <h3 className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 ${
                  isDark ? 'text-white border-[#1f2937]' : 'text-slate-900 border-slate-200'
                }`}>
                  Botones de Llamado a la Acción del Hero
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Texto Botón Primario</label>
                    <input 
                      type="text"
                      value={formData.hero.ctaPrimary.label}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          ctaPrimary: { ...prev.hero.ctaPrimary, label: e.target.value }
                        }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Enlace Botón Primario</label>
                    <input 
                      type="text"
                      value={formData.hero.ctaPrimary.url}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          ctaPrimary: { ...prev.hero.ctaPrimary, url: e.target.value }
                        }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Texto Botón Secundario</label>
                    <input 
                      type="text"
                      value={formData.hero.ctaSecondary.label}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          ctaSecondary: { ...prev.hero.ctaSecondary, label: e.target.value }
                        }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Enlace Botón Secundario</label>
                    <input 
                      type="text"
                      value={formData.hero.ctaSecondary.url}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          ctaSecondary: { ...prev.hero.ctaSecondary, url: e.target.value }
                        }
                      }))}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className={subCardClass}>
                <h3 className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 ${
                  isDark ? 'text-white border-[#1f2937]' : 'text-slate-900 border-slate-200'
                }`}>
                  Tarjeta Lateral con Métricas Clave
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className={labelClass}>Título Tarjeta</label>
                      <input 
                        type="text"
                        value={formData.hero.sideCard.title}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            sideCard: { ...prev.hero.sideCard, title: e.target.value }
                          }
                        }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Subtítulo</label>
                      <input 
                        type="text"
                        value={formData.hero.sideCard.subtitle}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            sideCard: { ...prev.hero.sideCard, subtitle: e.target.value }
                          }
                        }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Badge / Etiqueta</label>
                      <input 
                        type="text"
                        value={formData.hero.sideCard.badge}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            sideCard: { ...prev.hero.sideCard, badge: e.target.value }
                          }
                        }))}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className={`p-3 rounded-lg border-2 ${isDark ? 'bg-[#111827] border-[#334155]' : 'bg-white border-slate-300'}`}>
                      <label className={labelClass}>Métrica 1 (Valor)</label>
                      <input 
                        type="text"
                        value={formData.hero.sideCard.metric1Value}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            sideCard: { ...prev.hero.sideCard, metric1Value: e.target.value }
                          }
                        }))}
                        className={inputClass}
                      />
                      <label className={`${labelClass} mt-2`}>Métrica 1 (Leyenda)</label>
                      <input 
                        type="text"
                        value={formData.hero.sideCard.metric1Label}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            sideCard: { ...prev.hero.sideCard, metric1Label: e.target.value }
                          }
                        }))}
                        className={inputClass}
                      />
                    </div>

                    <div className={`p-3 rounded-lg border-2 ${isDark ? 'bg-[#111827] border-[#334155]' : 'bg-white border-slate-300'}`}>
                      <label className={labelClass}>Métrica 2 (Valor)</label>
                      <input 
                        type="text"
                        value={formData.hero.sideCard.metric2Value}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            sideCard: { ...prev.hero.sideCard, metric2Value: e.target.value }
                          }
                        }))}
                        className={inputClass}
                      />
                      <label className={`${labelClass} mt-2`}>Métrica 2 (Leyenda)</label>
                      <input 
                        type="text"
                        value={formData.hero.sideCard.metric2Label}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            sideCard: { ...prev.hero.sideCard, metric2Label: e.target.value }
                          }
                        }))}
                        className={inputClass}
                      />
                    </div>

                    <div className={`p-3 rounded-lg border-2 ${isDark ? 'bg-[#111827] border-[#334155]' : 'bg-white border-slate-300'}`}>
                      <label className={labelClass}>Métrica 3 (Valor)</label>
                      <input 
                        type="text"
                        value={formData.hero.sideCard.metric3Value}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            sideCard: { ...prev.hero.sideCard, metric3Value: e.target.value }
                          }
                        }))}
                        className={inputClass}
                      />
                      <label className={`${labelClass} mt-2`}>Métrica 3 (Leyenda)</label>
                      <input 
                        type="text"
                        value={formData.hero.sideCard.metric3Label}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            sideCard: { ...prev.hero.sideCard, metric3Label: e.target.value }
                          }
                        }))}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SERVICIOS */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className={`flex items-center justify-between pb-4 border-b-2 ${isDark ? 'border-[#1f2937]' : 'border-slate-200'}`}>
                <div>
                  <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Gestión de Servicios Actuariales
                  </h2>
                  <p className={helperTextClass}>
                    Agregue, edite o elimine las tarjetas de servicios presentadas en el sitio web.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddService}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Servicio</span>
                </button>
              </div>

              {/* General section texts */}
              <div className={subCardClass}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Título de la Sección</label>
                    <input 
                      type="text"
                      value={formData.servicesSection.title}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        servicesSection: { ...prev.servicesSection, title: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Subtítulo / Etiqueta</label>
                    <input 
                      type="text"
                      value={formData.servicesSection.badge}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        servicesSection: { ...prev.servicesSection, badge: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Descripción General</label>
                    <textarea 
                      rows={2}
                      value={formData.servicesSection.description}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        servicesSection: { ...prev.servicesSection, description: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Service Cards List */}
              <div className="space-y-4">
                {formData.servicesSection.services.map((srv, idx) => (
                  <div key={srv.id} className={`p-5 rounded-xl border-2 space-y-4 ${
                    isDark ? 'bg-[#0f172a] border-[#334155]' : 'bg-slate-50 border-slate-300'
                  }`}>
                    <div className={`flex items-center justify-between pb-3 border-b-2 ${isDark ? 'border-[#1f2937]' : 'border-slate-200'}`}>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className={`font-black text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{srv.title || 'Servicio sin título'}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-300">
                          {srv.tag}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(srv.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar servicio"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className={labelClass}>Título del Servicio</label>
                        <input 
                          type="text"
                          value={srv.title}
                          onChange={(e) => handleUpdateService(srv.id, 'title', e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Etiqueta / Tag Normativo</label>
                        <input 
                          type="text"
                          value={srv.tag}
                          onChange={(e) => handleUpdateService(srv.id, 'tag', e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Ícono</label>
                        <select
                          value={srv.icon}
                          onChange={(e) => handleUpdateService(srv.id, 'icon', e.target.value)}
                          className={inputClass}
                        >
                          <option value="briefcase">Maletín (Briefcase)</option>
                          <option value="shield">Escudo (Shield)</option>
                          <option value="activity">Actividad / Pulso (Activity)</option>
                          <option value="users">Usuarios / Personas (Users)</option>
                          <option value="layers">Capas (Layers)</option>
                        </select>
                      </div>
                      <div className="md:col-span-3">
                        <label className={labelClass}>Descripción Detallada</label>
                        <textarea 
                          rows={2}
                          value={srv.description}
                          onChange={(e) => handleUpdateService(srv.id, 'description', e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Texto del Botón</label>
                        <input 
                          type="text"
                          value={srv.buttonText}
                          onChange={(e) => handleUpdateService(srv.id, 'buttonText', e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClass}>URL de Enlace del Botón</label>
                        <input 
                          type="text"
                          value={srv.buttonUrl}
                          onChange={(e) => handleUpdateService(srv.id, 'buttonUrl', e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PRESUPUESTO & WHATSAPP */}
          {activeTab === 'presupuesto' && (
            <div className="space-y-6">
              <div className={`pb-4 border-b-2 ${isDark ? 'border-[#1f2937]' : 'border-slate-200'}`}>
                <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Sección Presupuesto & Contacto Directo por WhatsApp
                </h2>
                <p className={helperTextClass}>
                  Configure la sección de cotización donde el cliente solicita presupuesto indicando el número de personas.
                </p>
              </div>

              <div className={subCardClass}>
                <h3 className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 ${
                  isDark ? 'text-white border-[#1f2937]' : 'text-slate-900 border-slate-200'
                }`}>
                  Textos y Requisitos de Cotización
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Título Principal</label>
                      <input 
                        type="text"
                        value={formData.presupuestoSection.title}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          presupuestoSection: { ...prev.presupuestoSection, title: e.target.value }
                        }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Distintivo de Requisitos (ej: Indicar número de personas)</label>
                      <input 
                        type="text"
                        value={formData.presupuestoSection.requirementBadge}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          presupuestoSection: { ...prev.presupuestoSection, requirementBadge: e.target.value }
                        }))}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Descripción Explicativa</label>
                    <textarea 
                      rows={2}
                      value={formData.presupuestoSection.description}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        presupuestoSection: { ...prev.presupuestoSection, description: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Nota Destacada / Horarios de Atención</label>
                    <input 
                      type="text"
                      value={formData.presupuestoSection.customCtaNote || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        presupuestoSection: { ...prev.presupuestoSection, customCtaNote: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className={subCardClass}>
                <h3 className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 ${
                  isDark ? 'text-white border-[#1f2937]' : 'text-slate-900 border-slate-200'
                }`}>
                  Configuración del Enlace a WhatsApp y Llamadas
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Número WhatsApp (Formato Internacional sin +)</label>
                      <input 
                        type="text"
                        value={formData.presupuestoSection.whatsappRawNumber}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          presupuestoSection: { ...prev.presupuestoSection, whatsappRawNumber: e.target.value }
                        }))}
                        placeholder="593999999999"
                        className={inputClass}
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">Ejemplo para Ecuador: 593988204349</span>
                    </div>

                    <div>
                      <label className={labelClass}>Número Visible para Contacto WhatsApp</label>
                      <input 
                        type="text"
                        value={formData.presupuestoSection.whatsappNumber}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          presupuestoSection: { ...prev.presupuestoSection, whatsappNumber: e.target.value }
                        }))}
                        placeholder="+593 98 820 4349"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Mensaje Predeterminado de WhatsApp al Abrir el Chat</label>
                    <textarea 
                      rows={3}
                      value={formData.presupuestoSection.whatsappDefaultMessage}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        presupuestoSection: { ...prev.presupuestoSection, whatsappDefaultMessage: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Número Telefónico para Llamada Directa</label>
                    <input 
                      type="text"
                      value={formData.presupuestoSection.callDisplayNumber}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        presupuestoSection: { ...prev.presupuestoSection, callDisplayNumber: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VENTAJAS & GARANTÍAS */}
          {activeTab === 'ventajas' && (
            <div className="space-y-6">
              <div className={`flex items-center justify-between pb-4 border-b-2 ${isDark ? 'border-[#1f2937]' : 'border-slate-200'}`}>
                <div>
                  <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Ventajas Competitivas y Garantías
                  </h2>
                  <p className={helperTextClass}>
                    Pilares de rigor técnico, certificaciones y experiencia que generan confianza en sus clientes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddAdvantage}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva Ventaja</span>
                </button>
              </div>

              <div className={subCardClass}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Título de la Sección</label>
                    <input 
                      type="text"
                      value={formData.ventajasSection.title}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        ventajasSection: { ...prev.ventajasSection, title: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Subtítulo / Distintivo</label>
                    <input 
                      type="text"
                      value={formData.ventajasSection.badge}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        ventajasSection: { ...prev.ventajasSection, badge: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Descripción General</label>
                    <textarea 
                      rows={2}
                      value={formData.ventajasSection.description || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        ventajasSection: { ...prev.ventajasSection, description: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {formData.ventajasSection.advantages.map((adv, idx) => (
                  <div key={adv.id} className={`p-4 rounded-xl border-2 space-y-3 ${
                    isDark ? 'bg-[#0f172a] border-[#334155]' : 'bg-slate-50 border-slate-300'
                  }`}>
                    <div className={`flex items-center justify-between pb-2 border-b-2 ${isDark ? 'border-[#1f2937]' : 'border-slate-200'}`}>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className={`font-black text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{adv.title || 'Ventaja sin título'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAdvantage(adv.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar ventaja"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className={labelClass}>Título</label>
                        <input 
                          type="text"
                          value={adv.title}
                          onChange={(e) => handleUpdateAdvantage(adv.id, 'title', e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Ícono</label>
                        <select
                          value={adv.icon}
                          onChange={(e) => handleUpdateAdvantage(adv.id, 'icon', e.target.value)}
                          className={inputClass}
                        >
                          <option value="award">Insignia / Premio (Award)</option>
                          <option value="shield">Escudo / Seguridad (Shield)</option>
                          <option value="refresh">Actualización / Ciclo (Refresh)</option>
                          <option value="users">Equipo Humano (Users)</option>
                        </select>
                      </div>
                      <div className="md:col-span-3">
                        <label className={labelClass}>Descripción del Beneficio</label>
                        <textarea 
                          rows={2}
                          value={adv.description}
                          onChange={(e) => handleUpdateAdvantage(adv.id, 'description', e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FOOTER & IDENTIDAD */}
          {activeTab === 'footer' && (
            <div className="space-y-6">
              <div className={`pb-4 border-b-2 ${isDark ? 'border-[#1f2937]' : 'border-slate-200'}`}>
                <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Pie de Página, Datos de Contacto y Colores
                </h2>
                <p className={helperTextClass}>
                  Configure la información legal, dirección, datos de contacto y colores del pie de página.
                </p>
              </div>

              <div className={subCardClass}>
                <h3 className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 ${
                  isDark ? 'text-white border-[#1f2937]' : 'text-slate-900 border-slate-200'
                }`}>
                  Datos de Contacto Corporativo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Razón Social o Nombre en Footer</label>
                    <input 
                      type="text"
                      value={formData.footer.companyName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        footer: { ...prev.footer, companyName: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Ubicación y Ciudad</label>
                    <input 
                      type="text"
                      value={formData.footer.location}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        footer: { ...prev.footer, location: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Teléfono de Contacto</label>
                    <input 
                      type="text"
                      value={formData.footer.contactPhone}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        footer: { ...prev.footer, contactPhone: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Correo Electrónico de Contacto</label>
                    <input 
                      type="text"
                      value={formData.footer.contactEmail}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        footer: { ...prev.footer, contactEmail: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Resumen Corporativo del Footer</label>
                    <textarea 
                      rows={2}
                      value={formData.footer.description}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        footer: { ...prev.footer, description: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Etiqueta de Sistema 1</label>
                    <input 
                      type="text"
                      value={formData.footer.systemTag1}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        footer: { ...prev.footer, systemTag1: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Etiqueta de Sistema 2</label>
                    <input 
                      type="text"
                      value={formData.footer.systemTag2}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        footer: { ...prev.footer, systemTag2: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Texto de Derechos Reservados (Copyright)</label>
                    <input 
                      type="text"
                      value={formData.footer.copyrightText}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        footer: { ...prev.footer, copyrightText: e.target.value }
                      }))}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Jump to Logo & Branding Studio */}
              <div className={`p-4 rounded-xl border-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                isDark ? 'bg-[#0f172a] border-indigo-900/60' : 'bg-indigo-50/60 border-indigo-200'
              }`}>
                <div>
                  <h4 className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-400">
                    ¿Desea cambiar el Logotipo, Imagen o Tipografía de la marca?
                  </h4>
                  <p className={helperTextClass}>
                    La subida de su archivo de imagen, tipografía de "ACTUASEG", fuentes, tamaños y posiciones se configuran en el Estudio de Logo.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('branding')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shrink-0 cursor-pointer shadow-xs self-start sm:self-auto"
                >
                  Abrir Estudio de Logo
                </button>
              </div>

              {/* Corporate Colors */}
              <div className={subCardClass}>
                <h3 className={`text-xs font-black uppercase tracking-wider pb-2 border-b-2 ${
                  isDark ? 'text-white border-[#1f2937]' : 'text-slate-900 border-slate-200'
                }`}>
                  Colores de Identidad Visual
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Color Primario (Hex)</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color"
                        value={formData.branding.primaryColor || '#002855'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          branding: { ...prev.branding, primaryColor: e.target.value }
                        }))}
                        className="w-10 h-10 rounded border-2 border-slate-300 cursor-pointer"
                      />
                      <input 
                        type="text"
                        value={formData.branding.primaryColor || '#002855'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          branding: { ...prev.branding, primaryColor: e.target.value }
                        }))}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Color de Acento (Hex)</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color"
                        value={formData.branding.accentColor || '#A11E22'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          branding: { ...prev.branding, accentColor: e.target.value }
                        }))}
                        className="w-10 h-10 rounded border-2 border-slate-300 cursor-pointer"
                      />
                      <input 
                        type="text"
                        value={formData.branding.accentColor || '#A11E22'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          branding: { ...prev.branding, accentColor: e.target.value }
                        }))}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SEGURIDAD Y CLAVE DE ACCESO */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className={`pb-4 border-b-2 ${isDark ? 'border-[#1f2937]' : 'border-slate-200'}`}>
                <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Seguridad y Contraseña de Administrador
                </h2>
                <p className={helperTextClass}>
                  Cambie la clave de acceso a este panel para proteger la edición del landing y evitar accesos no autorizados.
                </p>
              </div>

              <div className={subCardClass}>
                <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                  <KeyRound className="w-4 h-4 text-amber-500" />
                  <h3 className={`text-xs font-black uppercase tracking-wider ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Actualizar Contraseña Maestra
                  </h3>
                </div>

                {passwordChangeStatus.message && (
                  <div className={`p-3 rounded-xl border-2 text-xs font-bold flex items-center gap-2 ${
                    passwordChangeStatus.type === 'success'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-red-50 border-red-300 text-red-800'
                  }`}>
                    {passwordChangeStatus.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Shield className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span>{passwordChangeStatus.message}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md pt-2">
                  <div>
                    <label className={labelClass}>Nueva Contraseña</label>
                    <input
                      type="password"
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      placeholder="Mínimo 4 caracteres"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Confirmar Nueva Contraseña</label>
                    <input
                      type="password"
                      value={confirmAdminPassword}
                      onChange={(e) => setConfirmAdminPassword(e.target.value)}
                      placeholder="Repita la nueva contraseña"
                      className={inputClass}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>{isChangingPassword ? 'Guardando en Servidor...' : 'Actualizar Contraseña'}</span>
                  </button>
                </form>

                <div className={`p-4 rounded-xl border-2 text-xs space-y-1.5 mt-4 ${
                  isDark ? 'bg-[#0f172a] border-[#334155] text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Recomendaciones de Seguridad:</p>
                  <p>• La clave protege tanto el acceso a este panel como las rutas de guardado en el servidor.</p>
                  <p>• Utilice una contraseña segura que combine letras y números.</p>
                  <p>• Al cerrar sesión, nadie podrá ver ni modificar este panel sin ingresar la clave correcta.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: LIVE PREVIEW INSIDE DASHBOARD */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className={`flex items-center justify-between pb-3 border-b-2 ${
                isDark ? 'border-[#1f2937]' : 'border-slate-200'
              }`}>
                <div>
                  <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Vista Previa Interactiva del Landing
                  </h3>
                  <p className={helperTextClass}>
                    Así es exactamente como se ve la página para sus visitantes públicos con los cambios actuales.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSave()}
                  disabled={isSaving}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Publicar Cambios</span>
                </button>
              </div>

              {/* Render LandingView inside preview frame */}
              <div className="rounded-xl border-4 border-slate-300 overflow-hidden shadow-lg max-h-[750px] overflow-y-auto bg-slate-50">
                <LandingView
                  config={formData}
                  onOpenDashboard={() => setActiveTab('system-button')}
                />
              </div>
            </div>
          )}

          {/* Bottom Save Action Bar */}
          {activeTab !== 'preview' && (
            <div className={`pt-6 border-t-2 flex flex-wrap items-center justify-between gap-3 ${
              isDark ? 'border-[#1f2937]' : 'border-slate-200'
            }`}>
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold border-2 transition-colors cursor-pointer ${
                  isDark 
                    ? 'bg-[#1e293b] hover:bg-[#334155] text-slate-200 border-[#334155]' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                }`}
              >
                Volver al Sitio Público
              </button>

              <button
                type="button"
                onClick={() => handleSave()}
                disabled={isSaving}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Guardando en Servidor...' : 'Guardar y Publicar Cambios'}</span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
