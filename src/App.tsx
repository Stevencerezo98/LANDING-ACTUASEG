/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LandingConfig } from './types';
import { DEFAULT_LANDING_CONFIG, normalizeLandingConfig } from './landingDefaults';
import { LandingView } from './components/LandingView';
import { LandingDashboard } from './components/LandingDashboard';
import { AdminLogin } from './components/AdminLogin';

export default function App() {
  const [config, setConfig] = useState<LandingConfig>(() => normalizeLandingConfig(DEFAULT_LANDING_CONFIG));
  const [isDashboardRequested, setIsDashboardRequested] = useState(() => {
    return window.location.hash === '#dashboard' || window.location.hash === '#admin';
  });
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return sessionStorage.getItem('actuaseg_admin_token') || localStorage.getItem('actuaseg_admin_token') || null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch persisted landing configuration from server
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/landing');
        const data = await res.json();
        if (data.success && data.config) {
          setConfig(normalizeLandingConfig(data.config));
        }
      } catch (err) {
        console.error('Error fetching landing config:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // Listen to hash changes (#dashboard or #admin)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#dashboard' || window.location.hash === '#admin') {
        setIsDashboardRequested(true);
      } else {
        setIsDashboardRequested(false);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleLoginSuccess = (token: string) => {
    setAdminToken(token);
    setIsDashboardRequested(true);
    window.location.hash = '#dashboard';
  };

  const handleLogout = () => {
    setAdminToken(null);
    sessionStorage.removeItem('actuaseg_admin_token');
    localStorage.removeItem('actuaseg_admin_token');
    setIsDashboardRequested(false);
    if (window.location.hash === '#dashboard' || window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  // Save updated configuration to server (Protected with admin token)
  const handleSaveConfig = async (newConfig: LandingConfig) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/landing', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': adminToken || ''
        },
        body: JSON.stringify(newConfig)
      });
      const data = await res.json();
      if (data.success && data.config) {
        setConfig(normalizeLandingConfig(data.config));
      } else {
        alert(data.message || 'Error al guardar la configuración.');
        if (res.status === 401) {
          handleLogout();
        }
      }
    } catch (err) {
      console.error('Error saving landing config:', err);
      alert('Error al guardar la configuración en el servidor.');
    } finally {
      setIsSaving(false);
    }
  };

  // Reset configuration to factory defaults (Protected with admin token)
  const handleResetConfig = async () => {
    if (!window.confirm('¿Está seguro de que desea restablecer todo el contenido del landing a los valores iniciales?')) {
      return;
    }

    try {
      const res = await fetch('/api/landing/reset', { 
        method: 'POST',
        headers: {
          'x-admin-token': adminToken || ''
        }
      });
      const data = await res.json();
      if (data.success && data.config) {
        setConfig(normalizeLandingConfig(data.config));
        alert('Configuración restablecida con éxito a valores originales.');
      } else {
        alert(data.message || 'No se pudo restablecer la configuración.');
      }
    } catch (err) {
      console.error('Error resetting landing config:', err);
    }
  };

  const handleOpenDashboard = () => {
    setIsDashboardRequested(true);
    window.location.hash = '#dashboard';
  };

  const handleCloseDashboard = () => {
    setIsDashboardRequested(false);
    if (window.location.hash === '#dashboard' || window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold">Cargando ActuaSeg...</span>
        </div>
      </div>
    );
  }

  // If user navigated to #dashboard or #admin:
  if (isDashboardRequested) {
    if (!adminToken) {
      // Must authenticate with password first
      return (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onCancel={handleCloseDashboard}
        />
      );
    }

    // Authenticated admin: show the Dashboard
    return (
      <LandingDashboard
        config={config}
        onSave={handleSaveConfig}
        onReset={handleResetConfig}
        onClose={handleCloseDashboard}
        onLogout={handleLogout}
        adminToken={adminToken}
        isSaving={isSaving}
      />
    );
  }

  // Public visitor: show the Landing page
  return (
    <LandingView
      config={config}
      onOpenDashboard={handleOpenDashboard}
    />
  );
}
