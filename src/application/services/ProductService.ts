import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import { GetAllProductsUseCase } from '../use-cases/GetAllProductsUseCase';
import { GetProductByIdUseCase } from '../use-cases/GetProductByIdUseCase';
import { CreateProductUseCase } from '../use-cases/CreateProductUseCase';
import { UpdateProductUseCase } from '../use-cases/UpdateProductUseCase';
import { DeleteProductUseCase } from '../use-cases/DeleteProductUseCase';
import type { CreateProductDTO } from '../dto/CreateProductDTO';
import type { UpdateProductDTO } from '../dto/UpdateProductDTO';
import type { ProductResponseDTO } from '../dto/ProductResponseDTO';
export class ProductService {
  private getAllProductsUseCase: GetAllProductsUseCase;
  private getProductByIdUseCase: GetProductByIdUseCase;
  private createProductUseCase: CreateProductUseCase;
  private updateProductUseCase: UpdateProductUseCase;
  private deleteProductUseCase: DeleteProductUseCase;

  constructor(productRepository: ProductRepository) {
  
    this.getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
    this.getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
    this.createProductUseCase = new CreateProductUseCase(productRepository);
    this.updateProductUseCase = new UpdateProductUseCase(productRepository);
    this.deleteProductUseCase = new DeleteProductUseCase(productRepository);
  }

  
  async getAllProducts(): Promise<ProductResponseDTO[]> {
    return await this.getAllProductsUseCase.execute();
  }

  async getProductById(id: number): Promise<ProductResponseDTO | null> {
    return await this.getProductByIdUseCase.execute(id);
  }

  async createProduct(dto: CreateProductDTO): Promise<ProductResponseDTO> {
    const product = await this.createProductUseCase.execute(dto);
    return product;
  }

  async updateProduct(id: number, dto: UpdateProductDTO): Promise<ProductResponseDTO | null> {
    const product = await this.updateProductUseCase.execute(id, dto);
    return product;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return await this.deleteProductUseCase.execute(id);
  }
}