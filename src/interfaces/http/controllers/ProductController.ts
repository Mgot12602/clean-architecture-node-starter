import type { Request, Response, NextFunction } from 'express';
import { SequelizeProductRepository } from '../../../infrastructure/repositories/SequelizeProductRepository';
import { NotFoundError } from '../middlewares/errorHandler';

export class ProductController {
  private productRepository: SequelizeProductRepository;

  constructor() {
    this.productRepository = new SequelizeProductRepository();
  }

  /**
   * Get all products
   */
  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productRepository.findAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get product by ID
   */
  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id||"", 10);
      const product = await this.productRepository.findById(id);
      
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
   */
  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Add validation middleware
      // TODO: Use CreateProduct use case instead of direct repository access
      
      const { name, price, stock, category } = req.body;
      
      // This is a temporary implementation
      // In a complete implementation, you would use the CreateProduct use case
      const product = await this.productRepository.save({
        name,
        price,
        stock,
        category,
        createdAt: new Date(),
        updatedAt: new Date()
      } as any);
      
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a product
   */
  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Add validation middleware
      // TODO: Use UpdateProduct use case instead of direct repository access
      
      const id = parseInt(req.params.id||"", 10);
      const { name, price, stock, category } = req.body;
      
      // Check if product exists
      const exists = await this.productRepository.exists(id);
      if (!exists) {
        throw new NotFoundError(`Product with ID ${id} not found`);
      }
      
      // This is a temporary implementation
      // In a complete implementation, you would use the UpdateProduct use case
      let product = await this.productRepository.findById(id);
      if (!product) {
        throw new Error('Product not found after existence check');
      }
      
      // Update product properties
      product.name = name || product.name;
      product.price = price || product.price;
      product.stock = stock || product.stock;
      product.category = category || product.category;
      product.updatedAt = new Date();
      
      // Save updates
      if (name) await this.productRepository.updateName(product);
      if (price) await this.productRepository.updatePrice(product);
      if (stock) await this.productRepository.updateStock(product);
      if (category) await this.productRepository.updateCategory(product);
      
      // Get updated product
      const updatedProduct = await this.productRepository.findById(id);
      
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a product
   */
  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id||"", 10);
      
      // Check if product exists
      const exists = await this.productRepository.exists(id);
      if (!exists) {
        throw new NotFoundError(`Product with ID ${id} not found`);
      }
      
      // Delete product
      await this.productRepository.delete(id);
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();