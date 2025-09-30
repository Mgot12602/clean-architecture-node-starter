/**
 * Dependency Injection Container (Composition Root)
 * 
 * This is where all application dependencies are instantiated and wired together.
 * Only the controller is exposed since it's the only dependency needed by app.ts
 */

import { SequelizeProductRepository } from '../infrastructure/repositories/SequelizeProductRepository';
import { ProductService } from '../application/services/ProductService';
import { ProductController } from '../interfaces/http/controllers/ProductController';

/**
 * Container holds all application dependencies
 */
export class Container {
  // Only expose what's actually needed
  public readonly productController: ProductController;

  constructor() {
    // Wire up dependencies from inside-out (Infrastructure → Application → Interface)
    // Internal dependencies are local variables (not exposed)
    
    // 1. Infrastructure Layer - Create repository implementation
    const productRepository = new SequelizeProductRepository();
    
    // 2. Application Layer - Inject repository into service
    const productService = new ProductService(productRepository);
    
    // 3. Interface Layer - Inject service into controller
    this.productController = new ProductController(productService);
  }
}

/**
 * Create and export container instance
 * This singleton ensures all parts of the app use the same instances
 */
export const container = new Container();
