// src/infrastructure/database/sqlite/config.ts
export const sqliteConfig = {
    storage: process.env.SQLITE_STORAGE || './data/database.sqlite',
    logging: process.env.NODE_ENV === 'development',
  };