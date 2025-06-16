// apps/noteit-expo/types/global.d.ts
export {};

declare global {
  interface Window {
    electronAPI?: {
      isElectron: boolean;
    };
  }
}
