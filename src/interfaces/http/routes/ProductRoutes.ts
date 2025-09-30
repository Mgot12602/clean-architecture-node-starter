import { Router } from 'express';
import type { ProductController } from '../controllers/ProductController';

/**
 * Creates and configures product routes
 * @param productController - Injected controller instance
 * @returns Configured Express router
 */
export const createProductRoutes = (productController: ProductController): Router => {
  const router = Router();

  // GET /api/products - Get all products
  router.get('/', productController.getAllProducts);

  // GET /api/products/:id - Get product by ID
  router.get('/:id', productController.getProductById);

  // POST /api/products - Create a new product
  router.post('/', productController.createProduct);

  // PUT /api/products/:id - Update a product
  router.put('/:id', productController.updateProduct);

  // DELETE /api/products/:id - Delete a product
  router.delete('/:id', productController.deleteProduct);

  return router;
};
