import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Database configuration
export const databaseConfig = {
  // SQLite configuration
  sqlite: {
    dialect: 'sqlite',
    storage: process.env.DATABASE_PATH || './data/development.sqlite',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  },
  
  // PostgreSQL configuration
  postgres: {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'training_db',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  },

  // MongoDB configuration (if needed in the future)
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/training_db',
  }
};

// Ensure the SQLite database directory exists
export const ensureDatabaseDirectory = (): void => {
  const dbPath = databaseConfig.sqlite.storage;
  const dbDir = path.dirname(dbPath);
  
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log(`Created database directory: ${dbDir}`);
  }
};