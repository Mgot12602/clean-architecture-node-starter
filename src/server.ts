import app from './app';
import dotenv from 'dotenv';
import { connect, initDatabase } from './infrastructure/database/sqlite/connection';
import { ensureDatabaseDirectory } from './config/database';

// Load environment variables
dotenv.config();

// Get port from environment or use default
const PORT = process.env.PORT || 3000;

// Initialize the server
async function startServer() {
  try {
    // Ensure database directory exists
    ensureDatabaseDirectory();
    
    // Connect to database
    const sequelize = await connect();
    
    // Initialize database models and sync schema
    await initDatabase();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API documentation: http://localhost:${PORT}/api-docs`);
    });
    
    // Handle graceful shutdown
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

// Start the server
startServer();