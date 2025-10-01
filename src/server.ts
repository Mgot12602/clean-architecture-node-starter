import app from './app';
import dotenv from 'dotenv';
import { connect, initDatabase, ensureDatabaseDirectory } from './infrastructure/database/sqlite/connection';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    ensureDatabaseDirectory();
    
    const sequelize = await connect();
    
    await initDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
    process.on('SIGINT', async () => {
      console.log('Shutting down server...');
      await sequelize.close();
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      console.log('Shutting down server...');
      await sequelize.close();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();