import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  
  // Process request
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    
    // Log response
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${statusCode} ${duration}ms`
    );
  });
  
  next();
};