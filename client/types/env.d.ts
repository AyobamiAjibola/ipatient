declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_BASE_URL: string;
        NEXT_PUBLIC_CLIENT_URL: string;
      }
    }
  }
  