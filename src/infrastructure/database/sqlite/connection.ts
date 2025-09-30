import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { databaseConfig } from '../../../config/database';

// Load environment variables
dotenv.config();

// Get database path from environment or use default
const dbPath = process.env.DATABASE_PATH || './data/development.sqlite';

// Ensure the directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

/**
 * Connect to the database
 * @returns Sequelize instance
 */
export const connect = async (): Promise<Sequelize> => {
  try {
    await sequelize.authenticate();
    console.log('SQLite database connection has been established successfully.');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the SQLite database:', error);
    throw error;
  }
};

/**
 * Disconnect from the database
 */
export const disconnect = async (): Promise<void> => {
  try {
    await sequelize.close();
    console.log('SQLite database connection closed successfully.');
  } catch (error) {
    console.error('Error closing SQLite database connection:', error);
    throw error;
  }
};

/**
 * Initialize database models and sync schema
 */
export const initDatabase = async (): Promise<void> => {
  try {
    // Import and initialize models
    const { initProductModel } = await import('./schemas/ProductSchema');
    
    // Initialize models
    initProductModel(sequelize);
    
    // Sync database schema
    await sequelize.sync();
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};


export const ensureDatabaseDirectory = (): void => {
  const dbPath = databaseConfig.sqlite.storage;
  const dbDir = path.dirname(dbPath);
  
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log(`Created database directory: ${dbDir}`);
  }
};

export default sequelize;