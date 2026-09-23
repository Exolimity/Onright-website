/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  /** 'hash' switches to HashRouter for preview hosting; leave unset for normal builds. */
  readonly VITE_ROUTER?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
