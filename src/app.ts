import express from 'express';
import type { Request, Response, NextFunction, Application } from 'express';
import dotenv from 'dotenv';

import { createProductRoutes } from './interfaces/http/routes/ProductRoutes';
import { container } from './infrastructure/container';

import { errorHandler, notFoundHandler } from './interfaces/http/middlewares/errorHandler';
import { loggerMiddleware } from './interfaces/http/middlewares/loggerMiddleware';

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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    this.app.use(loggerMiddleware);
    
    // CORS configuration 
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
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: 'API is running',
        version: '1.0.0',
      });
    });

    const productRoutes = createProductRoutes(container.productController);

    // API routes
    this.app.use('/api/products', productRoutes);
    
  }

  private errorHandling(): void {
    // 404 Not Found handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }
}

export default new App().app;