import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import { GetAllProductsUseCase } from '../use-cases/GetAllProductsUseCase';
import { GetProductByIdUseCase } from '../use-cases/GetProductByIdUseCase';
import { CreateProductUseCase } from '../use-cases/CreateProductUseCase';
import { UpdateProductUseCase } from '../use-cases/UpdateProductUseCase';
import { DeleteProductUseCase } from '../use-cases/DeleteProductUseCase';
import type { CreateProductDTO } from '../dto/CreateProductDTO';
import type { UpdateProductDTO } from '../dto/UpdateProductDTO';
import type { ProductResponseDTO } from '../dto/ProductResponseDTO';

/**
 * ProductService orchestrates product-related use cases and business logic.
 * 
 * Purpose:
 * - Coordinates multiple use cases when needed
 * - Adds cross-cutting business logic
 * - Provides a cohesive API for the controller layer
 * 
 * In a simple CRUD app, this might seem redundant, but it provides:
 * - A single point for future orchestration (e.g., logging, notifications)
 * - Easier to add complex workflows later
 * - Clear separation: Controller handles HTTP, Service handles business coordination
 */
export class ProductService {
  private getAllProductsUseCase: GetAllProductsUseCase;
  private getProductByIdUseCase: GetProductByIdUseCase;
  private createProductUseCase: CreateProductUseCase;
  private updateProductUseCase: UpdateProductUseCase;
  private deleteProductUseCase: DeleteProductUseCase;

  constructor(productRepository: ProductRepository) {
    // Initialize all use cases with the repository
    this.getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
    this.getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
    this.createProductUseCase = new CreateProductUseCase(productRepository);
    this.updateProductUseCase = new UpdateProductUseCase(productRepository);
    this.deleteProductUseCase = new DeleteProductUseCase(productRepository);
  }

  /**
   * Get all products
   * Currently delegates to use case, but could add:
   * - Caching
   * - Filtering business rules
   * - Sorting logic
   */
  async getAllProducts(): Promise<ProductResponseDTO[]> {
    return await this.getAllProductsUseCase.execute();
  }

  /**
   * Get product by ID
   */
  async getProductById(id: number): Promise<ProductResponseDTO | null> {
    return await this.getProductByIdUseCase.execute(id);
  }

  /**
   * Create a new product
   * Future orchestration could include:
   * - Sending notification emails
   * - Logging to analytics
   * - Triggering inventory events
   */
  async createProduct(dto: CreateProductDTO): Promise<ProductResponseDTO> {
    const product = await this.createProductUseCase.execute(dto);
    
    // Future: Add orchestration here
    // await this.notificationService.notifyNewProduct(product);
    // await this.analyticsService.trackProductCreated(product);
    
    return product;
  }

  /**
   * Update a product
   * Future orchestration could include:
   * - Price change notifications
   * - Stock level alerts
   * - Audit logging
   */
  async updateProduct(id: number, dto: UpdateProductDTO): Promise<ProductResponseDTO | null> {
    const product = await this.updateProductUseCase.execute(id, dto);
    
    // Future: Add orchestration here
    // if (dto.price && product) {
    //   await this.notificationService.notifyPriceChange(product);
    // }
    
    return product;
  }

  /**
   * Delete a product
   * Future orchestration could include:
   * - Checking for active orders
   * - Archiving instead of hard delete
   * - Cleanup related data
   */
  async deleteProduct(id: number): Promise<boolean> {
    // Future: Add pre-delete checks
    // const hasActiveOrders = await this.orderService.hasActiveOrders(id);
    // if (hasActiveOrders) {
    //   throw new Error('Cannot delete product with active orders');
    // }
    
    return await this.deleteProductUseCase.execute(id);
  }
}