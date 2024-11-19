declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTO_OPEN: string; // автоматическое открытие вкладки при запуске проекта
    }
  }
}

export {};
