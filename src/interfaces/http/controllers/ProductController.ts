import type { Request, Response, NextFunction } from 'express';
import type { ProductService } from '../../../application/services/ProductService';
import { NotFoundError } from '../middlewares/errorHandler';
import type { CreateProductDTO } from '../../../application/dto/CreateProductDTO';
import type { UpdateProductDTO } from '../../../application/dto/UpdateProductDTO';

/**
 * ProductController handles HTTP requests and delegates business logic to ProductService.
 * 
 * Responsibilities:
 * - Parse HTTP requests
 * - Validate request parameters
 * - Call appropriate service methods
 * - Format HTTP responses
 * - Handle errors
 * 
 * Dependencies are injected from the composition root (app.ts)
 */
export class ProductController {
  constructor(private readonly productService: ProductService) {
    // Dependencies injected via constructor
  }

  /**
   * Get all products
   * GET /api/products
   */
  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get product by ID
   * GET /api/products/:id
   */
  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id || "", 10);
      const product = await this.productService.getProductById(id);
      
      if (!product) {
        throw new NotFoundError(`Product with ID ${id} not found`);
      }
      
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a new product
   * POST /api/products
   */
  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CreateProductDTO = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category
      };
      
      const product = await this.productService.createProduct(dto);
      
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a product
   * PUT /api/products/:id
   */
  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id || "", 10);
      const dto: UpdateProductDTO = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category
      };
      
      const product = await this.productService.updateProduct(id, dto);
      
      if (!product) {
        throw new NotFoundError(`Product with ID ${id} not found`);
      }
      
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a product
   * DELETE /api/products/:id
   */
  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id || "", 10);
      
      const deleted = await this.productService.deleteProduct(id);
      
      if (!deleted) {
        throw new NotFoundError(`Product with ID ${id} not found`);
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}