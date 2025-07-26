import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f47c2f5c84764828b83a8e7d5cc3fd23',
  appName: 'A Lovable project',
  webDir: 'dist',
  server: {
    url: 'https://f47c2f5c-8476-4828-b83a-8e7d5cc3fd23.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;