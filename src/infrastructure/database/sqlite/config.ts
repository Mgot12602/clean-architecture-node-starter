import path from 'path';

export const sqliteConfig = {
  dialect: 'sqlite' as const,
  storage: process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'development.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
};
