import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import productRoutes from './interfaces/http/routes/ProductRoutes';

// Import middlewares
import { errorHandler, notFoundHandler } from './interfaces/http/middlewares/errorHandler';
import { loggerMiddleware } from './interfaces/http/middlewares/loggerMiddleware';

// Load environment variables
dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandling();
  }

  private config(): void {
    // Middleware configuration
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Logger middleware
    this.app.use(loggerMiddleware);
    
    // CORS configuration (if needed)
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
      }
      
      next();
    });
  }

  private routes(): void {
    // Root route
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: 'API is running',
        version: '1.0.0',
      });
    });

    // API routes
    this.app.use('/api/products', productRoutes);
    
    // TODO: Import and use user routes when implemented
    // this.app.use('/api/users', userRoutes);
  }

  private errorHandling(): void {
    // 404 Not Found handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }
}

export default new App().app;