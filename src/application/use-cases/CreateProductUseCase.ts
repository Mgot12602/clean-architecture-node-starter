import { Product } from '../../domain/entities/Product';
import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import type { CreateProductDTO } from '../dto/CreateProductDTO';
import { ProductResponseDTO } from '../dto/ProductResponseDTO';

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(dto: CreateProductDTO): Promise<ProductResponseDTO> {
    // Create domain entity with business logic validation
    const product = new Product(dto.name, dto.price, dto.stock, dto.category);
    
    // Timestamps are handled automatically by Sequelize
    // Save through repository
    const savedProduct = await this.productRepository.save(product);
    
    return ProductResponseDTO.fromEntity(savedProduct);
  }
}
