import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

// Configuração base do Capacitor
const config: CapacitorConfig = {
  appId: 'com.appmercado.app',
  appName: 'App Mercado',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
    cleartext: true,
    allowNavigation: []
  },
  android: {
    allowMixedContent: true,
    buildOptions: {
      keystorePath: 'release.keystore',
      keystoreAlias: 'app-mercado',
      keystorePassword: 'app-mercado',
      releaseType: 'AAB',
      signingType: 'jarsigner'
    }
  },
  ios: {
    contentInset: 'automatic',
    allowsLinkPreview: false,
    scrollEnabled: true,
    hideLogs: false,
    // Configurações de privacidade para iOS
    privacyManifest: {
      NSPhotoLibraryUsageDescription: 'Permitir acesso à galeria para adicionar imagens aos produtos',
      NSCameraUsageDescription: 'Permitir acesso à câmera para tirar fotos dos produtos',
      NSLocationWhenInUseUsageDescription: 'Permitir acesso à localização para encontrar mercados próximos',
      NSContactsUsageDescription: 'Permitir acesso aos contatos para compartilhar listas',
      NSAppleMusicUsageDescription: 'Permitir acesso à mídia para reproduzir sons do aplicativo',
      NSMicrophoneUsageDescription: 'Permitir acesso ao microfone para gravar lembretes de voz',
      NSMotionUsageDescription: 'Permitir acesso ao sensor de movimento para recursos de acessibilidade'
    }
  }
};,
  plugins: {
    // Configurações do SQLite
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: true,
      iosKeychainPrefix: 'app_mercado',
      iosBiometric: {
        biometricAuth: false,
        biometricTitle: 'Autenticação Biométrica',
        biometricSubTitle: 'Faça login usando biometria'
      },
      androidIsEncryption: true,
      androidBiometric: {
        biometricAuth: false,
        biometricTitle: 'Autenticação Biométrica',
        biometricSubTitle: 'Faça login usando biometria'
      },
      electronWindowsLocation: 'C:\\ProgramData\\CapacitorDatabases',
      electronMacLocation: '/Volumes/Development_Lacie/Development/Databases',
      electronLinuxLocation: 'Databases',
      version: 1
    },
    // Configurações do teclado
    Keyboard: {
      resize: KeyboardResize.Body,
      resizeOnFullScreen: true,
      style: KeyboardStyle.Dark
    },
    // Configurações da barra de status
    StatusBar: {
      backgroundColor: '#000000',
      style: 'DARK'
    },
    // Configurações do SplashScreen
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      iosSpinnerStyle: 'large',
      spinnerColor: '#000000',
      splashFullScreen: true,
      splashImmersive: true
    }
  },
  // Configurações específicas para Android
  android: {
    allowMixedContent: true,
    buildOptions: {
      keystorePath: 'release.keystore',
      keystoreAlias: 'app-mercado',
      keystorePassword: 'app-mercado',
      releaseType: 'AAB',
      signingType: 'jarsigner'
    }
  }
};

export default config;
