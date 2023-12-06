declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DBName: string;
      DBUser: string;
      DBPass: string;
      DBPort: string;
      RedisSession: string;
      DATABASE_URL: string;
      REDIS_URL: string;
      PORT: string;
      CORS_ORIGIN: string;
    }
  }
}

export {}
