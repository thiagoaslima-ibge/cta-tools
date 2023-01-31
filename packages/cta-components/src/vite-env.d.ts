/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GOOGLE_ANALYTICS_ID?: string
    readonly VITE_ICONS_FOLDER?: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }